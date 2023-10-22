import React, { useState } from 'react';
import { Paper, Grid } from '@mui/material';
import useStyles from '../css/styles';
import { useLazyGetPostsQuery } from "../../store/apis/microbApis"
import { useEffect } from "react"
import { Post } from "../../posts/components/post"
import { NuevoPost } from "../../posts/components/nuevoPost"
import { ToastContainer } from 'react-toastify';
import InfiniteScroll from "react-infinite-scroll-component";
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { increaseSkip } from '../../store/posts/postsSlice';


const Feed: React.FC = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const [startGetPosts,{data:posts}]=useLazyGetPostsQuery()
  const {skip,limit} = useAppSelector((state) => state.getPostsSkip);
  const [allPosts, setAllPosts] = useState(posts)

  useEffect(() => {    
    startGetPosts({skip,limit});
    setAllPosts(posts);
  }, []);

  useEffect(()=>{
    startGetPosts({skip,limit})
  },[skip,limit])

  useEffect(()=>{
    setAllPosts((allPosts ?? []).concat(posts ?? []))
  },[posts])

  const fetchMoreData = () => {
    dispatch(increaseSkip({skip:skip+10}))
    console.log("aumentando skip ",skip);
  };

  return (
    <Paper className={`${classes.rootDiff} ${classes.scrollableFeed}`}>
    <NuevoPost/>
    <ToastContainer/>
    <InfiniteScroll
        dataLength={allPosts?.length ?? 0}
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
            {allPosts?.map((post) => (
                <Grid key={post.id} item xs={12}> {}
                    <Post post={post}/> 
                </Grid> 
            ))}
        </Grid>
      </InfiniteScroll>
    </Paper>
  );
}

export default Feed;
