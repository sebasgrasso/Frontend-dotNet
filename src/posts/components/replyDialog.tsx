import React, { useState } from 'react';
import { Button, Card, CardContent, Box, TextField, CardHeader, Avatar, Link, CardActions, Typography} from '@mui/material';
import { useCreatePost } from '../hooks/useCreatePost';
import { PostDTO } from '../../interfaces/interfaces';


const ResponderPost = ({post}:{post:PostDTO}) => {
    const {handleCreatePost}= useCreatePost();
    const [contenido, setContenido] = useState("");
    
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setContenido(value);
    };

    const handleCrearRespuesta = ()=>{
        handleCreatePost({contenido,postIdCita:null,postIdPadre:post.id})
    } 

    return (
            <Card sx={{ maxWidth: '450px', width: '100%', bgcolor: '#ffffff', color: 'black' }}>
                <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
                        <Card sx={{ width: 500, maxWidth: "100%",}}
                        >
                            <CardHeader 
                            //EDITAR AVATAR POR POST.USUARIOPICTURE CUANDO SE IMPLEMENTE
                            avatar={<Avatar src={post.fotoUrl} />}
                            title={<Link underline="none" >{post.usuarioNickname}</Link>}
                            subheader={<Link underline="none" >@{post.usuarioUsername}@{post.instanciaAlias}</Link>}
                            />
                            <CardContent>
                            <Typography sx={{ fontSize: 14,width:"100%" }} color="black" gutterBottom>
                                {post.contenido}
                            </Typography>
                            {/* lo siguiente es el tuit citado en caso de haberlo*/}
                            {post.tieneCita ? 
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
                                <CardActions>
                                </CardActions>
                            </Card> : null           
                            }
                            </CardContent>
                        
                        </Card>
                    </Box>

                    <Box>
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

                    <Box mt={4}>
                        <Button variant="contained" color="primary" onClick={handleCrearRespuesta} >Responder</Button>
                    </Box>
                </CardContent>
            </Card>
    );
}

export default ResponderPost;
