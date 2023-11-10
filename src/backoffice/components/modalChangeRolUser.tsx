import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button,  Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { useChangeRolUser } from '../hooks/useChangeRolUser';

const CambiarRolModal = ({ open, onClose, userId }) => {
  const [rol, setRol] = useState('Admin');
  const { handleChangeRolUser } = useChangeRolUser();

  const handleConfirm = () => {
    handleChangeRolUser(userId, rol);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Cambiar Rol</DialogTitle>
      <DialogContent>
        <FormControl fullWidth margin="normal">
          <InputLabel id="tipo-registro-label">Rol</InputLabel>
          <Select
            labelId="tipo-registro-label"
            id="tipo-registro"
            value={rol}
            label="Tipo de registro"
            onChange={(event) => setRol(event.target.value)}
          >
            <MenuItem value="Admin">Administrador</MenuItem>
            <MenuItem value="Mod">Moderador</MenuItem>
            <MenuItem value="User">Usuario</MenuItem>
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={handleConfirm}>Confirmar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CambiarRolModal;
