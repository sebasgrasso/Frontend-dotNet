import { Box, Card, CardActions, CardContent, CardHeader, Link, Typography } from "@mui/material"
import { PostDTO } from "../../interfaces/interfaces" 
import Avatar from '@mui/material/Avatar';
//import { IconArrowBigUpLine, IconArrowBigUpLineFilled  } from "@tabler/icons-react";
//import { useState } from "react";

interface PostProp{
  post:PostDTO;
  padre:string;
}


export const Respuesta = ({post,padre}:PostProp) =>{

  return (
        <>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', marginBottom: '5px'}}>
          <Card sx={{ width:500, maxWidth: "100%" }}>
            <CardHeader 
              avatar={<Avatar src={post.fotoUrl} />}
              title={
                <>
                    <Link sx={{padding:"6px"}} href={`/${post.usuarioNickname}`} underline="none" >{`${post.usuarioNickname}`}</Link>
                    <Link href={`/${post.usuarioUsername}`} underline="none" >@{post.usuarioUsername}</Link>
                </>}
              subheader={
                <Typography fontSize={12}>
                     {`Respondiendo a ${padre}`}
                </Typography>
                }
            />
            <CardContent>
              <Typography sx={{ fontSize: 14 }} color="black" gutterBottom>
                {post.contenido}
              </Typography>
              {/* aca va el tuit citado en caso de haberlo*/}
              {post.tieneCita ? 
                <Card sx={{ minWidth: 600 }}>
                <CardHeader 
                //EDITAR AVATAR POR POST.USUARIOPICTURE CUANDO SE IMPLEMENTE
                  avatar={<Avatar src={post.postCitado?.fotoUrl} />}
                  title={<Link href={`/${post.postCitado?.usuarioNickname}`} underline="hover" color="neutral">{post.postCitado?.usuarioNickname}</Link>}
                  subheader={<Link href={`/${post.postCitado?.usuarioUsername}`} underline="none" >{post.postCitado?.usuarioUsername}</Link>}
                />
                <CardContent>
                  <Typography sx={{ fontSize: 14 }} color="black" gutterBottom>
                    {post.postCitado?.contenido}
                  </Typography>
                </CardContent>
                <CardActions>
                </CardActions>
              </Card> : null           
              }
            </CardContent>
            
          </Card>
          </Box>
        </>
        
      )
      
}
