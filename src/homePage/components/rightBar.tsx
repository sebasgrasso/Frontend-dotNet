import React from 'react';
import { Paper, Typography } from '@mui/material';
import useStyles from '../css/styles';
import { LoginPopup } from '../../auth/pages/loginPopup';
import { SignUpPopup } from '../../auth/pages/signupPopup';
import { useAppSelector } from '../../hooks/hooks';

const RightBar: React.FC = () => {
  const classes = useStyles();
  const { status } = useAppSelector((state) => state.auth);
  return (
    <Paper className={`${classes.rootDiff}`}>
      {status == 'not-authenticated' ? 
      <>
      <Typography fontSize={18}>¿No tienes una cuenta?</Typography>
      <Typography fontSize={14}>Regístrate ahora para obtener tu propia cronología personalizada.</Typography>
      <SignUpPopup/>
      <Typography fontSize={18}>¿Ya tienes una cuenta?</Typography>
      <LoginPopup/>
      </> : 
      null
      }
      
    </Paper>
  );
}

export default RightBar;
