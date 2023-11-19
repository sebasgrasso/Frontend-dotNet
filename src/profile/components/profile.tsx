import {useState, useEffect} from 'react';
import { Avatar, Button, Card, CardContent, Typography, Box, Grid, IconButton,TextField, Paper, Link,Select,MenuItem, Divider, ListItem, ListItemText, ListItemIcon, Checkbox } from '@mui/material';
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
import { useSilencePrivateUser } from '../hooks/useSilencePrivateUser';
import { useChangePassword } from '../hooks/useChangePassword';


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
    const [openChangePasswordModal, setOpenChangePasswordModal] = useState(false);
    const handleOpenChangePasswordModal = () => setOpenChangePasswordModal(true);
    const handleCloseChangePasswordModal = () => setOpenChangePasswordModal(false);

    const [openMuteModal, setOpenMuteModal] = useState(false);
    const [muteDuration, setMuteDuration] = useState('1');
    const handleOpenMuteModal = () => setOpenMuteModal(true);
    const handleCloseMuteModal = () => setOpenMuteModal(false);



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
    const { handleSilencePrivateUser } = useSilencePrivateUser();
    const {handleChangePassword} = useChangePassword();

    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const handleFollowToggle = () => {
        handleFollowUser(idNumber);
    };
    const handleBlockToggle = () => {
        handleBlockPrivateUser(idNumber,!isBlocked,false,0);
    };
    const handleMuteToggle = () => {
        const duracion = parseInt(muteDuration) * 60;
        handleSilencePrivateUser(idNumber,false,!isMuted,duracion);
    };

    const handleSaveNotifications = () => {
        handleUserNotifications({nuevoPostNotifi : nuevoPostNotif , seguirNotifi : seguirNotif, favoritoNotifi : favoritoNotif});
    }

    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1); 
    };

    const handleSubmitChangePassword = (e) => {
        e.preventDefault(); 
        if (!oldPassword || !newPassword) return;
        handleChangePassword(oldPassword, newPassword);
        handleCloseChangePasswordModal(); 
    };

    const [openModal, setOpenModal] = useState(false);

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    return (
        <Grid container spacing={1} justifyContent="center" style={{ backgroundColor: '#191B22', minHeight: '101vh', overflowY: 'hidden'}}>
            <ToastContainer />
            <Modal
                open={openChangePasswordModal}
                onClose={handleCloseChangePasswordModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Box sx={{ bgcolor: 'background.paper', p: 2, borderRadius: 2, width: 300}}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Cambiar Contraseña
                    </Typography>
                    <Box component="form" onSubmit={handleSubmitChangePassword} sx={{ mt: 2 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="oldPassword"
                            label="Contraseña Anterior"
                            type="password"
                            id="oldPassword"
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                            autoComplete="current-password"
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="newPassword"
                            label="Contraseña Nueva"
                            type="password"
                            id="newPassword"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            autoComplete="new-password"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Cambiar Contraseña
                        </Button>
                    </Box>
                </Box>
            </Modal>
            <Modal
                open={openMuteModal}
                onClose={handleCloseMuteModal}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <Paper sx={{
                    width: 400, 
                    padding: '20px',
                    outline: 'none' 
                }}>
                    <Typography variant="h6">Seleccione la duración</Typography>
                    <Select
                        value={muteDuration}
                        onChange={(e) => setMuteDuration(e.target.value)}
                        fullWidth
                    >
                        <MenuItem value="1">1 Hora</MenuItem>
                        <MenuItem value="5">5 Horas</MenuItem>
                        <MenuItem value="12">12 Horas</MenuItem>
                        <MenuItem value="24">24 Horas</MenuItem>
                    </Select>
                    <Button 
                        onClick={() => { 
                            handleMuteToggle();     
                            handleCloseMuteModal(); 
                        }}
                        sx={{ mt: 2 }}
                        fullWidth
                        variant="contained"
                    >
                        Aceptar
                    </Button>
                </Paper>
            </Modal>

            <Grid item xs={12} md={6} lg={4}>
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
                                    {isMuted ? 
                                    <IconButton onClick={handleMuteToggle}>
                                        {<MuteIcon />}
                                    </IconButton> : 
                                     <IconButton onClick={handleOpenMuteModal}>
                                        {<SoundIcon />}
                                    </IconButton>
                                 }
                                </Tooltip>
                            </Box> : null}

                            {idUserLogueado === idUsuario ?                             
                            <Button variant="contained" startIcon={<EditIcon />} onClick={handleOpenModal} sx={{ bgcolor: 'white', color: '#191B22' }}>
                                Editar Perfil
                            </Button>: null}

                            {idUserLogueado === idUsuario ?                             
                            <Button variant="contained" startIcon={<HttpsIcon />} onClick={handleOpenChangePasswordModal} sx={{ bgcolor: 'white', color: '#191B22' }}>
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
                    <Card sx={{ my: 5, bgcolor: 'white', color: 'black', maxHeight: '600px'}}>
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
                    <Grid item >
                            <Card sx={{bgcolor: 'white', color: 'black', maxHeight: '357px'}}>
                                <CardContent>
                                    <Typography variant="h6" gutterBottom>Mis Bloqueados</Typography>
                                    <Divider/>
                                    <MisBloqueadosList/>
                                </CardContent>
                            </Card>
                        </Grid> 
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
