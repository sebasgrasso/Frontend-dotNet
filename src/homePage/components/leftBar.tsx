import React from 'react';
import { Box, Paper, Typography, List, ListItem, ListItemText  } from '@mui/material';
import { useGetTrendsQuery } from '../../store/apis/microbApis';
import { useNavigate } from 'react-router-dom';
import logoPng from '../img/logo.png';

const LeftBar: React.FC = () => {
  const {data:trends} = useGetTrendsQuery();
  const navigate = useNavigate();

  const pathParts = location.pathname.split('/');
  const urlSearchbar = pathParts[2];
  const urlInstancia = pathParts[1];



  return (
    <>
      <Paper elevation={0} sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
        marginTop: '20px',
        borderRadius: '8px',
        bgcolor: 'background.default',
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.05)'
      }}>
        <Box
          component="img"
          src={logoPng}
          onClick={()=>{navigate(`/${urlInstancia}`)}}
          sx={{
            width: 1,
            height: 'auto',
            cursor: 'pointer', // Esto cambia el cursor a un puntero cuando se pasa el mouse sobre la imagen
            '&:hover': {
              opacity: 0.9, // Opcional: Agregar un efecto de opacidad al pasar el mouse
            }
          }} 
        />
        <Typography variant="h7"  color="text.secondary">
          Aplicacion web para .NET
        </Typography>
      </Paper>
      <Paper elevation={0} sx={{ 
        padding: '20px', 
        marginTop: '20px', 
        borderRadius: '8px', 
        bgcolor: 'background.default', 
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.05)'
      }}>
        <Typography variant="h6" fontWeight="bold" >
          Últimas tendencias
        </Typography>
        <List sx={{ width: '100%' }}>
          {trends?.map((trend, index) => (
            <ListItem 
              key={trend.keyword} 
              button 
              onClick={() => {
                if (urlSearchbar !== "searchResults") {
                  navigate(`searchResults`, { state: trend.keyword })
                } else {
                  navigate(`/${urlInstancia}/searchResults`, { state: trend.keyword })
                }
              }}
              sx={{ 
                pl: 0,
                pr: 2,
                '&:hover': {
                  bgcolor: 'action.hover',
                },
                '&:not(:last-child)': {
                  borderBottom: '1.2px solid',
                  borderColor: 'divider',
                }
              }}
            >
              <ListItemText 
                primary={trend.keyword} 
                primaryTypographyProps={{ 
                  fontWeight: 'bold',
                  color: 'text.primary',
                  lineHeight: '0.8', 
                }} 
                secondary={`${trend.cantidad} posts`}
                secondaryTypographyProps={{
                  color: 'text.secondary'
                }}
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    </>
  );
}

export default LeftBar;