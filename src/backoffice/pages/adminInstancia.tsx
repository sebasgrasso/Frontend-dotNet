import React, { useState } from 'react';
import { Box, Typography, List, ListItem, ListItemText, Card, Avatar, CardContent} from '@mui/material';
import { MisUsuariosList } from './listaDeUsuarios';
import { EstadisticasInstancia } from './estadisticasInstancia';
import { useGetProfileQuery } from '../../store/apis/microbApis';
import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";
import { ToastContainer } from 'react-toastify';
import { useAppSelector } from '../../hooks/hooks';


const AdminInstancia: React.FC = () => {
  const navigate = useNavigate(); 
  const {alias} = useAppSelector((state)=>state.instance)

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
            <EstadisticasInstancia/>
            </Box>
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
          {['Inicio', 'Usuarios', 'Volver a inicio'].map(option => (
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
