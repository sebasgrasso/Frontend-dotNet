// profileCard.tsx
import React, { useState } from 'react';
import {  Dialog, DialogContent, DialogActions, Button, IconButton, Card, CardContent, Box, CardHeader, Avatar, Link, Typography, TextField, Tooltip } from '@mui/material';
import { IconMessage2Plus, IconX } from '@tabler/icons-react';
import { PostDTO } from '../../interfaces/interfaces';
import { useCreatePost } from '../hooks/useCreatePost';
import { useAppSelector } from '../../hooks/hooks';



const ReplyButton= ({post}:{post:PostDTO}) => {
    const {status} = useAppSelector((state)=>state.auth)
    const {handleCreatePost}= useCreatePost();
    const [contenido, setContenido] = useState("");
    const [openRepost, setOpenRepost] = useState(false);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        if(status=="authenticated"){
            setOpenRepost(true);
        }
        event.stopPropagation();
    };

    const handleReplyClose = () => {
        setOpenRepost(false);
    };

    
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setContenido(value);
    };

    const handleCrearRespuesta = ()=>{
        if (post.tieneCita && post.contenido!=null){
            handleCreatePost({contenido,postIdCita:null,postIdPadre:post.id})
            setContenido("");
            setOpenRepost(false);
        }
        else if (post.tieneCita && post.contenido==null && post.postCitado){
            handleCreatePost({contenido,postIdCita:null,postIdPadre:post.postCitado.id})
            setContenido("");
            setOpenRepost(false);
        }
    } 
    
    
    return (
        <>
            <Tooltip title="Respuestas">
                <Button sx={{ minWidth:40}} aria-label="settings" onClick={handleClick}>
                    <IconMessage2Plus />
                    <Typography sx={{marginLeft:"5px"}} >{post.cantMensaje}</Typography>
                </Button>
            </Tooltip>
                
            
            <Dialog open={openRepost} onClose={handleReplyClose}>
                <DialogContent>
                    <IconButton onClick={handleReplyClose} color="primary">
                        <IconX/>
                    </IconButton>
                    
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
                        {post.tieneCita && post.contenido==null ? 
                    
                            <Card sx={{ width:500,maxWidth:"100%" }}>
                                <Typography>{`Reposteado por @${post.usuarioNickname}`}</Typography>
                            <CardHeader 
                            avatar={<Avatar src={post.postCitado?.fotoUrl} />}
                            title={<Link underline="none" >{post.postCitado?.usuarioNickname}</Link>}
                            subheader={<Link underline="none" >@{post.postCitado?.usuarioUsername}@{post.postCitado?.instanciaAlias}</Link>}
                            />
                            <CardContent>
                            <Typography sx={{ fontSize: 14 }} color="black" gutterBottom>
                                {post.postCitado?.contenido}
                            </Typography>
                            </CardContent>
                            </Card> 
                                         
                        :
                                
                                <Card sx={{ width: 500, maxWidth: "100%",}}>
                                <CardHeader 
                                avatar={<Avatar src={post.fotoUrl} />}
                                title={<Link underline="none" >{post.usuarioNickname}</Link>}
                                subheader={<Link underline="none" >@{post.usuarioUsername}@{post.instanciaAlias}</Link>}
                                />
                                <CardContent sx={{paddingTop:1}}>
                                <Typography color="black" gutterBottom>
                                    {post.contenido}
                                </Typography>

                                {   post.tieneCita 
                                ? 
                                    <Card sx={{ width:500,maxWidth:"100%" }}>
                                    <CardHeader 
                                    avatar={<Avatar src={post.postCitado?.fotoUrl} />}
                                    title={<Link underline="none" >{post.postCitado?.usuarioNickname}</Link>}
                                    subheader={<Link underline="none" >@{post.postCitado?.usuarioUsername}@{post.postCitado?.instanciaAlias}</Link>}
                                    />
                                    <CardContent>
                                    <Typography sx={{ fontSize: 14 }} color="black" gutterBottom>
                                        {post.postCitado?.contenido}
                                    </Typography>
                                    </CardContent>
                                    </Card> 
                                : 
                                    null
                                }
                                </CardContent>
                        
                                </Card>
                               
                                
                    
                    
                    }
                        
                    </Box>

                    <Box>
                        <Typography sx={{ fontSize: 14,width:"100%",mt:"5px" }} >{`Respondiendo a @${post.usuarioUsername}`}</Typography>
                        <TextField
                            fullWidth
                            name="Citar"
                            value={contenido}
                            onChange={handleInputChange}
                            variant="outlined"
                            margin="normal"
                            placeholder='Postea tu respuesta'
                            InputProps={{
                                style: { color: 'black' }
                            }}
                            InputLabelProps={{ style: { color: 'black' } }}
                        />
                    </Box>

                    <Box>
                        <Button variant="contained" sx={{color:"white"}} onClick={handleCrearRespuesta} >Responder</Button>
                    </Box>
                </DialogContent>
                <DialogActions>
                </DialogActions>
            </Dialog>
        </>
        
    );
}

export default ReplyButton;
