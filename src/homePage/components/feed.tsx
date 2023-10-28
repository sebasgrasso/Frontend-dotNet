import React, { useState } from "react";
import { Paper, Grid } from "@mui/material";
import useStyles from "../css/styles";
import { useLazyGetPostsQuery } from "../../store/apis/microbApis";
import { useEffect } from "react";
import { Post } from "../../posts/components/post";
import { NuevoPost } from "../../posts/components/nuevoPost";
import { ToastContainer } from "react-toastify";
import InfiniteScroll from "react-infinite-scroll-component";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { skipValue } from "../../store/posts/postsSlice";

const Feed: React.FC = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const [startGetPosts, { data: posts }] = useLazyGetPostsQuery();
  const { skip, limit, newPost } = useAppSelector(
    (state) => state.getPostsSkip
  );
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
    console.log("aumentando skip ", skip);
  };


  return (
    <Paper className={`${classes.rootDiff} ${classes.scrollableFeed}`}>
      <NuevoPost />
      <ToastContainer />
      <InfiniteScroll
        dataLength={allPosts?.length ?? 0}
        next={fetchMoreData}
        hasMore={true}
        loader={<h5>Cargando posts...</h5>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>No hay más posts para mostrar</b>
          </p>
        }
      >
        <Grid container direction="column" spacing={2}>
          {allPosts?.map((post) => (
            <Grid key={post.id} item xs={12}>
              
              <Post post={post} />
            </Grid>
          ))}
        </Grid>
      </InfiniteScroll>
    </Paper>
  );
};

export default Feed;
