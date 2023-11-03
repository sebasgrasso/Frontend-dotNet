import React from 'react';
import { Paper, Typography } from '@mui/material';

const LeftBar: React.FC = () => {
  
  return (
    <Paper sx={{padding: '20px',marginTop: '20px'}}>
      <Typography variant="h6">Microb.uy</Typography>
      <Typography variant="body2">Esto esta en desarrollo para .NET</Typography>
    </Paper>
  );
}

export default LeftBar;