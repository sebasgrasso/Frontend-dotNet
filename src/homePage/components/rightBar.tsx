import React from 'react';
import { Paper, Typography } from '@mui/material';
import useStyles from '../css/styles';
import { LoginPopup } from '../../auth/pages/loginPopup';
import { SignUpPopup } from '../../auth/pages/signupPopup';

const RightBar: React.FC = () => {
  const classes = useStyles();
 
  return (
    <Paper className={`${classes.rootDiff}`}>
      <Typography variant="h6">Cuenta</Typography>
      <LoginPopup/>
      <SignUpPopup/>
    </Paper>
  );
}

export default RightBar;
