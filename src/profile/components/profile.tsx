import React from 'react';
import { Avatar, Button, Card, CardContent, Typography, Box, Grid, IconButton, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useGetUserQuery } from '../../store/apis/microbApis';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import PersonIcon from '@mui/icons-material/Person';
import CakeIcon from '@mui/icons-material/Cake';
import WorkIcon from '@mui/icons-material/Work';
import LinkIcon from '@mui/icons-material/Link';
import BioIcon from '@mui/icons-material/Description';

const Profile = () => {

    const pathParts = window.location.pathname.split('/');
    const idUsuario64 = pathParts[3];
    const idUsuario = atob(idUsuario64);
    const {data: usuario} = useGetUserQuery(idUsuario);

    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1); // Esto llevará al usuario al menú principal o la página anterior
    };

    const handleEditProfile = () => {
        navigate('/edit-profile'); // Ruta de edición de perfil, ajustar según sea necesario
    };

    return (
        <Grid container justifyContent="center" style={{ backgroundColor: '#191B22', minHeight: '100vh' }}>
            <Grid item xs={12} md={6} lg={4}>

                {/* Botón para volver al menú principal */}
                <IconButton onClick={handleBack} style={{ color: 'white', position: 'absolute', top: '20px', left: '20px' }}>
                    <ArrowBackIcon fontSize="large" />
                </IconButton>

                <Card sx={{ my: 5, bgcolor: 'white', color: 'black' }}>
                    <CardContent>
                        <Box display="flex" flexDirection="column" alignItems="center" gap={2} mb={3}>
                            <Avatar src={usuario?.perfil.fotoUrl} alt="Avatar del usuario" sx={{ width: 100, height: 100 }} />
                            <Typography variant="h5">{usuario?.perfil.nickname}</Typography>
                            <Typography variant="body1">@{usuario?.username}</Typography>
                            <Typography variant="body2">{usuario?.cantSeguidores} Seguidores</Typography>
                            <Typography variant="body2">{usuario?.cantSeguidos} Seguidos</Typography>
                        </Box>

                        <Paper variant="outlined" sx={{ p: 2}}>
                            <Grid container spacing={2}>
                                <InfoItem icon={<PersonIcon />} label="Nickname" value={usuario?.perfil.nickname} />
                                <InfoItem icon={<CakeIcon />} label="Fecha de Nacimiento" value={usuario?.perfil.fechaNac} />
                                <InfoItem icon={<BioIcon />} label="Biografía" value={usuario?.perfil.bio} />
                                <InfoItem icon={<WorkIcon />} label="Ocupación" value={usuario?.perfil.ocupacion} />
                                <InfoItem icon={<LinkIcon />} label="Sitio Web" value={usuario?.perfil.sitioWeb} />
                            </Grid>
                        </Paper>

                        {/* Botón de editar perfil */}
                        <Box display="flex" justifyContent="flex-end" mt={2}>
                            <Button variant="contained" startIcon={<EditIcon />} onClick={handleEditProfile} sx={{ bgcolor: 'white', color: '#191B22' }}>
                                Editar Perfil
                            </Button>
                        </Box>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
}

const InfoItem = ({ icon, label, value }) => (
    <Grid item xs={12} display="flex" alignItems="center">
        {icon}
        <Box ml={2}>
            <Typography variant="subtitle2" color="textSecondary">{label}</Typography>
            <Typography variant="body1">{value}</Typography>
        </Box>
    </Grid>
);

export default Profile;
