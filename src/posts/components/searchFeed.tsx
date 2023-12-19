import React, { useState } from "react";
import { Paper, Grid, Typography, Card, CardContent, Box, Button, Avatar, CardHeader, Link } from "@mui/material";
import { useLazyGetPostsBusquedaQuery, useLazyGetUsuariosBusquedaQuery } from "../../store/apis/microbApis";
import { useEffect } from "react";
import { Post } from "../../posts/components/post";
import { ToastContainer } from "react-toastify";
import InfiniteScroll from "react-infinite-scroll-component";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { skipValue } from "../../store/posts/postsSlice";
import { SearchBar } from "../../homePage/components/searchbar";
import { useNavigate } from "react-router-dom";

interface searchPostsProps {
    q:string;
}

const SearchFeed: React.FC<searchPostsProps> = ({q}) => {
  const dispatch = useAppDispatch();
  const [startGetPosts, { data: posts }] = useLazyGetPostsBusquedaQuery();
  const [startGetUsers,{data:users}] = useLazyGetUsuariosBusquedaQuery()
  dispatch(skipValue({ skip: 0 }));
  const [verPosts,setVerPosts] = useState(true)
  const { skip, limit } = useAppSelector((state) => state.postsSkip);
  const [allPosts, setAllPosts] = useState(posts);
  const[allUsers, setAllUsers] = useState(users);
  const pathParts = location.pathname.split('/');
  const urlInstancia = pathParts[1];
  const navigate = useNavigate();

  useEffect(() => {
    startGetPosts({ skip, limit , q});
    setAllPosts(posts);
  }, []);

  useEffect(() => {
    startGetPosts({ skip, limit, q }).then((result) => {
      setAllPosts(result.data);
    });
  }, [skip, limit, q]);
  
  useEffect(()=>{
    startGetUsers({skip,limit,text:q});
    setAllUsers(users)
  },[]);

  useEffect(() => {
    startGetUsers({ skip, limit, text:q }).then((result) => {
      setAllUsers(result.data);
    });
  }, [skip, limit, q]);

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

  useEffect(() => {
    if (users) {
      const uniqueUsers = users.filter(usuario => {
        return !allUsers?.some(existingUser => existingUser.id === usuario.id);
      });
  
      // carga al inicio cuando es post nuevo
      if (skip === 0) {
        setAllUsers(allUsers => {
          const updatedUsers = allUsers ? [...uniqueUsers, ...allUsers] : uniqueUsers;
          return updatedUsers;
        });
      } else {
        // carga los posts al final al scrollear
        setAllUsers(allUsers => {
          const updatedUsers = allUsers ? [...allUsers, ...uniqueUsers] : uniqueUsers;
          return updatedUsers;
        });
      }
    }
    
  }, [users, skip]);

  const fetchMoreData = () => {
    dispatch(skipValue({ skip: skip + 10 }));
  };
  
  const globalLocalButtons = (
    <Box width="100%" display="flex" justifyContent="space-between"> 
      <Button
        variant={verPosts ? "contained" : "outlined"}
        onClick={() => { setVerPosts(true); dispatch(skipValue({ skip: 0 })) }}
        sx={{
          flexGrow: 1,
          marginBottom: '4px', 
          backgroundColor: !verPosts ? "transparent" : null, 
          color: "white", 
          
        }}
      >
        POSTS
      </Button>
      <Button
        variant={!verPosts ? "contained" : "outlined"}
        onClick={() => { setVerPosts(false); dispatch(skipValue({ skip: 0 })) }}
        sx={{
          flexGrow: 1,
          marginBottom: '4px', 
          backgroundColor: verPosts ? "transparent" : null, 
          color: "white",
        }}
      >
        USUARIOS
      </Button>
    </Box>
  );
  
  return (
    <Paper sx={{padding: '20px',backgroundColor:"rgb(25, 27, 34)"}}>
      <ToastContainer />
      <Box width={500} sx={{mb:2}} mx="auto">
        <SearchBar/>
        {globalLocalButtons}
      </Box>
      { verPosts ?
      <>  
        {(allPosts && allPosts.length >= 1) ? 
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
      </>
        


:     <>  
        {(allPosts && allPosts.length >= 1) ? 
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
              <Grid container direction="column" alignItems="center" spacing={2}>
              {allUsers?.map((user) => (
                  <Grid key={user.id} item xs={12}>
                    <Card sx={{ width: 500, 
                      maxWidth: "100%", 
                      cursor: "pointer",
                      '&:hover': {
                        boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
                        backgroundColor: '#f9f9f9',
                        transition: 'box-shadow 0.3s, background-color 0.3s',},
                    }}
                    >
                      <CardHeader
                      // Modify the onClick event for CardHeader to prevent propagation
                      //onClick={(e) => e.stopPropagation()}
                      avatar={<Avatar src={user.perfil.fotoUrl} />}
                      title={
                        <Link href={`/${urlInstancia}/perfil/${btoa(user.id.toString())}`} underline="none">
                          {user.perfil.nickname}
                        </Link>
                      }
                      subheader={
                        <Link href={`/${urlInstancia}/perfil/${btoa(user.id.toString())}`} underline="none">
                          {urlInstancia == user.instanciaAlias ? `@${user.username}` : `@${user.username}@${user.instanciaAlias}` }
                        </Link>
                      }
                      />
                    </Card>
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
      </>

      }
      
      
    </Paper>
  );
};

export default SearchFeed;
