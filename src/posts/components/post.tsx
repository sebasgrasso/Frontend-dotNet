import { Box, Button, Card, CardActions, CardContent, CardHeader, Link, Typography } from "@mui/material"
import { PostDTO } from "../../interfaces/interfaces" 
import Avatar from '@mui/material/Avatar';
import { useNavigate } from "react-router-dom";
import RepostButton from "./repostButton";
import ReplyButton from "./replyButton";
import { useAppSelector } from "../../hooks/hooks";
import LikeButton from "./likeButton";
import { IconStar, IconStarFilled } from "@tabler/icons-react";
import { useState } from "react";
import { useAddFavorito } from "../hooks/useAddFavoritos";
//import { IconArrowBigUpLine, IconArrowBigUpLineFilled  } from "@tabler/icons-react";
//import { useState } from "react";
// ... (import statements)

export const Post = ({ post, clickeable }: { post: PostDTO; clickeable: boolean }) => {
  const navigate = useNavigate();
  const instancia = post.instanciaAlias;
  const pathParts = location.pathname.split('/');
  const urlPost = pathParts[2];
  const urlInstancia = pathParts[1];
  const {handleAddFavorito} = useAddFavorito();
  const [liked,setLiked] = useState(post.isUsuarioInFavoritos);
  const [cantFav,setCantFav] = useState(post.cantFavoritos);

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
    if (!clickeable) return;
    e.stopPropagation(); // Stop propagation here
    if (urlPost !== "post") {
      if (urlPost === "searchResults") {
        navigate(`/${urlInstancia}/post/${post.postCitado?.id}`, { state: post });
      } else {
        navigate(`post/${post.postCitado?.id}`, { state: post });
      }
    }
  };

  

    

    const handleLikeClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        handleAddFavorito(post.id)
        {liked ? setCantFav(cantFav-1) : setCantFav(cantFav+1)}
        setLiked(!liked)
        event.stopPropagation();
    };

  return (
    <>
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
                  {/* IMPLEMENTAR REPOST DE REPOST */}
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
            onClick={(e) => e.stopPropagation()}
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
            <RepostButton post={post} />
            <ReplyButton post={post} />


            <Button sx={{ minWidth:40}} aria-label="settings" onClick={handleLikeClick}>
                {liked 
                    ? 
                    <IconStarFilled/>
                    :
                    <IconStar />
                }
                
                
            </Button>


            <Typography>{cantFav}</Typography>
          </CardActions>
        </Card>
      </Box>
    
    }
      
    </>
  );
};
