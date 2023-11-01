import React, { useState } from 'react';
import { Box, Typography, LinearProgress, Button, List, ListItem, ListItemText, Card, Avatar, CardContent, IconButton, Tooltip} from '@mui/material';
import {DataGrid,GridColDef,GridRenderCellParams,GridValueGetterParams,} from "@mui/x-data-grid"
import { useGetUsuariosQuery } from "../store/apis/microbApis";
import { IconThumbUpFilled } from '@tabler/icons-react';
import { IconBan } from '@tabler/icons-react';
import { IconArrowsExchange } from '@tabler/icons-react';

const columns: GridColDef[] = [
    {
        field: "id",
        headerName: "ID",
        width: 20,
    },
    {
        field: "username",
        headerName: "Username",
        width: 200,
        type: "string",
        valueGetter: (params: GridValueGetterParams) => {
            return `${params.row.username}`;
        },
    },
    {
        field: "nickname",
        headerName: "Nickname",
        width: 120,
        type: "string",
        valueGetter: (params: GridValueGetterParams) => {
            return `${params.row.perfil.nickname}`;
        },
    },
    {
        field: "fechaNac",
        headerName: "Fecha de Nacimiento",
        width: 222,
        type: "string",
        valueGetter: (params: GridValueGetterParams) => {
            return `${params.row.perfil.fechaNac}`;
        },
    },
    {
        field: "ocupacion",
        headerName: "Ocupacion",
        width: 200,
        type: "string",
        valueGetter: (params: GridValueGetterParams) => {
            return `${params.row.perfil.ocupacion}`;
        },
    },
    {
        field: "acciones",
        headerName: "Acciones",
        width: 400,
        headerAlign : "center",
        align : "center",
        renderCell: (params: GridRenderCellParams) => {
            return (
              <>
                <BotonAprobar  params={params} />
                <BotonBanear params={params} />
                <BotonCambiarRol params={params} />
              </>
            );
        },
    },
];

export const MisUsuariosList = () => {
  const { data: usuarios } = useGetUsuariosQuery();
  return (
      <>
          <Box
              sx={{ height: "60vh", width: "80%" }}
              className="animate__animated animate__fadeIn"
          >
              <DataGrid
                  columns={columns}
                  rows={usuarios || []}
                  autoPageSize
              />
          </Box>
      </>
  );
};

const BotonAprobar = ({ params }: { params: GridRenderCellParams }) => {
  const handleAprobar = () => {
    alert(params.id);
  }
  return (
        <Tooltip title="Aprobar" placement="top" >
          <IconButton onClick={handleAprobar}>
            <IconThumbUpFilled />
          </IconButton>
        </Tooltip>
  )
}

const BotonBanear = ({ params }: { params: GridRenderCellParams }) => {
  const handleBanear = () => {
    alert(params.id);
  }
  return (
        <Tooltip title="Banear" placement="top" >
          <IconButton onClick={handleBanear}>
            <IconBan />
          </IconButton>
        </Tooltip>
  )
}

const BotonCambiarRol = ({ params }: { params: GridRenderCellParams }) => {
  const handleCambiarRol = () => {
    alert(params.id);
  }
  return (
        <Tooltip title="Cambiar rol" placement="top" >
          <IconButton onClick={handleCambiarRol}>
            <IconArrowsExchange  />
          </IconButton>
        </Tooltip>
  )
}

