import React, { useState } from 'react';
import { Box, Grid, IconButton, Tooltip, Paper, Typography, Modal, FormControl, Select, MenuItem, InputLabel, Dialog, DialogTitle, DialogContent, DialogActions, Button} from '@mui/material';
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useGetReportsQuery, useGetDetailsReportQuery } from "../../store/apis/microbApis";
import VisibilityIcon from '@mui/icons-material/Visibility';
import AnnouncementIcon from '@mui/icons-material/Announcement';
import { useChangeStatusReport } from '../hooks/useChangeStatusReport';

const BotonVer = ({ onOpenDetail }) => (
    <Tooltip title="Ver detalle" placement="top">
        <IconButton onClick={onOpenDetail}>
            <VisibilityIcon />
        </IconButton>
    </Tooltip>
);

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

export const DenunciasList = () => {
    const { data: denuncias } = useGetReportsQuery();
    const [selectedPostId, setSelectedPostId] = useState(null);
    
    const { data: detalleDenuncia, isLoading: isDetalleLoading } = useGetDetailsReportQuery(selectedPostId);

    const handleOpenDetail = (post) => {
        setSelectedPostId(post); 
    };

    const columns: GridColDef[] = [
        {
            field: "usuario",
            headerName: "Usuario involucrado",
            width: 250,
            renderCell: (params) => `${params.row.username || ''}`,
        },
        {
            field: "cantidadDenuncias",
            headerName: "Cantidad de denuncias",
            width: 180,
            headerAlign: "center",
            align: "center",
            renderCell: (params) => `${params.row.countPost || ''}`,
        },
        {
            field: "estado",
            headerName: "Estado",
            width: 180,
            headerAlign: "center",
            align: "center",
            renderCell: (params) => `${params.row.estado || ''}`,
        },
        {
            field: "acciones",
            headerName: "Acciones",
            sortable: false,
            width: 80,
            headerAlign: "center",
            align: "center",
            renderCell: (params) => (
                <>
                    <BotonVer onOpenDetail={() => handleOpenDetail(params.row.post)} />
                    <BotonAccion postId={params.row.post} />
                </>
            ),
        },
    ];

    const detalleColumns: GridColDef[] = [
        {
            field: "usuarioReporta",
            headerName: "Usuario que reporta",
            width: 250,
            renderCell: (params) => `${params.row.reporta.username || ''}`,
        },
        {
            field: "texto",
            headerName: "Texto",
            width: 250,
            renderCell: (params) => `${params.row.texto || ''}`,
        },
        {
            field: "denunciaRazon",
            headerName: "Razon de la denuncia",
            width: 180,
            headerAlign: "center",
            align: "center",
            renderCell: (params) => `${params.row.denunciaRazon.nombre || ''}`,
        },
    ];

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Paper sx={{ height: 400, width: '100%' }}>
                        <DataGrid
                            columns={columns}
                            rows={denuncias || []}
                            getRowId={(row) => row.post}
                        />
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper sx={{ height: 400, overflow: 'auto' }}>
                        <Box p={2}>
                            {selectedPostId && isDetalleLoading && (
                                <Typography>Cargando detalles...</Typography>
                            )}
                            {selectedPostId && detalleDenuncia && (
                                <Box sx={{ height: 340, width: '100%' }}>
                                    <Typography variant="h6">Denuncias relacionadas</Typography>
                                    <DataGrid
                                        columns={detalleColumns}
                                        rows={detalleDenuncia || []}
                                        getRowId={(row) => row.texto}
                                    />
                                </Box>
                            )}
                            {!selectedPostId && (
                                <Typography>Seleccione un reporte para ver los detalles.</Typography>
                            )}
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

const BotonAccion = ({ postId }) => {
    const [open, setOpen] = useState(false);
    const [status, setStatus] = useState("Espera");

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const { handleChangeStatusReport } = useChangeStatusReport();
    const handleChange = (event) => {
        setStatus(event.target.value);
    };

    const handleChangeStatusDenuncia = () => {
        handleChangeStatusReport(postId, status);
    };

    return (
        <>
            <Tooltip title="Resolver" placement="top">
                <IconButton onClick={handleOpen}>
                    <AnnouncementIcon />
                </IconButton>
            </Tooltip>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Cambiar estado a la denuncia</DialogTitle>
                <DialogContent>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Estado</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={status}
                            label="Estado"
                            onChange={handleChange}
                        >
                            <MenuItem value="Rechazado">Rechazado</MenuItem>
                            <MenuItem value="Aceptado">Aceptado</MenuItem>
                            <MenuItem value="Espera">En Espera</MenuItem>
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleChangeStatusDenuncia}>Aceptar</Button>
                    <Button onClick={handleClose}>Cancelar</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};


export default DenunciasList;
