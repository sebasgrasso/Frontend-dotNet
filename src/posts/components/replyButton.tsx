// profileCard.tsx
import React, { useState } from 'react';
import {  Dialog, DialogContent, DialogActions, Button, IconButton, Card, CardContent, Box, CardHeader, Avatar, Link, Typography, TextField } from '@mui/material';
import { IconMessage, IconX } from '@tabler/icons-react';
import { PostDTO } from '../../interfaces/interfaces';
import { useCreatePost } from '../hooks/useCreatePost';



const ReplyButton= ({post}:{post:PostDTO}) => {
 
    const {handleCreatePost}= useCreatePost();
    const [contenido, setContenido] = useState("");
    const [openRepost, setOpenRepost] = useState(false);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        setOpenRepost(true);
    };

    const handleReplyClose = () => {
        setOpenRepost(false);
    };

    
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setContenido(value);
    };

    const handleCrearRespuesta = ()=>{
        console.log("contenido: ",contenido," idPadre: ",post.id);
        
        handleCreatePost({contenido,postIdCita:null,postIdPadre:post.id})
        setOpenRepost(false);
    } 

    return (
        <>
            <Button aria-label="settings" onClick={handleClick}>
                <IconMessage />
            </Button>
            
            <Dialog open={openRepost} onClose={handleReplyClose}>
                <DialogContent>
                    <IconButton onClick={handleReplyClose} color="primary">
                        <IconX/>
                    </IconButton>
                    
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
                            <Card sx={{ width: 500, maxWidth: "100%",}}>
                                <CardHeader 
                                //EDITAR AVATAR POR POST.USUARIOPICTURE CUANDO SE IMPLEMENTE
                                avatar={<Avatar src="https://www.hindustantimes.com/ht-img/img/2023/08/25/1600x900/international_dog_day_1692974397743_1692974414085.jpg" />}
                                title={<Link underline="none" >{post.usuarioNickname}</Link>}
                                subheader={<Link underline="none" >@{post.usuarioUsername}@{post.instanciaAlias}</Link>}
                                />
                                <CardContent sx={{paddingTop:1}}>
                                <Typography color="black" gutterBottom>
                                    {post.contenido}
                                </Typography>
                               
                                {/* lo siguiente es el tuit citado en caso de haberlo*/}
                                {   post.tieneCita 
                                ? 
                                    <Card sx={{ width:500,maxWidth:"100%" }}>
                                    <CardHeader 
                                    avatar={<Avatar src="https://www.thesprucepets.com/thmb/17UY4UpiMekV7WpeXDziXsnt7q4=/1646x0/filters:no_upscale():strip_icc()/GettyImages-145577979-d97e955b5d8043fd96747447451f78b7.jpg" />}
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
                            <Button variant="contained" color="primary" onClick={handleCrearRespuesta} >Responder</Button>
                        </Box>
                </DialogContent>
                <DialogActions>
                </DialogActions>
            </Dialog>
        </>
        
    );
}

export default ReplyButton;
