import React from 'react';
import { Paper, Typography, Button  } from '@mui/material';
import { LoginPopup } from '../../auth/pages/loginPopup';
import { SignUpPopup } from '../../auth/pages/signupPopup';
import { useAppSelector } from '../../hooks/hooks';
import ProfileCard from '../../profile/components/profileCard';
import { useNavigate } from 'react-router-dom';

const RightBar: React.FC = () => {
  const { status,username,picture,name, role } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const {alias} = useAppSelector((state)=>state.instance) 
  
  const handleDashboardRedirect = () => {
    console.log(alias);
    
    navigate(`administracion`);
  };

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
        { (role === 'Admin' || role === 'Mod') && 
        <Button
            variant="contained"
            color="primary"
            onClick={handleDashboardRedirect}
            sx={{ marginTop: '20px' }} 
          >
            Ir al Dashboard
          </Button>
        }  
      </>
      }
    </Paper>
  );
}

export default RightBar;
