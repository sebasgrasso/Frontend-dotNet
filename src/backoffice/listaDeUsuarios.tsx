import React, { useState } from 'react';
import { Box, Typography, LinearProgress, Button, List, ListItem, ListItemText, Card, Avatar, CardContent} from '@mui/material';
import {DataGrid,GridColDef,GridRenderCellParams,GridValueGetterParams,} from "@mui/x-data-grid"
import { useGetUsuariosQuery } from "../store/apis/microbApis";

const columns: GridColDef[] = [
    {
        field: "id",
        headerName: "ID",
        width: 70,
    },
    {
        field: "direccion",
        headerName: "Username",
        width: 200,
        type: "string",
        valueGetter: (params: GridValueGetterParams) => {
            return `${params.row.direccion}`;
        },
    },
    {
        field: "ciudad",
        headerName: "Nickname",
        width: 120,
        type: "string",
        valueGetter: (params: GridValueGetterParams) => {
            return `${params.row.ciudad}`;
        },
    },
    {
        field: "departamento",
        headerName: "Fecha de Nacimiento",
        width: 222,
        type: "string",
        valueGetter: (params: GridValueGetterParams) => {
            return `${params.row.departamento}`;
        },
    },
    {
        field: "aclaracion",
        headerName: "Ocupacion",
        width: 200,
        type: "string",
        valueGetter: (params: GridValueGetterParams) => {
            return `${params.row.aclaracion}`;
        },
    },
    /*
    {
        field: "modificar",
        headerName: "Modificar",
        width: 80,
        renderCell: (params: GridRenderCellParams) => {
            //return <ReclamoButton params={params} />;
        },
    },
    */
];

export const MisUsuariosList = () => {
  const { data: usuarios } = useGetUsuariosQuery();

  return (
      <>
          <Box
              sx={{ height: "78vh", width: "980px" }}
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

