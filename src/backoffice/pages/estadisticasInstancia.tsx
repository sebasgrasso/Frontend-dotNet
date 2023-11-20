import { Card, CardContent, Grid, Typography, IconButton, Box } from '@mui/material';
import { IconPlus } from '@tabler/icons-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, LineChart, Line, AreaChart, Area, CartesianGrid, ResponsiveContainer } from 'recharts';
import NuevoTrendModal from '../components/modalNewTrend';
import React, { useState, useCallback } from 'react';
import { useGetEstadisticasPostsQuery, useGetEstadisticasTrendsQuery, useGetEstadisticasUsersQuery } from '../../store/apis/microbApis';

export const EstadisticasInstancia = () => {
  const {data: usuarios} = useGetEstadisticasUsersQuery();
  const {data: trends} = useGetEstadisticasTrendsQuery();
  const {data: posts} = useGetEstadisticasPostsQuery();

  const dataUsuarios = usuarios ? [
    { tipo: 'Administrador', cantidad: usuarios.cantidades.adminCount },
    { tipo: 'Moderador', cantidad: usuarios.cantidades.modCount },
    { tipo: 'Usuario', cantidad: usuarios.cantidades.userCount },
  ] : [];
  const dataTrends = trends || [];

  const calculateStartDate = (intervalo) => {
    const today = new Date();
    const endDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 30);
    return new Date(endDate.getTime() + (intervalo - 1) * 7 * 24 * 60 * 60 * 1000);
  };
  const formatDate = (date) => {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  };

  const dataPosts = posts ? posts.map(post => ({
    fecha: formatDate(calculateStartDate(post.intervalo)),
    cantidades: post.cantidades
  })) : [];

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
                <XAxis dataKey='tipo' />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="cantidad" fill="#ff6723" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} lg={6}>
        <Card>
          <CardContent>
            <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom="15px">
              <Typography variant="h6">Trends</Typography>
              <IconButton
                onClick={handleOpenModal}
                sx={{
                  color: 'white', 
                  backgroundColor: 'primary.main', 
                  '&:hover': {
                    backgroundColor: 'primary.main', 
                  },
                }}
                >
                <IconPlus />
              </IconButton>
            </Box>
            <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dataTrends}>
                <XAxis dataKey='keyword' />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="cantidad" fill="#ff6723" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} lg={12}>
        <Card>
          <CardContent>
            <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom="15px">
              <Typography variant="h6">Cantidad de Posts (ultimos 30 dias)</Typography>
            </Box>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={dataPosts}>
                <XAxis dataKey="fecha" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="cantidades" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </Grid>
      <NuevoTrendModal open={openModal} onClose={handleCloseModal} />
    </Grid>
  );
};
