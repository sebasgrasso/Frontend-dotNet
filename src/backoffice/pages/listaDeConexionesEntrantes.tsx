import { Box, Grid, IconButton, Tooltip} from '@mui/material';
import {DataGrid,GridColDef,GridRenderCellParams,GridValueGetterParams,} from "@mui/x-data-grid"
import { useGetConexionesInstanciasQuery } from "../../store/apis/microbApis";
import { getInstanciaStorage } from '../../utils/localstorage';
import { useRequestConnection } from '../hooks/useRequestConnection';
import CheckIcon from '@mui/icons-material/Check';

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
              <BotonAceptar  params={params} />
            </>
          );
      },
  }
];

export const ConexionesEntrantesList = () => {
  const { data: conexiones } = useGetConexionesInstanciasQuery();
  const {alias} = getInstanciaStorage();

  const conexionesEntrantes = conexiones?.filter(conexion => {
    if (conexion.instanciaA.alias === alias) {
      return !conexion.isAceptadaA; 
    } else if (conexion.instanciaB.alias === alias) {
      return !conexion.isAceptadaB; 
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
      <Box sx={{ height: '600px', width: '100%' }}>
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

const BotonAceptar = ({ params }: { params: GridRenderCellParams }) => {
  const {handleRequestConnection} = useRequestConnection();
  const handleAprobar = () => {
    handleRequestConnection(Number(params.id));
  }
  return (
        <Tooltip title="Aprobar conexion" placement="top" >
          <IconButton onClick={handleAprobar}>
            <CheckIcon />
          </IconButton>
        </Tooltip>
  )
}



