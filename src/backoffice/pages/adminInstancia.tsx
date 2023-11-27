import React, { useState } from 'react';
import { Box, Typography, List, ListItem, ListItemText, Card, Avatar, CardContent, TextField, Button, Grid, Select, MenuItem, FormControl, InputLabel} from '@mui/material';
import { MisUsuariosList } from './listaDeUsuarios';
import { EstadisticasInstancia } from './estadisticasInstancia';
import { useGetInstanciaQuery, useGetInstanciasQuery, useGetProfileQuery } from '../../store/apis/microbApis';
import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";
import { ToastContainer } from 'react-toastify';
import { getInstanciaStorage } from '../../utils/localstorage';
import { useChangeStatusInstance} from '../hooks/useChangeStatusInstance';
import { useChangeDataInstance} from '../hooks/useChangeDataInstance';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { useRequestConnection } from '../hooks/useRequestConnection';
import { ConexionesEntrantesList } from './listaDeConexionesEntrantes';
import { ConexionesSalientesList } from './listaDeConexionesSalientes'; 
import { DenunciasList } from './listaDeDenuncias'; 
import { skipValue } from '../../store/posts/postsSlice';


const AdminInstancia: React.FC = () => {
  const navigate = useNavigate(); 
  const { alias } = getInstanciaStorage();
  const dispatch = useAppDispatch();
  
  const { role } = useAppSelector((state) => state.auth);

  let menuOptions = ['Inicio', 'Denuncias', 'Usuarios', 'Volver a inicio'];
  if (role === 'Admin') {
    menuOptions = ['Inicio', 'Configuracion','Denuncias', 'Usuarios', 'Volver a inicio'];
  }

  const {data:instancia} = useGetInstanciaQuery({alias: alias});
  const {data: instancias} = useGetInstanciasQuery();

  const [tipoRegistro, setTipoRegistro] = useState(instancia?.tipoRegistro);
  const [idInstancia, setIdInstancia] = useState(1);
  const [nombre, setNombre] = useState(instancia?.nombre);
  const [tema, setTema] = useState(instancia?.tema);
  const [estadosSolicitudes, setEstadosSolicitudes] = useState('Entrante');

  useEffect(() => {
    setNombre(instancia?.nombre);
    setTipoRegistro(instancia?.tipoRegistro);
    setTema(instancia?.tema);
  }, [instancia]);

  const estado = instancia?.isActiva ? 'Activa' : 'Inactiva';

  const {handleChangeStatusInstance} = useChangeStatusInstance();
  const {handleChangeDataInstance} = useChangeDataInstance();
  const {handleRequestConnection} = useRequestConnection();

  const handleNavigation = (option: string) => {
    setSelectedOption(option); 
    if (option === 'Volver a inicio') {
      dispatch(skipValue({skip:0}))
      navigate(`/${alias}`); 
    }
  };
  const [selectedOption, setSelectedOption] = useState('Inicio');

  const {data:miPerfil} = useGetProfileQuery();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [profile, setProfile] = useState({
    nickname: miPerfil?.perfil.nickname || '',
    name: miPerfil?.username || '',
    fotoUrl: miPerfil?.perfil.fotoUrl || '',
  });

  useEffect(() => {
    setProfile({
      nickname: miPerfil?.perfil.nickname || '',
      name: miPerfil?.username || '',
      fotoUrl: miPerfil?.perfil.fotoUrl || '',
    });
  }, [miPerfil]);

  const renderContent = () => {
    switch (selectedOption) {
        case 'Inicio':
        return (
          <>
          <Box p={3}>
            <Typography variant="h5">Menu de Inicio</Typography>
            <EstadisticasInstancia/>
          </Box>
          </>
        );

        case 'Usuarios':
        return (
            <Box p={3}>
            <Typography variant="h5">Panel de Usuarios</Typography>
            <Box
              component="div"
              sx={{
                backgroundColor: '#ffffff',
                borderRadius: '10px',
                backdropFilter: 'blur(10px)',
                padding: '16px',
                overflow: 'auto',
                marginTop: '50px'
              }}
            >
            <MisUsuariosList/>
            </Box>
          </Box>
        );

        case 'Denuncias':
        return (
            <Box p={3}>
            <Typography variant="h5">Panel de Denuncias</Typography>
            <Box
              component="div"
              sx={{
                backgroundColor: '#ffffff',
                borderRadius: '10px',
                backdropFilter: 'blur(10px)',
                padding: '16px',
                overflow: 'auto',
                marginTop: '50px'
              }}
            >
            <DenunciasList/>
            </Box>
          </Box>
        );

        case 'Configuracion':
          return (
            <>
            <Box p={3}>
              <Typography variant="h5">Panel de Configuración</Typography>

              <Grid container spacing={1} className="animate__animated animate__fadeIn">
                <Grid item xs={12} md={8} lg={6} container direction="column" spacing={2}>
                  <Grid item marginTop={3}>
                    <Card>
                                <CardContent>
                                <Typography variant="h6">Estado actual: {estado } </Typography>
                                </CardContent>
                                <Box sx={{ width: '100%', padding: '0 8px 8px 8px' }}> 
                                <Button 
                                  variant="contained" 
                                  color="primary" 
                                  sx={{ width: '100%',color:"white" }} 
                                  onClick={() => handleChangeStatusInstance()}
                                >
                                  Cambiar Estado
                                </Button>
                              </Box>
                    </Card>
                  </Grid>
                  
                  <Grid item>
                    <Card> 
                          <CardContent>
                          <Typography variant="h6">Configuracion general de la instancia</Typography>
                            <TextField
                              label="Nombre"
                              variant="outlined"
                              fullWidth
                              margin="normal"
                              value={nombre}
                              onChange={(e) => setNombre(e.target.value)}
                            />
                            <FormControl fullWidth margin="normal">
                            <InputLabel id="tipo-registro-label">Tipo de registro</InputLabel>
                              <Select
                                labelId="tipo-registro-label"
                                id="tipo-registro"
                                value={tipoRegistro}
                                label="Tipo de registro"
                                onChange={(e) => setTipoRegistro(e.target.value as string)}
                              >
                                <MenuItem value="Abierto">Abierto</MenuItem>
                                <MenuItem value="AbiertoConAprobacion">Abierto con aprobación</MenuItem>
                                <MenuItem value="CerradoConInvitacion">Cerrado con invitación</MenuItem>
                                <MenuItem value="Cerrado">Cerrado</MenuItem>
                              </Select>
                            </FormControl>
                            <FormControl fullWidth margin="normal">
                            <InputLabel id="tema-label">Tema</InputLabel>
                              <Select
                                labelId="tema-label"
                                id="tema"
                                value={tema}
                                label="Tema"
                                onChange={(e) => setTema(e.target.value as string)}
                              >
                                <MenuItem value="azul">Azul</MenuItem>
                                <MenuItem value="verde">Verde</MenuItem>
                                <MenuItem value="rojo">Rojo</MenuItem>
                              </Select>
                            </FormControl>
                          </CardContent>
                          <ListItem>
                            <ListItemText 
                              primary="Tenga en cuenta que al cambiar el tema, deberá refrescar la página para visualizar los cambios." 
                              primaryTypographyProps={{ textAlign: 'center', fontStyle: 'italic' }}
                            />
                          </ListItem>
                          <Button 
                            variant="contained" 
                            color="primary" 
                            sx={{ margin: '8px', color:"white", width: '98%' }}
                            onClick={() => handleChangeDataInstance({nombre, tipoRegistro, tema})}
                          >
                            Guardar
                          </Button>
                    </Card>
                  </Grid>
                  
                  <Grid item>
                    <Card>
                                <CardContent>
                                <Typography variant="h6">Solicitar conexion</Typography>
                                  <FormControl fullWidth margin="normal">
                                  <InputLabel id="id-instancia-label">Instancia</InputLabel>
                                    <Select
                                      labelId="id-instancia-label"
                                      id="id-instancia"
                                      value={idInstancia}
                                      label="Instancia"
                                      onChange={(e) => setIdInstancia(Number(e.target.value))}
                                    >
                                      {instancias?.map((instancia) => (
                                        <MenuItem key={instancia.id} value={instancia.id}>
                                          {instancia.nombre}
                                        </MenuItem>
                                      ))}
                                    </Select>
                                  </FormControl>
                                </CardContent>
                                <Button 
                                  variant="contained" 
                                  color="primary" 
                                  sx={{ margin: '8px', color:"white", width: '98%' }}
                                  onClick={() => handleRequestConnection(idInstancia)}
                                >
                                  Solicitar
                                </Button>
                    </Card>
                  </Grid>

                </Grid>

                <Grid item xs={12} md={4} lg={6} marginTop={3}>
                  <Box
                    component="div"
                    sx={{
                      backgroundColor: '#ffffff',
                      borderRadius: '10px',
                      backdropFilter: 'blur(10px)',
                      padding: '16px',
                      overflow: 'auto',
                    }}
                  >
                   <Typography variant="h6" color={'#000000'} >Solicitud de conexiones</Typography>
                   <FormControl fullWidth margin="normal"  sx={{ width: '40%' }}>
                      <InputLabel id="estado-label">Estado</InputLabel>
                        <Select
                          labelId="estado-label"
                          id="estado"
                          value={estadosSolicitudes}
                          label="Estado"
                          onChange={(e) => setEstadosSolicitudes(e.target.value as string)}
                        >
                          <MenuItem value="Entrante">Por aceptar</MenuItem>
                          <MenuItem value="Saliente">Aceptadas</MenuItem>
                        </Select>
                    </FormControl>
                    {estadosSolicitudes === 'Entrante' ? <ConexionesEntrantesList/> : <ConexionesSalientesList/>}
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </>
          );

      default:
        return null;
    }
  }

  return (
    <Box sx={{ display: 'flex', backgroundColor: '#191b22', minHeight: '100vh', color: 'white' }}>
      <ToastContainer />
      <Box sx={{ width: '250px', borderRight: '1px solid #333333' }}>
        <Card sx={{ backgroundColor: '#333', color: 'white' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', padding: '8px' }}>
            <Avatar src={profile.fotoUrl} alt="Avatar del usuario" />
            <CardContent>
              <Typography variant="h6">{profile.nickname}</Typography>
              <Typography variant="body1">@{profile.name}</Typography>
            </CardContent>
          </Box>
        </Card>
        <List >
          {menuOptions.map(option => (
            <ListItem 
              button 
              key={option} 
              onClick={() => {
                setSelectedOption(option); 
                handleNavigation(option);  
              }}
              sx={{
                backgroundColor: option === selectedOption ? '#3a3f4b' : 'transparent', // Cambia los colores según tus preferencias
                color: option === selectedOption ? 'white' : '#b0b0b0',
                '&:hover': {
                  backgroundColor: '#2a2e38',
                  color: 'white'
                }
              }}
            >
              <ListItemText primary={option} />
            </ListItem>
          ))}
          
        </List>
      </Box>

      <Box flex={1} sx={{ display: 'flex', flexDirection: 'column' }}>
        {renderContent()}
      </Box>
    </Box>
  );
}

export default AdminInstancia;
