import React from 'react';
import { Paper, Typography } from '@mui/material';
import useStyles from '../css/styles';
import { LoginPopup } from '../../auth/pages/loginPopup';

const RightBar: React.FC = () => {
  const classes = useStyles();
  
  return (
    <Paper className={`${classes.rootDiff}`}>
      <Typography variant="h6">Cuenta</Typography>
      <LoginPopup/>
    </Paper>
  );
}

export default RightBar;
