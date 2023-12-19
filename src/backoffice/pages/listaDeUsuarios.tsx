import { Box, IconButton, Tooltip, Card, CardContent, TextField, Button, Grid, Typography} from '@mui/material';
import {DataGrid,GridColDef,GridRenderCellParams,GridValueGetterParams,} from "@mui/x-data-grid"
import { useGetUsuariosQuery } from "../../store/apis/microbApis";
import { IconThumbUpFilled } from '@tabler/icons-react';
import { IconBan } from '@tabler/icons-react';
import { IconArrowsExchange } from '@tabler/icons-react';
import { IconThumbDownFilled } from '@tabler/icons-react';
import { useState, useRef   } from 'react';
import { useInviteUser} from '../hooks/useInviteUser';
import { useAproveUser } from '../hooks/useAproveUser';
import { useBanUser } from '../hooks/useBanUser';
import SuspenderUsuarioModal from '../components/modalSuspendUser';
import CambiarRolModal from '../components/modalChangeRolUser';


const columns: GridColDef[] = [
    {
        field: "id",
        headerName: "ID",
        width: 20,
    },
    {
        field: "username",
        headerName: "Username",
        width: 120,
        type: "string",
        valueGetter: (params: GridValueGetterParams) => {
            return `${params.row.username}`;
        },
    },
    {
        field: "nickname",
        headerName: "Nickname",
        width: 200,
        type: "string",
        valueGetter: (params: GridValueGetterParams) => {
            return `${params.row.perfil.nickname}`;
        },
    },
    {
        field: "fechaNac",
        headerName: "Fecha de Nacimiento",
        width: 150,
        type: "string",
        valueGetter: (params: GridValueGetterParams) => {
            return `${params.row.perfil.fechaNac}`;
        },
    },
    {
        field: "rol",
        headerName: "Rol",
        width: 120,
        type: "string",
        valueGetter: (params: GridValueGetterParams) => {
            return `${params.row.rol.descripcion}`;
        },
    },
    {
        field: "estado",
        headerName: "Estado",
        width: 120,
        type: "string",
        valueGetter: (params: GridValueGetterParams) => {
            if (params.row.isBanned) {
              return 'Baneado';
            }
            if (params.row.isSuspendido) {
              return 'Suspendido';
            }
            if (params.row.isAprobado) {
              return 'Aprobado';
            }
            return 'Desconocido';
        },
    },
    {
        field: "acciones",
        headerName: "Acciones",
        width: 250,
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
          sx={{ margin: '8px', color:"white"}}
        >
          Invitar
        </Button>
      </Card>
    </Grid>
  </Grid>
  );
};

const BotonAprobar = ({ params }: { params: GridRenderCellParams }) => {
  const { handleAproveUser } = useAproveUser();
  const handleAprobar = () => {
    handleAproveUser(params.id);
  }
  return (
        <Tooltip title="Aprobar" placement="top" >
          <IconButton onClick={handleAprobar}>
            <IconThumbUpFilled />
          </IconButton>
        </Tooltip>
  )
}

const BotonSuspender = ({ params }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  return (
    <>
      <Tooltip title="Suspender" placement="top">
        <IconButton onClick={toggleModal}>
          <IconThumbDownFilled />
        </IconButton>
      </Tooltip>
      <SuspenderUsuarioModal
        open={modalOpen}
        onClose={toggleModal}
        userId={params.id}
      />
    </>
  );
};

const BotonBanear = ({ params }: { params: GridRenderCellParams }) => {
  const { handleBanUser } = useBanUser();
  const handleBanear = () => {
    handleBanUser(params.id);
  }
  return (
        <Tooltip title="Banear" placement="top" >
          <IconButton onClick={handleBanear}>
            <IconBan />
          </IconButton>
        </Tooltip>
  )
}

const BotonCambiarRol = ({ params }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  return (
    <>
      <Tooltip title="Cambiar rol" placement="top">
        <IconButton onClick={toggleModal}>
          <IconArrowsExchange />
        </IconButton>
      </Tooltip>
      <CambiarRolModal
        open={modalOpen}
        onClose={toggleModal}
        userId={params.id}
      />
    </>
  );
};

