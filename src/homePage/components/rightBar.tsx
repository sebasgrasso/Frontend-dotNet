import React from 'react';
import { Paper, Typography } from '@mui/material';
import { LoginPopup } from '../../auth/pages/loginPopup';
import { SignUpPopup } from '../../auth/pages/signupPopup';
import { useAppSelector } from '../../hooks/hooks';
import ProfileCard from '../../profile/components/profileCard';

const RightBar: React.FC = () => {
  const { status,username,picture,name } = useAppSelector((state) => state.auth);
  

  return (
    <Paper sx={{ padding: '20px',marginTop: '20px',}}>
      {status == 'not-authenticated' ? 
      <>
      <Typography fontSize={18}>¿No tienes una cuenta?</Typography>
      <Typography fontSize={14}>Regístrate ahora para obtener tu propia cronología personalizada.</Typography>
        <SignUpPopup/>
      <Typography fontSize={18}>¿Ya tienes una cuenta?</Typography>
        <LoginPopup/>
      </> :
      <>
        <ProfileCard username={username || ""} nickname={name || ""} imageUrl={picture || ""} />
        
      </>
      
      }
      
    </Paper>
  );
}

export default RightBar;
