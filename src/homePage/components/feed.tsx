import React, { useState } from "react";
import { Paper, Grid, Typography, Card, CardContent, Button, Box } from "@mui/material";
import { useLazyGetPostsInstanciaQuery, useLazyGetPostsQuery } from "../../store/apis/microbApis";
import { useEffect } from "react";
import { Post } from "../../posts/components/post";
import { NuevoPost } from "../../posts/components/nuevoPost";
import { ToastContainer } from "react-toastify";
import InfiniteScroll from "react-infinite-scroll-component";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { skipValue } from "../../store/posts/postsSlice";

const Feed: React.FC = () => {
  const dispatch = useAppDispatch();
  const [startGetPosts, { data: posts }] = useLazyGetPostsQuery();
  const { skip, limit, newPost } = useAppSelector((state) => state.postsSkip);
  const {status} = useAppSelector((state)=> state.auth)
  const [allPosts, setAllPosts] = useState(posts);
  const [global,setGlobal] = useState(true)
  
  const [startGetPostsInstancia,{data:postsInstancia}] = useLazyGetPostsInstanciaQuery();
  const [allPostsInstancia, setAllPostsInstancia] = useState(postsInstancia);

  //cargar postsInstancia
  useEffect(() => {
    if(status=="authenticated"){
      startGetPostsInstancia({ skip, limit });
    }
    setAllPostsInstancia(postsInstancia);
  }, []);
  //cargar posts globales
  useEffect(() => {
    startGetPosts({ skip, limit });
    setAllPosts(posts);
  }, []);

  useEffect(() => {
    startGetPosts({ skip, limit });
  }, [skip, newPost]);

  useEffect(() => {
    if(status=="authenticated"){
      startGetPostsInstancia({ skip, limit });
    }
  }, [skip, newPost]);

  //agregar posts nuevos global
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

  //agregar posts nuevos instancia
  useEffect(() => {
    if (postsInstancia) {
      const uniquePosts = postsInstancia.filter(post => {
        return !allPostsInstancia?.some(existingPost => existingPost.id === post.id);
      });
  
      // carga al inicio cuando es post nuevo
      if (skip === 0) {
        setAllPostsInstancia(allPostsInstancia => {
          const updatedPosts = allPostsInstancia ? [...uniquePosts, ...allPostsInstancia] : uniquePosts;
          return updatedPosts;
        });
      } else {
        // carga los posts al final al scrollear
        setAllPostsInstancia(allPostsInstancia => {
          const updatedPosts = allPostsInstancia ? [...allPostsInstancia, ...uniquePosts] : uniquePosts;
          return updatedPosts;
        });
      }
    }
  }, [postsInstancia, skip]);


  const fetchMoreData = () => {
    dispatch(skipValue({ skip: skip + 10 }));
  };

  const globalLocalButtons = (
    <Box width="100%" display="flex" justifyContent="space-between"> 
      <Button
        variant={global ? "contained" : "outlined"}
        onClick={() => { setGlobal(true); dispatch(skipValue({ skip: 0 })) }}
        sx={{
          flexGrow: 1,
          marginBottom: '4px', 
          backgroundColor: !global ? "transparent" : null, 
          color: "white", 
          
        }}
      >
        Global
      </Button>
      <Button
        variant={!global ? "contained" : "outlined"}
        onClick={() => { setGlobal(false); dispatch(skipValue({ skip: 0 })) }}
        sx={{
          flexGrow: 1,
          marginBottom: '4px', 
          backgroundColor: global ? "transparent" : null, 
          color: "white",
        }}
      >
        Local
      </Button>
    </Box>
  );
  
  return (
    <Paper sx={{ padding: '20px', backgroundColor: "rgb(25, 27, 34)" }}>
      {status === 'authenticated' && (
        <Box width={500} mx="auto">
          {globalLocalButtons}
          <NuevoPost />
        </Box>
      )}
      
      <ToastContainer />
      
      {global ? 
      <>
        {(allPosts?.length && allPosts.length >= 1) ? 
        <InfiniteScroll
          dataLength={allPosts?.length ?? 0}
          next={fetchMoreData}
          hasMore={true}
          loader={<Typography sx={{mt:"20px", color:"white"}}></Typography>}
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
          <Typography> NO HAY POSTS</Typography>
        </CardContent>
        </Card>
        
        }
      </>

      : 
        <>
          {(allPostsInstancia?.length && allPostsInstancia.length >= 1) ? 
          <InfiniteScroll
            dataLength={allPostsInstancia?.length ?? 0}
            next={fetchMoreData}
            hasMore={true}
            loader={<Typography sx={{mt:"20px", color:"white"}}></Typography>}
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>No hay más posts para mostrar</b>
              </p>
            }
          >
            <Grid container direction="column" spacing={2}>
              {allPostsInstancia?.map((post) => (
                <Grid key={post.id} item xs={12}>
                  <Post post={post} clickeable={true} />
                </Grid>
              ))}
            </Grid>
          </InfiniteScroll> : 
          //ACA HAY QUE PONER PLACEHOLDER POR SI NO HAY POSTS
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
            <Typography> NO HAY POSTS</Typography>
          </CardContent>
          </Card>
          
          }
        </>

      }

      
      
    </Paper>
  );
};

export default Feed;
