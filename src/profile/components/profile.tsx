import React, { useState } from 'react';
import { Avatar, Button, Card, CardContent, Typography, Box, TextField } from '@mui/material';
import { useGetProfileQuery } from '../../store/apis/microbApis';
import { useEditProfile } from '../hooks/editProfile';


const Profile = () => {
    const {data:miPerfil} = useGetProfileQuery();
    const {handleEditProfile}=useEditProfile();

    const [profile, setProfile] = useState({
        nickname: miPerfil?.perfil.nickname || '',
        name: miPerfil?.username || '',
        fechaNac: miPerfil?.perfil.fechaNac || '',
        fotoUrl: miPerfil?.perfil.fotoUrl || '',
        bio: miPerfil?.perfil.bio || '',
        ocupacion: miPerfil?.perfil.ocupacion || '',
        sitioWeb: miPerfil?.perfil.sitioWeb || '',
    });

    

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setProfile(prev => ({ ...prev, [name]: value }));
    };

    const handleGuardarPerfil = ()=>{
        handleEditProfile(profile)
    } 

    return (
            <Card sx={{ maxWidth: '450px', width: '100%', bgcolor: '#ffffff', color: 'black' }}>
                <CardContent>
                    <Box display="flex" alignItems="center" gap={2} mb={3}>
                        <Avatar src={profile.fotoUrl} alt="Avatar del usuario" />
                        <div>
                            <Typography variant="h6">{profile.nickname}</Typography>
                            <Typography variant="body1">@{profile.name}</Typography>
                        </div>
                    </Box>

                    <Box>
                        <TextField
                            fullWidth
                            label="Nickname"
                            name="nickname"
                            value={profile.nickname}
                            onChange={handleInputChange}
                            variant="outlined"
                            margin="normal"
                            InputProps={{
                                style: { color: 'black' }
                            }}
                            InputLabelProps={{ style: { color: 'black' } }}
                        />
                        <TextField
                            fullWidth
                            label="Fecha de Nacimiento"
                            name="fechaNac"
                            type="date"
                            value={profile.fechaNac}
                            onChange={handleInputChange}
                            variant="outlined"
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            fullWidth
                            label="Biografía"
                            name="bio"
                            value={profile.bio}
                            onChange={handleInputChange}
                            variant="outlined"
                            margin="normal"
                            multiline
                            rows={4}
                        />
                        <TextField
                            fullWidth
                            label="Ocupación"
                            name="ocupacion"
                            value={profile.ocupacion}
                            onChange={handleInputChange}
                            variant="outlined"
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            label="Sitio Web"
                            name="sitioWeb"
                            value={profile.sitioWeb}
                            onChange={handleInputChange}
                            variant="outlined"
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            label="URL de la Foto"
                            name="fotoUrl"
                            value={profile.fotoUrl}
                            onChange={handleInputChange}
                            variant="outlined"
                            margin="normal"
                        />
                    </Box>

                    <Box mt={4}>
                        <Button variant="contained" color="primary" onClick={handleGuardarPerfil} >Guardar Cambios</Button>
                    </Box>
                </CardContent>
            </Card>
    );
}

export default Profile;
