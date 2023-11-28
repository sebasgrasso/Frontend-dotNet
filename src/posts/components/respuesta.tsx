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
  const pathParts = location.pathname.split('/');
  const urlInstancia = pathParts[1];
  
  return (
        <>
        <Box sx={{justifyContent: 'center', marginLeft: '26px' }}>
          <Card sx={{ width:500, maxWidth: "100%" }}>
            <CardHeader 
              avatar={<Avatar src={post.fotoUrl} />}
              title={
                <>
                    <Link sx={{padding:"6px"}} href={`/${urlInstancia}/perfil/${btoa(String(post.usuarioId))}`} underline="none" >{`${post.usuarioNickname}`}</Link>
                    <Link href={`/${urlInstancia}/perfil/${btoa(String(post.usuarioId))}`} underline="none" >@{post.usuarioUsername}</Link>
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
            </CardContent>
            
          </Card>
          </Box>
        </>
        
      )
      
}
