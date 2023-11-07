import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from '@mui/material';
import { useNewTrend } from '../hooks/useNewTrend';

const NuevoTrendModal = ({ open, onClose }) => {
  const [desdeCuando, setTrend] = useState('');
  const { handleNewTrend } = useNewTrend();

  const handleConfirm = () => {
    const desdeCuandoNumber = parseInt(desdeCuando);
    handleNewTrend(desdeCuandoNumber);
    onClose(); 
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Nuevo Trend</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="desdeCuando"
          label="Desde cuando (min)"
          type="number"
          fullWidth
          value={desdeCuando}
          onChange={(e) => setTrend(e.target.value)}
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

export default NuevoTrendModal;
