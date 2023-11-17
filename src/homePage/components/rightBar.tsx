import { Paper, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { LoginPopup } from '../../auth/pages/loginPopup';
import { SignUpPopup } from '../../auth/pages/signupPopup';
import { useAppSelector } from '../../hooks/hooks';
import ProfileCard from '../../profile/components/profileCard';
import { useNavigate } from 'react-router-dom';
import { SearchBar } from './searchbar';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';

const RightBar = () => {
  const { status, username, picture, name, role } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const { alias } = useAppSelector((state) => state.instance);
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
                sx={{
                  marginTop: 2,
                  backgroundColor: "#1565c0", 
                  color: "white",
                  width: '100%',
                  fontWeight: 'medium', 
                  letterSpacing: 1.2, 
                  fontSize: '0.875rem', 
                  textTransform: 'none', 
                  borderRadius: '4px', 
                  padding: '8px 24px', 
                  boxShadow: '0 3px 5px 2px rgba(21, 101, 192, .3)',
                  transition: 'background-color .3s, color .3s, box-shadow .3s',
                  ":hover": {
                    backgroundColor: "white", 
                    color: "#1565c0",
                    borderColor: "#1565c0",
                    boxShadow: '0 4px 6px 3px rgba(21, 101, 192, .2)', 
                  }
                }}
                startIcon={<ArrowCircleRightIcon />} 
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
