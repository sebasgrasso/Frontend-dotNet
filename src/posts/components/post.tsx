import { Card, CardActions, CardContent, CardHeader, IconButton, Link, Typography } from "@mui/material"
import { PostDTO } from "../../interfaces/interfaces" 
import Avatar from '@mui/material/Avatar';
import { IconArrowBigUpLine, IconArrowBigUpLineFilled  } from "@tabler/icons-react";
import { useState } from "react";

interface PostProp{
  post:PostDTO
}

export const Post = ({post}:PostProp) =>{
  
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

  return (
        <>
          <Card sx={{ minWidth: 600 }}>
            <CardHeader 
              avatar={<Avatar src="https://www.hindustantimes.com/ht-img/img/2023/08/25/1600x900/international_dog_day_1692974397743_1692974414085.jpg" />}
              title={<Link href={`/${post.usuarioNickname}`} underline="hover" color="neutral">{post.usuarioNickname}</Link>}
              subheader={<Link href={`/${post.usuarioUsername}`} underline="none" >{post.usuarioUsername}</Link>}
            />
            <CardContent>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                {post.contenido}
              </Typography>
              {/* aca va el tuit citado en caso de haberlo*/}
              {post.tieneCita ? 
                <Card sx={{ minWidth: 600 }}>
                <CardHeader 
                  avatar={<Avatar src="https://www.thesprucepets.com/thmb/17UY4UpiMekV7WpeXDziXsnt7q4=/1646x0/filters:no_upscale():strip_icc()/GettyImages-145577979-d97e955b5d8043fd96747447451f78b7.jpg" />}
                  title={<Link href={`/${post.postCitado?.usuarioNickname}`} underline="hover" color="neutral">{post.postCitado?.usuarioNickname}</Link>}
                  subheader={<Link href={`/${post.postCitado?.usuarioUsername}`} underline="none" >{post.postCitado?.usuarioUsername}</Link>}
                />
                <CardContent>
                  <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
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
            
          </Card>
        </>
        
      )
      
}
