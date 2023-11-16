import { Alert, Box, Button, Dialog, DialogContent, Grid, IconButton, LinearProgress, TextField, Typography } from "@mui/material";
import { SyntheticEvent, useState } from "react";
import { useForm } from "../../hooks/useForm";
import { useAuth } from "../hooks/useAuth";
import PersonIcon from '@mui/icons-material/Person'; // Icono de usuario
import LockIcon from '@mui/icons-material/Lock'; // Icono de cerradura para contraseña
import GoogleIcon from '@mui/icons-material/Google'; // Icono de Google
import { getInstanciaStorage } from "../../utils/localstorage";
import LoginIcon from '@mui/icons-material/Login'; // Importa el icono de inicio de sesión


const initialStateForm = {
  username: "",
  password: "",
};

export const LoginPopup = () => {
  const [open, setOpen] = useState(false);
  const { id } = getInstanciaStorage();

  const { username, password, handleInputChange, reset } =
    useForm(initialStateForm);

  const {
    handleLogin,
    isAuthenticatingLogin,
    isErrorLogin,
    isSuccessLogin,
  } = useAuth();

  const handleFormSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    if (!username || !password) return;
    handleLogin(username, password);
    reset();
  };

  const handleGoogleLogin = async () => {
    const idBase64 = btoa(id);
    const url = "http://localhost:5245/auth/login-google?cacheid=" + idBase64;
    window.location.href = url;
  };

  return (
    <>
      <Button
          onClick={() => setOpen(true)}
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
          startIcon={<LoginIcon />} 
        >
          Inicia Sesión
        </Button>
      <Dialog onClose={() => setOpen(false)} open={open} PaperProps={{ sx: { backgroundColor: "#f7f7f7", width: '25%', margin: 'auto', borderRadius: '16px' } }}>
        <DialogContent sx={{ padding: (theme) => theme.spacing(4) }}>
          <form onSubmit={handleFormSubmit}>
            <Grid container spacing={2} alignItems="center" justifyContent="center">
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom component="div" sx={{ textAlign: "center" }}>
                  Acceso a tu cuenta
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  size="small"
                  variant="outlined"
                  fullWidth
                  label="Usuario"
                  type="text"
                  InputProps={{
                    startAdornment: (
                      <PersonIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
                    ),
                  }}
                  name="username"
                  value={username}
                  onChange={handleInputChange}
                  disabled={isAuthenticatingLogin}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  size="small"
                  variant="outlined"
                  fullWidth
                  label="Contraseña"
                  type="password"
                  InputProps={{
                    startAdornment: (
                      <LockIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
                    ),
                  }}
                  name="password"
                  value={password}
                  onChange={handleInputChange}
                  disabled={isAuthenticatingLogin}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  sx={{ mt: 2, mb: 2, backgroundColor: "#1565c0" }}
                  disabled={isAuthenticatingLogin}
                  startIcon={<LockIcon />} 
                >
                  INICIAR SESIÓN
                </Button>
                <Typography variant="body2" sx={{ textAlign: "center" }}>
                  ¿Olvidaste tu contraseña? <Button color="secondary">RECUPERAR CONTRASEÑA</Button>
                </Typography>
              </Grid>
              <Grid item xs={12} sx={{ textAlign: "center" }}>
                <Typography variant="body2" sx={{ mb: 2 }}>
                  O inicia sesión con:
                </Typography>
                <IconButton onClick={handleGoogleLogin} sx={{ color: "primary.main" }}>
                  <GoogleIcon />
                </IconButton>
              </Grid>
            </Grid>
            {isErrorLogin && (
              <Alert
                variant="filled"
                severity="error"
                sx={{ mt: 2 }}
              >
                Usuario o Contraseña inválidos
              </Alert>
            )}
            {isSuccessLogin && (
              <Alert
                variant="filled"
                severity="success"
                sx={{ mt: 2 }}
              >
                Usuario logueado correctamente!
              </Alert>
            )}
            {isAuthenticatingLogin && (
              <LinearProgress sx={{ mt: 2 }} />
            )}
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};
  
  interface LoginButtonProps {
    titulo: string;
    handleOnClick?: () => void;
    type?: "submit" | "button" | "reset";
    disabled: boolean;
  }

const LoginButton = ({
  titulo,
  handleOnClick,
  type,
  disabled,
}: LoginButtonProps) => (
  <Button
    size="small"
    fullWidth
    variant="contained"
    startIcon={<KeyIcon />} // Puedes cambiar KeyIcon por el icono que prefieras
    sx={{
      mb: 1,
      backgroundColor: "primary.main",
      color: "white",
      ":hover": {
        backgroundColor: "primary.dark",
        color: "primary.contrastText",
      },
    }}
    onClick={handleOnClick}
    type={type}
    disabled={disabled}
  >
    {titulo}
  </Button>
);
  
  const SocialMediaLoginLabel = () => (
    <Box
      sx={{
        position: "relative",
        "&::after": {
          content: '""',
          display: "block",
          width: "100%",
          position: "absolute",
          top: "50%",
          borderBottom: "2px solid #fff",
          zIndex: 0,
        },
        mb: 2,
      }}
    >
      <Typography
        variant="subtitle2"
        component="span"
        color="#fff"
        bgcolor="#333"
        textAlign="center"
        sx={{
          position: "relative",
          display: "inline-block",
          zIndex: 1,
          top: 0,
          left: "50%",
          transform: "translateX(-50%);",
          px: 2,
        }}
      >
        O inicia sesion con
      </Typography>
    </Box>
  );