import { Card, CardContent, Grid, Typography, IconButton, Box } from '@mui/material';
import { IconPlus } from '@tabler/icons-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, LineChart, Line, AreaChart, Area, CartesianGrid, ResponsiveContainer } from 'recharts';
import NuevoTrendModal from '../components/modalNewTrend';
import React, { useState, useCallback } from 'react';


// Datos de ejemplo
const dataUsuarios = [
  { tipo: 'Administrador', cantidad: 44 },
  { tipo: 'Moderador', cantidad: 34 },
  { tipo: 'Usuario', cantidad: 70 },
];

const dataPosts = [
  { fecha: '2023-01-01', cantidad: 20 },
  { fecha: '2023-02-01', cantidad: 25 },
  { fecha: '2023-03-01', cantidad: 18 },
  { fecha: '2023-04-01', cantidad: 44 },
  { fecha: '2023-05-01', cantidad: 66 },
  { fecha: '2023-06-01', cantidad: 56 },
  { fecha: '2023-07-01', cantidad: 87 },
];

const dataTrends = [
  { trend: '.NET', cant: 2243 },
  { trend: 'tecnologo', cant: 1453 },
  { trend: 'microbuy', cant: 3565 },
  { trend: 'developer', cant: 1124 },
  { trend: 'x', cant: 7765 },
];

export const EstadisticasInstancia = () => {
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = useCallback(() => {
    setOpenModal(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setOpenModal(false);
  }, []);


  return (
    <Grid container spacing={2} className="animate__animated animate__fadeIn" marginTop={4}>
      <Grid item xs={12} lg={6}>
        <Card>
          <CardContent>
            <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom="15px">
              <Typography variant="h6">Usuarios por Tipo</Typography>
            </Box>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dataUsuarios}>
                <XAxis dataKey="tipo" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="cantidad" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} lg={6}>
        <Card>
          <CardContent>
            <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom="15px">
              <Typography variant="h6">Cantidad de Posts</Typography>
            </Box>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={dataPosts}>
                <XAxis dataKey="fecha" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="cantidad" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} lg={12}>
        <Card>
          <CardContent>
            <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom="15px">
              <Typography variant="h6">Trends</Typography>
              <IconButton
                onClick={handleOpenModal}
                sx={{
                  color: 'white', 
                  backgroundColor: 'blue', 
                  '&:hover': {
                    backgroundColor: 'darkblue', 
                  },
                }}
                >
                <IconPlus />
              </IconButton>
            </Box>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={dataTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="trend" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="cant" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </Grid>
      <NuevoTrendModal open={openModal} onClose={handleCloseModal} />
    </Grid>
  );
};
