import { Paper, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { LoginPopup } from '../../auth/pages/loginPopup';
import { SignUpPopup } from '../../auth/pages/signupPopup';
import { useAppSelector } from '../../hooks/hooks';
import ProfileCard from '../../profile/components/profileCard';
import { useNavigate } from 'react-router-dom';
import { SearchBar } from './searchbar';

const RightBar = () => {
  const { status, username, picture, name, role } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const theme = useTheme();

  const handleDashboardRedirect = () => {
    navigate('administracion');
  };

  
  const pathParts = location.pathname.split('/');
  // Assuming 'instance1' is at the second segment of the URL ('/')
  const urlSearchbar = pathParts[2]; // This gets 'instance1' from the URL

  return (
    <>
      <Paper sx={{
        padding: theme.spacing(3),
        marginTop: theme.spacing(3),
        boxShadow: theme.shadows[5],
        borderRadius: theme.shape.borderRadius,

      }}>
        {status === 'not-authenticated' ? (
          <>
            <SignUpPopup />
            <LoginPopup />
          </>
        ) : (
          <>
            <ProfileCard
              username={username || ""}
              nickname={name || ""}
              imageUrl={picture || ""}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            />
            {(role === 'Admin' || role === 'Mod') && (
              <Button
                variant="contained"
                color="primary"
                onClick={handleDashboardRedirect}
                sx={{ marginTop: theme.spacing(2) }}
              >
                Ir al Dashboard
              </Button>
            )}
          </>
        )}
      </Paper>
      {(status == 'authenticated' && urlSearchbar!='searchResults' ) ? <SearchBar/> : null }
    </>
    
  );
}

export default RightBar;
