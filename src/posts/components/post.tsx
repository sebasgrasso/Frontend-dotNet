import { Box, Card, CardActions, CardContent, CardHeader, Link, Typography } from "@mui/material"
import { PostDTO } from "../../interfaces/interfaces" 
import Avatar from '@mui/material/Avatar';
import { useNavigate } from "react-router-dom";
import RepostButton from "./repostButton";
import ReplyButton from "./replyButton";
//import { IconArrowBigUpLine, IconArrowBigUpLineFilled  } from "@tabler/icons-react";
//import { useState } from "react";

export const Post = ({post,clickeable}:{post:PostDTO,clickeable:boolean}) =>{
  const navigate = useNavigate();
  const instancia = post.instanciaAlias;

  
  /*  UPVOTES A FUTURO
  const [upvotes,setUpvotes] = useState(post.upvotes)
  const [upvoted,setUpvoted] = useState(post.upvoted)

  const handleUpvote = ()=>{
    setUpvotes(upvotes+1)
    setUpvoted(!upvoted)
  }
  const handleDownvote = ()=>{
    setUpvotes(upvotes-1)
    setUpvoted(!upvoted)
  }*/

  const handlePostClick = () => {
    if(!clickeable) return;
    navigate(`post/${post.id}`, { state: post })
  }

  const handleCitedPostClick = () => {
    if(!clickeable) return;
    navigate(`post/${post.postCitado?.id}`, { state: post })
  }
  
 
  
  return (
        <>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
            <Card sx={{ width: 500, 
                        maxWidth: "100%", 
                        cursor: "pointer",
                        '&:hover': {
                          boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
                          backgroundColor: '#f9f9f9',
                          transition: 'box-shadow 0.3s, background-color 0.3s',},
                      }}
           >
                <CardHeader onClick={handlePostClick}
                //EDITAR AVATAR POR POST.USUARIOPICTURE CUANDO SE IMPLEMENTE
                  avatar={<Avatar src="https://www.hindustantimes.com/ht-img/img/2023/08/25/1600x900/international_dog_day_1692974397743_1692974414085.jpg" />}
                  title={<Link href={`/${instancia}/perfil/${btoa(post.usuarioId.toString())}`} underline="none" >{post.usuarioNickname}</Link>}
                  subheader={<Link href={`/${instancia}/perfil/${btoa(post.usuarioId.toString())}`} underline="none" >@{post.usuarioUsername}@{post.instanciaAlias}</Link>}
                />
                <CardContent >
                  <Typography onClick={handlePostClick} sx={{ fontSize: 14,width:"100%"}} color="black" gutterBottom>
                    {post.contenido}
                  </Typography>
                  {/* lo siguiente es el tuit citado en caso de haberlo*/}
                  {post.tieneCita ? 
                    <Card sx={{ width:500,maxWidth:"100%" }}>
                    <CardHeader 
                      avatar={<Avatar src="https://www.thesprucepets.com/thmb/17UY4UpiMekV7WpeXDziXsnt7q4=/1646x0/filters:no_upscale():strip_icc()/GettyImages-145577979-d97e955b5d8043fd96747447451f78b7.jpg" />}
                      title={<Link href={`/${instancia}/perfil/${btoa(String(post.postCitado?.usuarioId))}`} underline="none" >{post.postCitado?.usuarioNickname}</Link>}
                      subheader={<Link href={`/${instancia}/perfil/${btoa(String(post.postCitado?.usuarioId))}`} underline="none" >@{post.postCitado?.usuarioUsername}@{post.postCitado?.instanciaAlias}</Link>}
                    />
                    <CardContent onClick={handleCitedPostClick} >
                      <Typography sx={{ fontSize: 14 }} color="black" gutterBottom>
                        {post.postCitado?.contenido}
                      </Typography>
                    </CardContent>
                    <CardActions>
                    </CardActions>
                  </Card> : null           
                  }
                </CardContent>
                {/* BOTON DE UPVOTE
                  !upvoted ? 
                  <CardActions>
                    <IconButton onClick={handleUpvote} sx={ { "&:hover": { backgroundColor: "#b7e778",color:"#468966" } }} >
                      <IconArrowBigUpLine />
                    </IconButton>
                    <Typography> {upvotes} </Typography>
                  </CardActions>:
                  <CardActions>
                    <IconButton onClick={handleDownvote} sx={ { "&:hover": { backgroundColor: "#eaceb4",color:"#ff0000" } }} >
                      <IconArrowBigUpLineFilled />
                    </IconButton>
                  <Typography> {upvotes} </Typography>
                </CardActions>*/
                }
                <CardActions>
                  <RepostButton post={post} />
                  <ReplyButton post={post} />
                </CardActions>
              </Card>
          </Box>
          
        </>
        
      )
      
}
