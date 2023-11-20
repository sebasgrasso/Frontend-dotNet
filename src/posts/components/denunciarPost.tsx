// profileCard.tsx
import React, { useState } from 'react';
import {Dialog, DialogContent,  Button, IconButton, Box, Typography, TextField, Select, MenuItem, Tooltip } from '@mui/material';
import { IconFlag3, IconX } from '@tabler/icons-react';
import { PostDTO } from '../../interfaces/interfaces';
import { useAppSelector } from '../../hooks/hooks';
import { useReportPost } from '../hooks/useReportPost';
import { useGetReportRazonesQuery } from '../../store/apis/microbApis';



const DenunciarPostButton= ({post}:{post:PostDTO}) => {
    const {handleReportPost} = useReportPost();
    const [contenido, setContenido] = useState("");
    const [openRepost, setOpenRepost] = useState(false);
    const {status} = useAppSelector((state)=>state.auth);
    const [razon, setRazon] = useState('1');
    const {data:razones} = useGetReportRazonesQuery();
    
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        if(status=="authenticated"){
            setOpenRepost(true);
        }
    };

    const handleReplyClose = () => {
        setOpenRepost(false);
    };

    
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setContenido(value);
    };

    const handleReportarClick = ()=>{
        handleReportPost({reportadoId:post.usuarioId,post:post.id,texto:contenido,denunciaRazonId:parseInt(razon)})
        setOpenRepost(false);
    } 


    return (
        <>
            <Tooltip title="Denunciar" >
                <Button sx={{ minWidth:40}} aria-label="settings" onClick={handleClick}>
                    <IconFlag3 />
                </Button>
            </Tooltip>
            
            <Dialog open={openRepost} onClose={handleReplyClose}>
                <DialogContent>
                <Box sx={{ justifyContent: 'center', alignItems: 'flex-start', marginBottom: '5px', width:500}}>
                    <IconButton onClick={handleReplyClose} color="primary">
                        <IconX/>
                    </IconButton>
                    <Typography variant="h6" fontWeight="bold" >
                        Reportar Post
                    </Typography>
                    <br></br>
                    <Select
                        value={razon}
                        onChange={(e) => {setRazon(e.target.value); console.log(e.target.value);
                        }}
                        fullWidth
                    >
                        {razones?.map(option => (
                            <MenuItem key={option.id} value={option.id}>{option.nombre}</MenuItem>
                        ))}

                    </Select>

                    <Box>
                        <TextField
                            fullWidth
                            name="Citar"
                            value={contenido}
                            onChange={handleInputChange}
                            variant="outlined"
                            margin="normal"
                            placeholder='Comentarios...'
                            InputProps={{
                                style: { color: 'black' }
                            }}
                            InputLabelProps={{ style: { color: 'black' } }}
                        />
                    </Box>

                    <Box>
                        <Button variant="contained" sx={{color:"white"}} onClick={handleReportarClick} >Reportar</Button>
                    </Box>
                </Box>
                </DialogContent>
            </Dialog>
        </>
        
    );
}

export default DenunciarPostButton;