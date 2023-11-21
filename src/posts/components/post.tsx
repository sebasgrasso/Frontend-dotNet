import { Box, Button, Card, CardActions, CardContent, CardHeader, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Link, List, ListItem, ListItemAvatar, ListItemText, Tooltip, Typography } from "@mui/material"
import { PostDTO } from "../../interfaces/interfaces" 
import Avatar from '@mui/material/Avatar';
import { useNavigate } from "react-router-dom";
import RepostButton from "./repostButton";
import ReplyButton from "./replyButton";
import { IconStar, IconStarFilled, IconTrash } from "@tabler/icons-react";
import { useState } from "react";
import { useAddFavorito } from "../hooks/useAddFavoritos";
import { useAppSelector } from "../../hooks/hooks";
import DenunciarPostButton from "./denunciarPost";
import { useDeletePost } from "../hooks/useDeletePost";
import { useDispatch } from "react-redux";
import { changeNewPost, skipValue } from "../../store/posts/postsSlice";
import { useGetPplFavoritosQuery } from "../../store/apis/microbApis";
//import { IconArrowBigUpLine, IconArrowBigUpLineFilled  } from "@tabler/icons-react";
//import { useState } from "react";
// ... (import statements)

export const Post = ({ post, clickeable }: { post: PostDTO; clickeable: boolean }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {status,id} = useAppSelector((state)=>state.auth)
    const {newPost} = useAppSelector((state)=>state.postsSkip)
    const instancia = post.instanciaAlias;
    const pathParts = location.pathname.split('/');
    const urlPost = pathParts[2];
    const urlInstancia = pathParts[1];
    const {handleAddFavorito} = useAddFavorito();
    const [liked,setLiked] = useState(post.isUsuarioInFavoritos);
    const [cantFav,setCantFav] = useState(post.cantFavoritos);
    const {handleDeletePost} = useDeletePost();
    const pplFav = useGetPplFavoritosQuery({postID:post.id,limit:"200",skip:"0"});
    const [openFavoritos, setOpenFavoritos] = useState(false);
    const instanciaUserLogueado = useAppSelector((state)=>state.instance.alias);

    const handleOpenFavoritos = () => {
      if(cantFav>0)setOpenFavoritos(true);
    }
    
    const handleCloseFavoritos = () => setOpenFavoritos(false);
  
    const handlePostClick = (e: { stopPropagation: () => void; }) => {
      if (!clickeable) return;
      e.stopPropagation(); // Stop propagation here
      if (urlPost !== "post") {
        if (urlPost === "searchResults") {
          navigate(`/${urlInstancia}/post/${post.id}`, { state: post });
        } else {
          navigate(`post/${post.id}`, { state: post });
        }
      }
    };

    const handleCitedPostClick = (e: { stopPropagation: () => void; }) => {
      e.stopPropagation(); // Stop propagation here
          navigate(`/${urlInstancia}/post/${post.postCitado?.id}`, { state: post });

      }

    const handleDeleteClick = ()=>{
      handleDeletePost({id:post.id})
      dispatch(skipValue({skip:0}))
      dispatch(changeNewPost(newPost))
    }

    const handleLikeClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        if(status=="authenticated"){
          handleAddFavorito(post.id)
          {liked ? setCantFav(cantFav-1) : setCantFav(cantFav+1)}
          setLiked(!liked)
        }
        event.stopPropagation();
    };

    const handleLikeCitadoClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      
      if(status=="authenticated" && post.postCitado){
        
        handleAddFavorito(post.postCitado.id)
        {liked ? setCantFav(cantFav-1) : setCantFav(cantFav+1)}
        setLiked(!liked)
      }
      event.stopPropagation();
  };
  
  const handleUserClick = (user) => {
    const idUser = btoa(user.id);
    handleCloseFavoritos();
    navigate(`/${instanciaUserLogueado}/perfil/${idUser}`);
};

  const UserListItem = ({ user, instanciaAliasLogueado, onUserClick }) => (
    <ListItem button onClick={() => onUserClick(user)}>
        <ListItemAvatar>
            <Avatar src={user.perfil.fotoUrl} alt={`Avatar de ${user.perfil.nickname}`} />
        </ListItemAvatar>
        <ListItemText 
            primary={user.perfil.nickname} 
            secondary={
                `@${user.username}` + 
                (user.instanciaAlias !== instanciaAliasLogueado ? `@${user.instanciaAlias}` : '')
            } 
        />
    </ListItem>
);

  return (
    <>
    <Dialog open={openFavoritos} onClose={handleCloseFavoritos} style={{height: '500px', overflowY: 'auto'}}>
                <DialogTitle>Favoritos</DialogTitle>
                <DialogContent>
                    <List>
                        {pplFav.data && pplFav.data.map((liker) => (
                            <UserListItem key={liker.id} user={liker} instanciaAliasLogueado={instanciaUserLogueado} onUserClick={handleUserClick}  />
                        ))}
                    </List>
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleCloseFavoritos}
                        sx={{
                        color: "white",
                        width: '100%',
                        fontWeight: 'medium', 
                        letterSpacing: 1.2, 
                        fontSize: '0.875rem', 
                        textTransform: 'none', 
                        borderRadius: '4px', 
                        padding: '8px 24px', 
                        boxShadow: '0 3px 5px 2px rgba(21, 101, 192, .3)',
                        transition: 'background-color .3s, color .3s, box-shadow .3s',
                        
                        }}
                        >
                            Cerrar
                    </Button>
                </DialogActions>
            </Dialog>
    {post.contenido == null ? 
    
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
      
            {post.tieneCita ? (
              <Card sx={{ width: 500, maxWidth: "100%" }}>
                <Typography sx={{mt:"5px",ml:"5px",mb:"5px"}}>{`Reposteado por @${post.usuarioUsername}`}</Typography>
                <CardHeader
                  avatar={<Avatar sx={{cursor:"pointer"}} onClick={()=>navigate(`/${instancia}/perfil/${btoa(String(post.postCitado?.usuarioId))}`)} src={post.postCitado?.fotoUrl} />}
                  title={
                    <Link
                      href={`/${instancia}/perfil/${btoa(String(post.postCitado?.usuarioId))}`}
                      underline="none"
                    >
                      {post.postCitado?.usuarioNickname}
                    </Link>
                  }
                  subheader={
                    <Link
                      href={`/${instancia}/perfil/${btoa(String(post.postCitado?.usuarioId))}`}
                      underline="none"
                    >
                      {urlInstancia == post.postCitado?.instanciaAlias ? `@${post.postCitado?.usuarioUsername}` : `@${post.postCitado?.usuarioUsername}@${post.postCitado?.instanciaAlias}` }
                    </Link>
                  }
                />
                <CardContent onClick={handleCitedPostClick}>
                  <Typography sx={{ fontSize: 14 }} color="black" gutterBottom>
                    {post.postCitado?.contenido}
                  </Typography>
                </CardContent>

                <CardActions>
                  <Grid container justifyContent={"center"} alignItems={"center"}>
                        <Grid container justifyContent={"center"} alignItems={"center"} item xs={2}>
                          <ReplyButton post={post} />
                        </Grid>
                        
                        <Grid container justifyContent={"center"} alignItems={"center"} item xs={2}>
                          {post.postCitado ? <RepostButton post={post} /> : null}
                        </Grid>

                        <Grid container justifyContent={"center"} alignItems={"center"} item xs={2}>
                        <Tooltip title="Favorito">
                          <Button sx={{ minWidth:40}} aria-label="settings" onClick={(e)=>handleLikeCitadoClick(e)}>
                            {liked 
                                ? 
                                <IconStarFilled/>
                                :
                                <IconStar />
                            }
                          </Button>
                          </Tooltip>
                           <Typography sx={{color:"primary.main"}} onClick={handleOpenFavoritos} >{cantFav}</Typography>
                        </Grid>

                        
                          { (id==(post.usuarioId).toString() || post.instanciaAlias!=urlInstancia) ? 
                            null 
                            : 
                            <Grid container justifyContent={"center"} alignItems={"center"} item xs={2}>
                              <DenunciarPostButton post={post}/>
                            </Grid>
                          }
                          {id!==(post.usuarioId).toString()  ? 
                            null 
                          : 
                            <Grid container justifyContent={"center"} alignItems={"center"} item xs={2}>
                              <Button onClick={handleDeleteClick}>
                                <IconTrash/>
                              </Button>
                            </Grid>
                          }
                        
                  </Grid>
                </CardActions>
              </Card>
            ) : null}
        
      </Box>

    : 
    
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
          <Card
            sx={{
              width: 500,
              maxWidth: "100%",
              cursor: "pointer",
              '&:hover': {
                boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
                backgroundColor: '#f9f9f9',
                transition: 'box-shadow 0.3s, background-color 0.3s',
              },
            }}
          >
            <CardHeader
              // Modify the onClick event for CardHeader to prevent propagation
              //onClick={(e) => e.stopPropagation()}
              avatar={<Avatar src={post.fotoUrl} />}
              title={
                <Link href={`/${instancia}/perfil/${btoa(post.usuarioId.toString())}`} underline="none">
                  {post.usuarioNickname}
                </Link>
              }
              subheader={
                <Link href={`/${instancia}/perfil/${btoa(post.usuarioId.toString())}`} underline="none">
                  {urlInstancia == post.instanciaAlias ? `@${post.usuarioUsername}` : `@${post.usuarioUsername}@${post.instanciaAlias}` }
                </Link>
              }
            />
            <CardContent>
              <Typography onClick={handlePostClick} sx={{ fontSize: 16, width: "100%" }} color="black" gutterBottom>
                {post.contenido}
              </Typography>
              {/* lo siguiente es el tuit citado en caso de haberlo*/}
              {post.tieneCita ? (
                <Card sx={{ width: 500, maxWidth: "100%" }}>
                  <CardHeader
                    avatar={<Avatar src={post.postCitado?.fotoUrl} />}
                    title={
                      <Link
                        href={`/${instancia}/perfil/${btoa(String(post.postCitado?.usuarioId))}`}
                        underline="none"
                      >
                        {post.postCitado?.usuarioNickname}
                      </Link>
                    }
                    subheader={
                      <Link
                        href={`/${instancia}/perfil/${btoa(String(post.postCitado?.usuarioId))}`}
                        underline="none"
                      >
                        {urlInstancia == post.postCitado?.instanciaAlias ? `@${post.postCitado?.usuarioUsername}` : `@${post.postCitado?.usuarioUsername}@${post.postCitado?.instanciaAlias}` }
                      </Link>
                    }
                  />
                  <CardContent onClick={handleCitedPostClick}>
                    <Typography sx={{ fontSize: 16 }} color="black" gutterBottom>
                      {post.postCitado?.contenido}
                    </Typography>
                  </CardContent>
                  <CardActions></CardActions>
                </Card>
              ) : null}
            </CardContent>
            
            <CardActions>
              <Grid container justifyContent={"center"} alignItems={"center"}>
                    <Grid container justifyContent={"center"} alignItems={"center"} item xs={2}>
                      <ReplyButton post={post} />
                    </Grid>
                    
                    <Grid container justifyContent={"center"} alignItems={"center"} item xs={2}>
                      <RepostButton post={post} />
                    </Grid>

                    <Grid container justifyContent={"center"} alignItems={"center"} item xs={2}>
                    <Tooltip title="Favorito">
                      <Button sx={{ minWidth:40}} aria-label="settings" onClick={handleLikeClick}>
                        {liked 
                            ? 
                            <IconStarFilled/>
                            :
                            <IconStar />
                        }
                      </Button>
                      </Tooltip>
                      <Typography sx={{color:"primary.main"}} onClick={handleOpenFavoritos} >{cantFav}</Typography>
                    </Grid>

                    {id!==(post.usuarioId).toString()  ? 
                        null 
                      : 
                        <Grid container justifyContent={"center"} alignItems={"center"} item xs={2}>
                          <Button onClick={handleDeleteClick}>
                            <IconTrash/>
                          </Button>
                        </Grid>
                        
                      }
                      { (id==(post.usuarioId).toString() || post.instanciaAlias!=urlInstancia) ? 
                        null 
                        : 
                        <Grid container justifyContent={"center"} alignItems={"center"} item xs={2}>
                          <DenunciarPostButton post={post}/>
                        </Grid>
                      }
                      
                      
                    
              </Grid>

            </CardActions>
          </Card>
        </Box>
    
    }
      
    </>
  );
};