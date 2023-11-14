import React, { useState } from 'react';
import { Button, Card, CardContent, Box, TextField, CardHeader, Avatar, Link } from '@mui/material';
import { useCreatePost } from '../hooks/useCreatePost';
import { PostDTO } from '../../interfaces/interfaces';
import { Post } from './post';


const CitarPost = ({post}:{post:PostDTO}) => {
    const {handleCreatePost}= useCreatePost();
    const [contenido, setContenido] = useState("");
    
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setContenido(value);
    };

    const handleGuardarPerfil = ()=>{
        handleCreatePost({contenido,postIdCita:post.id,postIdPadre:null})
    } 

    return (
            <Card sx={{ maxWidth: '450px', width: '100%', bgcolor: '#ffffff', color: 'black' }}>
                <CardHeader 
                //EDITAR AVATAR POR POST.USUARIOPICTURE CUANDO SE IMPLEMENTE
                  avatar={<Avatar src={post.fotoUrl} />}
                  title={<Link href={`/${post.usuarioNickname}`} underline="hover" color="neutral">{post.usuarioNickname}</Link>}
                  subheader={<Link href={`/${post.usuarioUsername}`} underline="none" >@{post.usuarioUsername}@{post.instanciaAlias}</Link>}
                />
                <CardContent>
                    <Box>
                        <TextField
                            fullWidth
                            name="Citar"
                            value={contenido}
                            onChange={handleInputChange}
                            variant="outlined"
                            margin="normal"
                            InputProps={{
                                style: { color: 'black' }
                            }}
                            InputLabelProps={{ style: { color: 'black' } }}
                        />
                    </Box>
                    <Post post={post} clickeable={false} />

                    <Box mt={4}>
                        <Button variant="contained" color="primary" onClick={handleGuardarPerfil} >Crear Post</Button>
                    </Box>
                </CardContent>
            </Card>
    );
}

export default CitarPost;
