import { Box, IconButton, Tooltip, Card, CardContent, TextField, Button, Grid, Typography} from '@mui/material';
import {DataGrid,GridColDef,GridRenderCellParams,GridValueGetterParams,} from "@mui/x-data-grid"
import { useGetUsuariosQuery } from "../../store/apis/microbApis";
import { IconThumbUpFilled } from '@tabler/icons-react';
import { IconBan } from '@tabler/icons-react';
import { IconArrowsExchange } from '@tabler/icons-react';
import { IconThumbDownFilled } from '@tabler/icons-react';
import { useState, useRef   } from 'react';
import { useInviteUser} from '../hooks/useInviteUser';

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
        width: 180,
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
                <BotonSuspender  params={params} />
                <BotonBanear params={params} />
                <BotonCambiarRol params={params} />
              </>
            );
        },
    },
];

export const MisUsuariosList = () => {
  const {handleInviteUser} = useInviteUser();
  const { data: usuarios } = useGetUsuariosQuery();
  const [email, setEmail] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const emailInputRef = useRef(null);



  const handleInvite = () => {
    if (email.trim() === '') {
      if (emailInputRef.current) {
        emailInputRef.current.focus();
      }
      return;
    } else {
      handleInviteUser(email, 1);
      setEmail('');
    }
  };

  return (
    <Grid container spacing={2} className="animate__animated animate__fadeIn">
    <Grid item xs={12} lg={9}>
      <Box sx={{ height: '60vh', width: '100%' }}>
        <DataGrid
          columns={columns}
          rows={usuarios || []}
          autoPageSize
        />
      </Box>
    </Grid>
    <Grid item xs={12} lg={3}>
      <Card>
        <CardContent>
        <Typography variant="h6">Invitar usuarios</Typography>
          <TextField
            label="Email para invitar"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={handleEmailChange}
            inputRef={emailInputRef} 
          />
        </CardContent>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleInvite}
          sx={{ margin: '8px' }}
        >
          Invitar
        </Button>
      </Card>
    </Grid>
  </Grid>
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

const BotonSuspender = ({ params }: { params: GridRenderCellParams }) => {
  const handleSuspender = () => {
    alert(params.id);
  }
  return (
        <Tooltip title="Suspender" placement="top" >
          <IconButton onClick={handleSuspender}>
            <IconThumbDownFilled />
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

