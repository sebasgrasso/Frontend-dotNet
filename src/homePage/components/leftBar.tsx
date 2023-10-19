import React from 'react';
import { Paper, Typography } from '@mui/material';
import useStyles from '../css/styles';

const LeftBar: React.FC = () => {
  const classes = useStyles();
  
  return (
    <Paper className={`${classes.rootDiff}`}>
      <Typography variant="h6">Microb.uy</Typography>
      <Typography variant="body2">Esto esta en desarrollo para .NET</Typography>
    </Paper>
  );
}

export default LeftBar;