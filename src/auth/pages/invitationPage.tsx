import { SyntheticEvent, useState } from "react";
import {
  Alert,
  Button,
  Grid,
  InputAdornment,
  TextField,
  Typography,
  Paper,
  LinearProgress,
  Box
} from "@mui/material";
import { useForm } from "../../hooks/useForm";
import { useAuth } from "../hooks/useAuth";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import PersonIcon from '@mui/icons-material/Person';
import PasswordIcon from '@mui/icons-material/Password';
import EmailIcon from '@mui/icons-material/Email';
import BadgeIcon from '@mui/icons-material/Badge';
import logoAzul from '../../homePage/img/logoAzul.png';
import logoRojo from '../../homePage/img/logoRojo.png';
import logoVerde from '../../homePage/img/logoVerde.png';
import { useAppSelector } from '../../hooks/hooks';
import { useLocation, useNavigate } from "react-router-dom";


const initialStateForm = {
  username: "",
  email: "",
  contrasenia: "",
  nickname: "",
  fechaNac: null,
  biografia: "",
  ocupacion: "",
  sitioWeb: "",
  fotoUrl: ""
};

type MyCustomErrorType = {
  data: {
    message: string;
  };
};

export const InvitationPage = () => {
  
  const tema = useAppSelector(state => state.instance.tema);
  let logoPng = logoAzul;
  if (tema === 'rojo') {
    logoPng = logoRojo;
  } else if (tema === 'verde') {
    logoPng = logoVerde;
  }
  const [isFirstStep, setIsFirstStep] = useState(true);
  const [loading, setLoading] = useState(false);
  const { handleRegistrarUsuario, isErrorSignup, isSuccessSignup, errorSignup } = useAuth();
  const location = useLocation();
  const pathParts = location.pathname.split('/');
  const instancia = pathParts[1]; 
  const navigate = useNavigate();

  const {
    username,
    email,
    contrasenia,
    nickname,
    fechaNac,
    biografia,
    ocupacion,
    sitioWeb,
    fotoUrl,
    handleInputChange
  } = useForm(initialStateForm);

  const handleFormSubmit = (event: SyntheticEvent): void => {
    event.preventDefault();
    setLoading(true);
    if (isFirstStep) {
      setIsFirstStep(false);
      setLoading(false);
    } else {
      if (!username || !email || !contrasenia || !nickname) return;
      handleRegistrarUsuario(username, email, contrasenia, nickname, fechaNac, biografia, ocupacion, sitioWeb, fotoUrl, null);
      setTimeout(() => {
        navigate(`/${instancia}`);
      }, 2000);
      setLoading(false);
    }
  };

  const isFormValid = () => {
    return username && email && contrasenia.length >=8 && nickname;
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: '#191b22', 
      }}
    >
      <Box
          component="img"
          src={logoPng}
          sx={{
            width: '400px',
            height: 'auto',
          }} 
        />
      <Paper
        elevation={4}
        sx={{
          p: 4,
          minWidth: 300,
          maxWidth: 500,
          borderRadius: '20px',
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.05)',
          mb: 25 ,
        }}
      >
      <form onSubmit={handleFormSubmit}>
        <Grid container spacing={2} direction="column" alignItems="center">
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom component="div" sx={{ textAlign: "center" }}>
              {isFirstStep ? "Crea tu cuenta" : "Casi terminamos"}
            </Typography>
          </Grid>
          {isFirstStep ? (
            <>
              <Grid item xs={12} mb={2}>
                <TextField
                  size="small"
                  variant="outlined"
                  fullWidth
                  label="Usuario"
                  type="text"
                  name="username"
                  value={username}
                  onChange={handleInputChange}
                  InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <PersonIcon />
                        </InputAdornment>
                    ),
                }}
                />
                <TextField
                  size="small"
                  variant="outlined"
                  fullWidth
                  label="Email"
                  type="email"
                  name="email"
                  value={email}
                  onChange={handleInputChange}
                  sx={{ mt: 1 }}
                  InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <EmailIcon />
                        </InputAdornment>
                    ),
                }}
                />
                <TextField
                  size="small"
                  variant="outlined"
                  fullWidth
                  label="Contraseña"
                  type="password"
                  name="contrasenia"
                  value={contrasenia}
                  onChange={handleInputChange}
                  sx={{ mt: 1 }}
                  helperText={contrasenia && contrasenia.length < 8 ? "La contraseña debe tener al menos 8 caracteres" : ""}
                  InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <PasswordIcon />
                        </InputAdornment>
                    ),
                }}
                /> 
                <TextField
                  size="small"
                  variant="outlined"
                  fullWidth
                  label="Nickname"
                  type="text"
                  name="nickname"
                  value={nickname}
                  onChange={handleInputChange}
                  sx={{ mt: 1 }}
                  InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <BadgeIcon />
                        </InputAdornment>
                    ),
                }}
                />                   
              </Grid>
              <Grid item xs={12} mb={2}>
                <Button
                  variant="contained"
                  size="small"
                  fullWidth
                  type="submit"
                  disabled={!isFormValid()}
                  sx={{
                    color: "white",
                    fontWeight: 'medium', 
                    letterSpacing: 1.2, 
                    width: '100%',
                    fontSize: '0.875rem', 
                    textTransform: 'none', 
                    borderRadius: '4px', 
                    padding: '8px 24px', 
                    boxShadow: '0 3px 5px 2px rgba(21, 101, 192, .3)',
                    transition: 'background-color .3s, color .3s, box-shadow .3s',
                    
                  }}
                  startIcon={<NavigateNextIcon />}
                >
                  Siguiente
                </Button>
              </Grid>
            </>
          ) : (
            <>
              <Grid item xs={12} mb={2}>
                <TextField
                  size="small"
                  variant="outlined"
                  fullWidth
                  type="date"
                  name="fechaNac"
                  value={fechaNac}
                  onChange={handleInputChange}
                  sx={{ mt: 1 }}
                  InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <ArrowRightIcon />
                        </InputAdornment>
                    ),
                }}
                />
                <TextField
                  size="small"
                  variant="outlined"
                  fullWidth
                  label="Biografia"
                  type="text"
                  name="biografia"
                  value={biografia}
                  onChange={handleInputChange}
                  sx={{ mt: 1 }}
                  InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <ArrowRightIcon />
                        </InputAdornment>
                    ),
                }}
                />
                <TextField
                  size="small"
                  variant="outlined"
                  fullWidth
                  label="Ocupacion"
                  type="text"
                  name="ocupacion"
                  value={ocupacion}
                  onChange={handleInputChange}
                  sx={{ mt: 1 }}
                  InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <ArrowRightIcon />
                        </InputAdornment>
                    ),
                }}
                />
                <TextField
                  size="small"
                  variant="outlined"
                  fullWidth
                  label="Sitio Web"
                  type="text"
                  name="sitioWeb"
                  value={sitioWeb}
                  onChange={handleInputChange}
                  sx={{ mt: 1 }}
                  InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <ArrowRightIcon />
                        </InputAdornment>
                    ),
                }}
                />
                <TextField
                  size="small"
                  variant="outlined"
                  fullWidth
                  label="Foto URL"
                  type="text"
                  name="fotoUrl"
                  value={fotoUrl}
                  onChange={handleInputChange}
                  sx={{ mt: 1 }}
                  InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <ArrowRightIcon />
                        </InputAdornment>
                    ),
                }}
                />
              </Grid>
              <Grid item container xs={12} justifyContent="space-between" spacing={2}>
                <Grid item xs={6}>
                    <Button
                    variant="contained"
                    fullWidth
                    onClick={() => setIsFirstStep(true)}
                    sx={{
                        color: "white",
                        fontWeight: 'medium', 
                        letterSpacing: 1.2, 
                        width: '100%',
                        fontSize: '0.875rem', 
                        textTransform: 'none', 
                        borderRadius: '4px', 
                        padding: '8px 24px', 
                        boxShadow: '0 3px 5px 2px rgba(21, 101, 192, .3)',
                        transition: 'background-color .3s, color .3s, box-shadow .3s',
                        
                      }}
                    startIcon={<ChevronLeftIcon />}
                    >
                    Atrás
                    </Button>
                </Grid>
                <Grid item xs={6}>
                    <Button
                    variant="contained"
                    fullWidth
                    type="submit"
                    sx={{
                        color: "white",
                        fontWeight: 'medium', 
                        letterSpacing: 1.2, 
                        width: '100%',
                        fontSize: '0.875rem', 
                        textTransform: 'none', 
                        borderRadius: '4px', 
                        padding: '8px 24px', 
                        boxShadow: '0 3px 5px 2px rgba(21, 101, 192, .3)',
                        transition: 'background-color .3s, color .3s, box-shadow .3s',
                      }}
                    startIcon={<CheckCircleIcon />} 
                    >
                    Registrarme
                    </Button>
                </Grid>
              </Grid>
            </>
          )}
        </Grid>
        {isErrorSignup && (
            <Alert variant="filled" severity="error" sx={{ mt: 2 }}>
              {(errorSignup as MyCustomErrorType).data.message + '!'}
            </Alert>
        )}
        {isSuccessSignup && (
            <Alert variant="filled" severity="success" sx={{ mt: 2 }}>
            Usuario registrado correctamente!
            </Alert>
        )}
      </form>
      {loading && <LinearProgress sx={{mt: 3}}/>}
      </Paper>
    </Box>
  );
};
