import React, { useState } from "react";
import { Paper, Grid, Typography, Card, CardContent, Button } from "@mui/material";
import { useLazyGetPostsBusquedaQuery } from "../../store/apis/microbApis";
import { useEffect } from "react";
import { Post } from "../../posts/components/post";
import { ToastContainer } from "react-toastify";
import InfiniteScroll from "react-infinite-scroll-component";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { skipValue } from "../../store/posts/postsSlice";
import { useNavigate } from "react-router-dom";
import { getInstanciaStorage } from "../../utils/localstorage";
import { SearchBar } from "../../homePage/components/searchbar";

interface searchPostsProps {
    q:string;
}

const SearchFeed: React.FC<searchPostsProps> = ({q}) => {
  const dispatch = useAppDispatch();
  const [startGetPosts, { data: posts }] = useLazyGetPostsBusquedaQuery();
  dispatch(skipValue({ skip: 0 }));
  
  const { skip, limit } = useAppSelector((state) => state.postsSkip);
  const [allPosts, setAllPosts] = useState(posts);
  const navigate = useNavigate();
  const instanciaDelStore = getInstanciaStorage();
  
  const volverAlInicio = ()=>{
    if(instanciaDelStore?.alias){
      navigate(`/${instanciaDelStore.alias}`);
      dispatch(skipValue({ skip: 0 }));
    }
  }

  useEffect(() => {
    startGetPosts({ skip, limit , q});
    setAllPosts(posts);
  }, []);

  useEffect(() => {
    startGetPosts({ skip, limit , q});
    setAllPosts([]);
  }, [q]);

  useEffect(() => {
    if (posts) {
      const uniquePosts = posts.filter(post => {
        return !allPosts?.some(existingPost => existingPost.id === post.id);
      });
  
      // carga al inicio cuando es post nuevo
      if (skip === 0) {
        setAllPosts(allPosts => {
          const updatedPosts = allPosts ? [...uniquePosts, ...allPosts] : uniquePosts;
          return updatedPosts;
        });
      } else {
        // carga los posts al final al scrollear
        setAllPosts(allPosts => {
          const updatedPosts = allPosts ? [...allPosts, ...uniquePosts] : uniquePosts;
          return updatedPosts;
        });
      }
    }
  }, [posts, skip]);

  const fetchMoreData = () => {
    dispatch(skipValue({ skip: skip + 10 }));
  };
  
  return (
    <Paper sx={{padding: '20px',backgroundColor:"rgb(25, 27, 34)"}}>
      <ToastContainer />
      <Button 
                  sx={{backgroundColor:"white"}} 
                  onClick={()=>{instanciaDelStore?.alias ? volverAlInicio() : navigate("/") }}
                >
                  VOLVER
      </Button>
      <SearchBar/>
      {(allPosts?.length && allPosts.length >= 1) ? 
        <InfiniteScroll
            dataLength={allPosts?.length ?? 0}
            next={fetchMoreData}
            hasMore={true}
            loader={<Typography sx={{mt:"20px", color:"white"}}>...</Typography>}
            endMessage={
            <p style={{ textAlign: "center" }}>
                <b>No hay más posts para mostrar</b>
            </p>
            }
        >
            <Grid container direction="column" spacing={2}>
            {allPosts?.map((post) => (
                <Grid key={post.id} item xs={12}>
                  <Post post={post} clickeable={true} />
                </Grid>
            ))}
            </Grid>
        </InfiniteScroll> 
        : 
        <Card sx={{ width: 500, 
            maxWidth: "100%", 
            cursor: "pointer",
            '&:hover': {
            boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
            backgroundColor: '#f9f9f9',
            transition: 'box-shadow 0.3s, background-color 0.3s',},
        }}
        >
        <CardContent>
            <Typography> NO HAY RESULTADOS PARA ESA BÚSQUEDA</Typography>
        </CardContent>
        </Card>
        
      }
      
    </Paper>
  );
};

export default SearchFeed;
