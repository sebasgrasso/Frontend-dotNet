import React from 'react';
import { Paper, Grid } from '@mui/material';
import useStyles from '../css/styles';
import { useLazyGetPostsQuery } from "../../store/apis/microbApis"
import { useEffect } from "react"
import { Post } from "../../posts/components/post"
import { NuevoPost } from "../../posts/components/nuevoPost"
import { ToastContainer } from 'react-toastify';
import InfiniteScroll from "react-infinite-scroll-component";


const Feed: React.FC = () => {
  const classes = useStyles();

  const fetchMoreData = () => {
    alert("pido mas posts");
  };

  const [startGetPosts,{data:posts}]=useLazyGetPostsQuery()
    useEffect(() => {
        startGetPosts({skip:0,limit:10});
      }, []);

      
  const maxPosts = posts?.length || 0;


  return (
    <Paper className={`${classes.rootDiff} ${classes.scrollableFeed}`}>
    <NuevoPost/>
    <ToastContainer/>
    <InfiniteScroll
        dataLength={maxPosts}
        next={fetchMoreData}
        hasMore={true} 
        loader={<h5>Cargando posts...</h5>}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>No hay más posts para mostrar</b>
          </p>
        }
      >
        <Grid container direction="column" alignItems="center" spacing={2}> {}
            {posts?.map((post, index) => (
                <Grid key={index} item xs={12}> {}
                    <Post post={post}/> 
                </Grid> 
            ))}
        </Grid>
      </InfiniteScroll>
    </Paper>
  );
}

export default Feed;
