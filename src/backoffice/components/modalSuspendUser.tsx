import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from '@mui/material';
import { useSuspendUser } from '../hooks/useSuspendUser';

const SuspenderUsuarioModal = ({ open, onClose, userId }) => {
  const [fecha, setFecha] = useState('');
  const { handleSuspendUser } = useSuspendUser();

  const handleConfirm = () => {
    // Aquí debes convertir la fecha a un objeto Date si aún no lo es
    const fechaSuspension = new Date(fecha);
    handleSuspendUser(userId, fechaSuspension);
    onClose(); // Cerrar el modal después de confirmar
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Suspender Usuario</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="datetime-local"
          label="Fecha de Suspensión"
          type="datetime-local"
          fullWidth
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={handleConfirm}>Confirmar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default SuspenderUsuarioModal;
