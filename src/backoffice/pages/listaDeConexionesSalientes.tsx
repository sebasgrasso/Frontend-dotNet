import { Box, Grid, IconButton, Tooltip} from '@mui/material';
import {DataGrid,GridColDef,GridRenderCellParams,GridValueGetterParams,} from "@mui/x-data-grid"
import { useGetConexionesInstanciasQuery } from "../../store/apis/microbApis";
import { getInstanciaStorage } from '../../utils/localstorage';
import { useRequestConnection } from '../hooks/useRequestConnection';
import ClearIcon from '@mui/icons-material/Clear';

const columns: GridColDef[] = [
    {
        field: "id",
        headerName: "ID",
        width: 40,
    },
    {
        field: "instancia",
        headerName: "Instancia",
        width: 400,
        type: "string",
        valueGetter: (params: GridValueGetterParams) => {
            return `${params.row.instancia}`;
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
                <BotonCancelar  params={params} />
              </>
            );
        },
    }
];

export const ConexionesSalientesList = () => {
  const { data: conexiones } = useGetConexionesInstanciasQuery();
  const {alias} = getInstanciaStorage();

  const conexionesEntrantes = conexiones?.filter(conexion => {
    if (conexion.instanciaA.alias === alias) {
      return conexion.isAceptadaA; 
    } else if (conexion.instanciaB.alias === alias) {
      return conexion.isAceptadaB; 
    }
    return false; 
  }).map(conexion => {
    return {
      id: conexion.instanciaA.alias === alias ? conexion.instanciaB.id : conexion.instanciaA.id,
      instancia: conexion.instanciaA.alias === alias ? conexion.instanciaB.nombre : conexion.instanciaA.nombre,
    };
  });

  return (
    <Grid container spacing={2} className="animate__animated animate__fadeIn">
    <Grid item xs={12} lg={12}>
      <Box sx={{ height: '472px', width: '100%' }}>
        <DataGrid
          columns={columns}
          rows={conexionesEntrantes || []}
          autoPageSize
          getRowId={(row) => row.id}
        />
      </Box>
    </Grid>
  </Grid>
  );
};

const BotonCancelar = ({ params }: { params: GridRenderCellParams }) => {
  const {handleRequestConnection} = useRequestConnection();
  const handleCancelar = () => {
    handleRequestConnection(Number(params.id));
  }
  return (
        <Tooltip title="Cancelar conexion" placement="top" >
          <IconButton onClick={handleCancelar}>
            <ClearIcon />
          </IconButton>
        </Tooltip>
  )
}



