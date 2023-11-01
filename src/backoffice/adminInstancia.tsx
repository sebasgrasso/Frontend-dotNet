import React, { useState } from 'react';
import { Box, Typography, LinearProgress, Button, List, ListItem, ListItemText, Card, Avatar, CardContent} from '@mui/material';
import { MisUsuariosList } from './listaDeUsuarios';

const AdminInstancia: React.FC = () => {
  // Estado para rastrear la opción seleccionada en la navbar
  const [selectedOption, setSelectedOption] = useState('Inicio');

  const usuarioLogueado = {
    nombre: "Juan Pérez",
    avatarUrl: "url_del_avatar.jpg" // reemplaza esto con la URL de tu avatar
  };

  const renderContent = () => {
    switch (selectedOption) {
      case 'Inicio':
        return (
          <>
            <Box p={3}>
              <Typography variant="h5">Panel Principal</Typography>
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
                marginTop: '20px'
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
      <Box sx={{ width: '250px', borderRight: '1px solid #333333' }}>
        <Card sx={{ backgroundColor: '#333', color: 'white' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', padding: '8px' }}>
            <Avatar src={usuarioLogueado.avatarUrl} alt={usuarioLogueado.nombre} />
            <CardContent>
              <Typography variant="h6">{usuarioLogueado.nombre}</Typography>
              <Typography variant="subtitle1">Usuario Logueado</Typography>
            </CardContent>
          </Box>
        </Card>
        <List >
          {['Inicio', 'Usuarios'].map(option => (
            <ListItem 
              button 
              key={option} 
              onClick={() => setSelectedOption(option)}
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
