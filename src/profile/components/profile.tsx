import {useState, useEffect} from 'react';
import { Avatar, Button, Card, CardContent, Typography, Box, Grid, IconButton, Paper, Link, Divider, ListItem, ListItemText, ListItemIcon, Checkbox } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useGetOptionsUserQuery, useGetSeguidoresQuery, useGetUserQuery } from '../../store/apis/microbApis';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
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
import { useFollowUser } from '../../backoffice/hooks/useFollowUser';
import { useUserNotifications } from '../hooks/useSetNotifications';
import HttpsIcon from '@mui/icons-material/Https';
import { MisBloqueadosList } from './listaDeBloqueados';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LockIcon from '@mui/icons-material/Lock';
import { useGetUsersPrivacityQuery } from "../../store/apis/microbApis";
import { useBlockPrivateUser } from '../hooks/useBlockPrivateUser';


const Profile = () => {
    const pathParts = window.location.pathname.split('/');
    const idUsuario64 = pathParts[3];
    const idUsuario = atob(idUsuario64);
    const {data: usuario} = useGetUserQuery(idUsuario);
    const idUserLogueado = useAppSelector((state)=>state.auth.id);
    const [year, month, day] = usuario?.perfil.fechaNac?.split('-') ?? [0, 0, 0];
    const fechaNac = `${day}/${month}/${year}`;
    const idNumber = parseInt(idUsuario);
    const [isFollowing, setIsFollowing] = useState(false);
    const [isBlocked, setIsBlocked] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const {data : usuariosPrivacidad} = useGetUsersPrivacityQuery();
    const seguidores = useGetSeguidoresQuery(idNumber);

    useEffect(() => {
        if (seguidores.data) {
            const seguidoresIds = seguidores.data?.map((seguidor) => seguidor.id);
            if(idUserLogueado){
                const idUserLogueadoNumber = parseInt(idUserLogueado);
                setIsFollowing(seguidoresIds.includes(idUserLogueadoNumber));
            }
        }
    }, [seguidores, idUserLogueado]);

    useEffect(() => {
        if (usuariosPrivacidad) {
            const usuarioPrivacidad = usuariosPrivacidad.find((usuarioPrivado) => usuarioPrivado.usuarioPrivado.id === idNumber);
                setIsBlocked(usuarioPrivacidad?.isBloqueado);
                setIsMuted(usuarioPrivacidad?.isSilenciado);
        }
    }, [usuariosPrivacidad, idNumber]);
    

    const {handleUserNotifications} = useUserNotifications();
    const {data : notificacionesUsuario} = useGetOptionsUserQuery();
    const [nuevoPostNotif, setNuevoPostNotif] = useState(false);
    const [seguirNotif, setSeguirNotif] = useState(false);
    const [favoritoNotif, setFavoritoNotif] = useState(false);

    useEffect(() => {
        if (notificacionesUsuario) {
            const {nuevoPostNotifi, seguirNotifi, favoritoNotifi} = notificacionesUsuario;
            setNuevoPostNotif(nuevoPostNotifi || false);
            setSeguirNotif(seguirNotifi || false);
            setFavoritoNotif(favoritoNotifi || false);
        }
    }, [notificacionesUsuario]);

    const { handleFollowUser } = useFollowUser();
    const { handleBlockPrivateUser } = useBlockPrivateUser();


    const handleFollowToggle = () => {
        handleFollowUser(idNumber);
    };
    const handleBlockToggle = () => {
        handleBlockPrivateUser(idNumber,!isBlocked,false,0);
    };
    const handleMuteToggle = () => {
        //logica
    };

    const handleSaveNotifications = () => {
        handleUserNotifications({nuevoPostNotifi : nuevoPostNotif , seguirNotifi : seguirNotif, favoritoNotifi : favoritoNotif});
    }

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
        <Grid container spacing={2} justifyContent="center" style={{ backgroundColor: '#191B22', minHeight: '100vh' }}>
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
                                        {isBlocked ? <LockOpenIcon  /> : <LockIcon/>}
                                    </IconButton>
                                </Tooltip>

                                <Tooltip title={isMuted ? "No silenciar" : "Silenciar"}>
                                    <IconButton onClick={handleMuteToggle}>
                                    {isMuted ? <MuteIcon /> : < SoundIcon />}
                                    </IconButton>
                                </Tooltip>
                            </Box> : null}

                            {idUserLogueado === idUsuario ?                             
                            <Button variant="contained" startIcon={<EditIcon />} onClick={handleOpenModal} sx={{ bgcolor: 'white', color: '#191B22' }}>
                                Editar Perfil
                            </Button>: null}

                            {idUserLogueado === idUsuario ?                             
                            <Button variant="contained" startIcon={<HttpsIcon />} onClick={handleOpenModal} sx={{ bgcolor: 'white', color: '#191B22' }}>
                                Cambiar Contraseña
                            </Button>: null}
                            
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
                <Grid item xs={12} md={6} lg={3}>
                    <Card sx={{ my: 5, bgcolor: 'white', color: 'black', maxHeight: '600px', overflow: 'auto' }}>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>Notificaciones</Typography>
                            <Divider />
                            <ListItem>
                                <ListItemText primary="Notificacion de un nuevo post" />
                                <ListItemIcon>
                                    <Checkbox
                                        checked={nuevoPostNotif}
                                        edge="start"
                                        tabIndex={-1}
                                        disableRipple
                                        onChange={(e) => setNuevoPostNotif(e.target.checked)}
                                    />
                                </ListItemIcon>
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="Notificacion de seguidor" />
                                <ListItemIcon>
                                    <Checkbox
                                        checked={seguirNotif}
                                        edge="start"
                                        tabIndex={-1}
                                        disableRipple
                                        onChange={(e) => setSeguirNotif(e.target.checked)}
                                    />
                                </ListItemIcon>
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="Notificacion de favoritos" />
                                <ListItemIcon>
                                    <Checkbox
                                        checked={favoritoNotif}
                                        edge="start"
                                        tabIndex={-1}
                                        disableRipple
                                        onChange={(e) => setFavoritoNotif(e.target.checked)}
                                    />
                                </ListItemIcon>
                            </ListItem>
                            <ListItem >
                                <Button variant="contained" onClick={handleSaveNotifications} startIcon={<SaveIcon />} sx={{ bgcolor: 'white', color: '#191B22' }}>
                                    Guardar
                                </Button>
                            </ListItem>
                        </CardContent>
                    </Card>

                    {idUserLogueado === idUsuario ?             
                        <Grid item xs={12} md={12} lg={12}>
                            <Card sx={{ my: 5, bgcolor: 'white', color: 'black', maxHeight: '600px', overflow: 'auto' }}>
                                <CardContent>
                                    <Typography variant="h6" gutterBottom>Mis Bloqueados</Typography>
                                    <Divider/>
                                    <MisBloqueadosList/>
                                </CardContent>
                            </Card>
                        </Grid> 
                    : null}

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
