import { Box, Grid, IconButton, Tooltip} from '@mui/material';
import {DataGrid,GridColDef,GridRenderCellParams,GridValueGetterParams,} from "@mui/x-data-grid"
import { useGetReportsQuery } from "../../store/apis/microbApis";

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
            </>
          );
      },
  }
];

export const DenunciasList = () => {
  const { data: denuncias } = useGetReportsQuery();

  return (
    <Grid container spacing={2} className="animate__animated animate__fadeIn">
    <Grid item xs={12} lg={12}>
      <Box sx={{ height: '472px', width: '100%' }}>
        <DataGrid
          columns={columns}
          rows={denuncias || []}
          autoPageSize
          getRowId={(row) => row.id}
        />
      </Box>
    </Grid>
  </Grid>
  );
};



