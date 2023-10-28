import React from 'react';
import { Paper, Typography } from '@mui/material';
import useStyles from '../css/styles';
import { LoginPopup } from '../../auth/pages/loginPopup';
import { SignUpPopup } from '../../auth/pages/signupPopup';
import { useAppSelector } from '../../hooks/hooks';
import ProfileCard from '../../profile/profileCard';

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
      <ProfileCard username="pcristiani" imageUrl='https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' />
      }
      
    </Paper>
  );
}

export default RightBar;
