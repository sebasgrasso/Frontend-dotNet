import { Box, IconButton, Tooltip, Grid} from '@mui/material';
import {DataGrid,GridColDef,GridRenderCellParams,GridValueGetterParams,} from "@mui/x-data-grid"
import { useGetUsersPrivacityQuery } from "../../store/apis/microbApis";
import LockOpenIcon from '@mui/icons-material/LockOpen';

const columns: GridColDef[] = [
    {
        field: "username",
        headerName: "Username",
        width: 200,
        type: "string",
        valueGetter: (params: GridValueGetterParams) => {
            return `${params.row.usuarioPrivado.username}`;
        },
    },
    {
        field: "bloqueados",
        headerName: "Desbloquear",
        width: 200,
        headerAlign : "center",
        align : "center",
        renderCell: (params: GridRenderCellParams) => {
            return (
              <>
                <BotonDesbloquear params={params}/>
              </>
            );
        },
    },
];

export const MisBloqueadosList = () => {
  const { data: bloqueados } = useGetUsersPrivacityQuery();
  const bloqueadosFiltrados = bloqueados ? bloqueados.filter(usuario => usuario.isBloqueado) : [];
  return (
    <Grid container spacing={2} className="animate__animated animate__fadeIn">
    <Grid item xs={12} lg={12}>
      <Box sx={{ height: '30vh', width: '100%' }}>
        <DataGrid
            columns={columns}
            rows={bloqueadosFiltrados || []}
            initialState={{
              pagination: { paginationModel: { pageSize: 3 } },
            }}
            getRowId={(row) => row.usuarioPrivado.id}
        />
      </Box>
    </Grid>
  </Grid>
  );
};

const BotonDesbloquear = ({ params }: { params: GridRenderCellParams }) => {
  return (
        <Tooltip title="Desbloquear" placement="top" >
          <IconButton>
            <LockOpenIcon />
          </IconButton>
        </Tooltip>
  )
}

