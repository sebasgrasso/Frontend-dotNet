import React, { useState } from 'react';
import { Box, Typography, List, ListItem, ListItemText, Card, Avatar, CardContent, TextField, Button, Grid, Select, MenuItem, FormControl, InputLabel} from '@mui/material';
import { MisUsuariosList } from './listaDeUsuarios';
import { EstadisticasInstancia } from './estadisticasInstancia';
import { useGetInstanciaQuery, useGetProfileQuery } from '../../store/apis/microbApis';
import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";
import { ToastContainer } from 'react-toastify';
import { getInstanciaStorage } from '../../utils/localstorage';
import { useChangeStatusInstance} from '../hooks/useChangeStatusInstance';
import { useChangeDataInstance} from '../hooks/useChangeDataInstance';
import { useAppSelector } from '../../hooks/hooks';

const AdminInstancia: React.FC = () => {
  const navigate = useNavigate(); 
  const {alias} = getInstanciaStorage();

  const { role } = useAppSelector((state) => state.auth);

  let menuOptions = ['Inicio', 'Usuarios', 'Volver a inicio'];
  if (role === 'Admin') {
    menuOptions = ['Inicio', 'Configuracion', 'Usuarios', 'Volver a inicio'];
  }

  const {data:instancia} = useGetInstanciaQuery({alias: alias});
  const reg = instancia?.tipoRegistro;

  const [tipoRegistro, setTipoRegistro] = useState(reg);
  const [nombre, setNombre] = useState(instancia?.nombre);

  const estado = instancia?.isActiva ? 'Activa' : 'Inactiva';


  const {handleChangeStatusInstance} = useChangeStatusInstance();
  const {handleChangeDataInstance} = useChangeDataInstance();

  const handleNavigation = (option: string) => {
    setSelectedOption(option); 
    if (option === 'Volver a inicio') {
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

        case 'Configuracion':
          return (
            <Box p={3}>
            <Typography variant="h5">Panel de Configuracion</Typography>
            <Grid container spacing={2} className="animate__animated animate__fadeIn">
              <Grid item xs={12} lg={3} marginTop={5}>
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
                        onChange={(event) => setTipoRegistro(event.target.value)}
                      >
                        <MenuItem value="Abierto">Abierto</MenuItem>
                        <MenuItem value="AbiertoConAprobacion">Abierto con aprobación</MenuItem>
                        <MenuItem value="CerradoConInvitacion">Cerrado con invitación</MenuItem>
                        <MenuItem value="Cerrado">Cerrado</MenuItem>
                      </Select>
                    </FormControl>
                  </CardContent>
                  <Button 
                    variant="contained" 
                    color="primary" 
                    sx={{ margin: '8px' }}
                    onClick={() => handleChangeDataInstance({nombre, tipoRegistro})}
                  >
                    Guardar
                  </Button>
                </Card>
              </Grid>
              <Grid item xs={12} lg={3} marginTop={5}>
                <Card>
                  <CardContent>
                  <Typography variant="h6">Estado actual: {estado } </Typography>
                  </CardContent>
                  <Box sx={{ width: '100%', padding: '0 8px 8px 8px' }}> 
                  <Button 
                    variant="contained" 
                    color="primary" 
                    sx={{ width: '100%' }} 
                    onClick={() => handleChangeStatusInstance()}
                  >
                    Cambiar Estado
                  </Button>
                </Box>
                </Card>
              </Grid>
            </Grid>
            </Box>
          );

      default:
        return null;
    }
  }

  return (
    <Box sx={{ display: 'flex', backgroundColor: '#191b22', height: '100vh', color: 'white' }}>
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

      <Box flex={1}>
        {renderContent()}
      </Box>
    </Box>
  );
}

export default AdminInstancia;
