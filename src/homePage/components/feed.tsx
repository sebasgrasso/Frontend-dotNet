import React, { useState } from "react";
import { Paper, Grid, Typography, Card, CardContent } from "@mui/material";
import { useLazyGetPostsQuery } from "../../store/apis/microbApis";
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
  
  useEffect(() => {
    startGetPosts({ skip, limit });
    setAllPosts(posts);
  }, []);

  useEffect(() => {
    startGetPosts({ skip, limit });
  }, [skip, newPost]);

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

  console.log("posts:", posts);
  

  return (
    <Paper sx={{padding: '20px',backgroundColor:"rgb(25, 27, 34)"}}>
      {status == 'authenticated' ? <NuevoPost /> : null}
      <ToastContainer />
      {(allPosts?.length && allPosts.length > 1) ? <InfiniteScroll
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
      
    </Paper>
  );
};

export default Feed;
