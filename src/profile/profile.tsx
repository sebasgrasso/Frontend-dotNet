import React, { useState } from 'react';
import { Avatar, Button, Card, CardContent, Typography, Box, TextField } from '@mui/material';
import { useAppSelector } from '../hooks/hooks';


const Profile = () => {
    const { username,picture,name,birthdate } = useAppSelector((state) => state.auth);
    const [profile, setProfile] = useState({
        nickname: username || '',
        name: name || '',
        birthdate: birthdate,
        photoUrl: picture || '',
        biography: 'Esta es mi biografía...',
        occupation: 'Desarrollador',
        website: 'https://www.ejemplo.com',
    });

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setProfile(prev => ({ ...prev, [name]: value }));
    };

    return (
            <Card sx={{ maxWidth: '450px', width: '100%', bgcolor: '#ffffff', color: 'black' }}>
                <CardContent>
                    <Box display="flex" alignItems="center" gap={2} mb={3}>
                        <Avatar src={profile.photoUrl} alt="Avatar del usuario" />
                        <div>
                            <Typography variant="h6">{profile.name}</Typography>
                            <Typography variant="body1">@{profile.nickname.toLowerCase()}</Typography>
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
                            name="birthdate"
                            type="date"
                            value={profile.birthdate}
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
                            name="biography"
                            value={profile.biography}
                            onChange={handleInputChange}
                            variant="outlined"
                            margin="normal"
                            multiline
                            rows={4}
                        />
                        <TextField
                            fullWidth
                            label="Ocupación"
                            name="occupation"
                            value={profile.occupation}
                            onChange={handleInputChange}
                            variant="outlined"
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            label="Sitio Web"
                            name="website"
                            value={profile.website}
                            onChange={handleInputChange}
                            variant="outlined"
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            label="URL de la Foto"
                            name="photoUrl"
                            value={profile.photoUrl}
                            onChange={handleInputChange}
                            variant="outlined"
                            margin="normal"
                        />
                    </Box>

                    <Box mt={4}>
                        <Button variant="contained" color="primary">Guardar Cambios</Button>
                    </Box>
                </CardContent>
            </Card>
    );
}

export default Profile;
