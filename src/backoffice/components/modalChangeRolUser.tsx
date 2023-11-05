import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from '@mui/material';
import { useChangeRolUser } from '../hooks/useChangeRolUser';

const CambiarRolModal = ({ open, onClose, userId }) => {
  const [rol, setRol] = useState('');
  const { handleChangeRolUser } = useChangeRolUser();

  const handleConfirm = () => {
    handleChangeRolUser(userId, rol);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Cambiar Rol</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="rol-local"
          label="Rol"
          type="text"
          fullWidth
          value={rol}
          onChange={(e) => setRol(e.target.value)}
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

export default CambiarRolModal;
