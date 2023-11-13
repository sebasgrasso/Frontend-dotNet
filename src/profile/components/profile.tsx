import {useState} from 'react';
import { Avatar, Button, Card, CardContent, Typography, Box, Grid, IconButton, Paper, Link, Divider, List, ListItem, ListItemText } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useGetUserQuery } from '../../store/apis/microbApis';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import PersonIcon from '@mui/icons-material/Person';
import CakeIcon from '@mui/icons-material/Cake';
import WorkIcon from '@mui/icons-material/Work';
import LinkIcon from '@mui/icons-material/Link';
import BioIcon from '@mui/icons-material/Description';
import { useAppSelector } from '../../hooks/hooks';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import EditProfile from './editProfile';
import { ToastContainer } from 'react-toastify';
import UnfollowIcon from '@mui/icons-material/PersonRemove'; 
import MuteIcon from '@mui/icons-material/VolumeOff'; 
import Tooltip from '@mui/material/Tooltip'; 
import { IconUserPlus } from '@tabler/icons-react';
import SoundIcon from '@mui/icons-material/VolumeUp'; 
import { IconFlagOff } from '@tabler/icons-react';
import { IconFlag } from '@tabler/icons-react';





const Profile = () => {
    const pathParts = window.location.pathname.split('/');
    const idUsuario64 = pathParts[3];
    const idUsuario = atob(idUsuario64);
    const {data: usuario} = useGetUserQuery(idUsuario);
    const idUserLogueado = useAppSelector((state)=>state.auth.id);
    const [year, month, day] = usuario?.perfil.fechaNac?.split('-') ?? [0, 0, 0];
    const fechaNac = `${day}/${month}/${year}`;

    const [isFollowing, setIsFollowing] = useState(false);
    const [isBlocked, setIsBlocked] = useState(false);
    const [isMuted, setIsMuted] = useState(false); 

    const handleFollowToggle = () => {
        //logica
        setIsFollowing(!isFollowing);
    };
    const handleBlockToggle = () => {
        //logica
        setIsBlocked(!isBlocked);
    };
    const handleMuteToggle = () => {
        //logica
        setIsMuted(!isMuted);
    };

    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1); 
    };

    const [openModal, setOpenModal] = useState(false);

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    return (
        <Grid container justifyContent="center" style={{ backgroundColor: '#191B22', minHeight: '100vh' }}>\
            <ToastContainer />
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
                                <InfoItem icon={<CakeIcon />} label="Fecha de Nacimiento" value={fechaNac} />
                                <InfoItem icon={<BioIcon />} label="Biografía" value={usuario?.perfil.bio} />
                                <InfoItem icon={<WorkIcon />} label="Ocupación" value={usuario?.perfil.ocupacion} />
                                <InfoItem icon={<LinkIcon />} label="Sitio Web" value={usuario?.perfil.sitioWeb ? (<Link href={usuario.perfil.sitioWeb} target="_blank" rel="noopener noreferrer" color="inherit"> {usuario.perfil.sitioWeb} </Link> ) : 'No proporcionado'} />
                            </Grid>                      
                        </Paper>

                        <Box display="flex" justifyContent="space-between" mt={2} alignItems="center">

                            {idUserLogueado != idUsuario ?                          
                            <Box>
                                <Tooltip title={isFollowing ? "Dejar de seguir" : "Seguir"}>
                                    <IconButton onClick={handleFollowToggle}>
                                    {isFollowing ? <UnfollowIcon /> : <IconUserPlus />}
                                    </IconButton>
                                </Tooltip>

                                <Tooltip title={isBlocked ? "Desbloquear" : "Bloquear"}>
                                    <IconButton onClick={handleBlockToggle}>
                                        {isBlocked ? <IconFlagOff  /> : < IconFlag/>}
                                    </IconButton>
                                </Tooltip>

                                <Tooltip title={isMuted ? "Desmutear" : "Mutear"}>
                                    <IconButton onClick={handleMuteToggle}>
                                    {isMuted ? <MuteIcon /> : < SoundIcon />}
                                    </IconButton>
                                </Tooltip>
                            </Box> : null}

                            {idUserLogueado === idUsuario ?                             
                            <Button variant="contained" startIcon={<EditIcon />} onClick={handleOpenModal} sx={{ bgcolor: 'white', color: '#191B22' }}>
                                Editar Perfil
                            </Button> : null}
                            
                            <Modal
                                aria-labelledby="transition-modal-title"
                                aria-describedby="transition-modal-description"
                                open={openModal}
                                onClose={handleCloseModal}
                                closeAfterTransition
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <Fade in={openModal}>
                                    <Box sx={{ outline: '' }}>
                                        <EditProfile onCloseModal={handleCloseModal} />
                                    </Box>
                                </Fade>
                            </Modal>

                        </Box>
                    </CardContent>
                </Card>
            </Grid>

            {idUserLogueado === idUsuario ?             
                <Grid item xs={12} marginLeft={4} lg={2}>
                    <Card sx={{ my: 5, bgcolor: 'white', color: 'black', maxHeight: '600px', overflow: 'auto' }}>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>Mis Configuraciones</Typography>
                            <Divider />
                            <List component="nav" aria-label="mailbox folders">
                                <ListItem button>
                                    <ListItemText primary="Seguridad / visibilidad" />
                                </ListItem>
                                <Divider />
                                <ListItem button divider>
                                    <ListItemText primary="Notificaciones" />
                                </ListItem>
                            </List>
                        </CardContent>
                    </Card>
                </Grid> 
            : null}

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
