import { Alert, Button, Dialog, DialogContent, Grid, InputAdornment, TextField, Typography, LinearProgress  } from "@mui/material";
import { SyntheticEvent, useState } from "react";
import { useForm } from "../../hooks/useForm";
import { useAuth } from "../hooks/useAuth";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import CheckCircleIcon from '@mui/icons-material/CheckCircle'; 
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import PersonIcon from '@mui/icons-material/Person';
import PasswordIcon from '@mui/icons-material/Password';
import EmailIcon from '@mui/icons-material/Email';
import BadgeIcon from '@mui/icons-material/Badge';


const initialStateForm = {
    username: "",
    email: "",
    contrasenia: "",
    nickname: "",
    fechaNac: "",
    biografia: "",
    ocupacion: "",
    sitioWeb: "",
    fotoUrl: ""
};

export const SignUpPopup = () => {
  const [open, setOpen] = useState(false);  
  const [isFirstStep, setIsFirstStep] = useState(true);
  const [loading, setLoading] = useState(false);
  const {
    handleRegistrarUsuario,
    isErrorSignup,
    isSuccessSignup,
    errorSignup
  } = useAuth();

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
    reset,
    handleInputChange
  } = useForm(initialStateForm);

  const handleFormSubmit = (event: SyntheticEvent): void => {
    event.preventDefault();
    setLoading(true);
    if (isFirstStep) {
      setIsFirstStep(false);
      setLoading(false);
    } else {
    if (!username || !email || !contrasenia || !nickname ) return;
      handleRegistrarUsuario(username, email, contrasenia, nickname, fechaNac, biografia, ocupacion, sitioWeb, fotoUrl);
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        sx={{
          backgroundColor: "#1565c0", 
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
          ":hover": {
            backgroundColor: "white", 
            color: "#1565c0",
            borderColor: "#1565c0",
            boxShadow: '0 4px 6px 3px rgba(21, 101, 192, .2)', 
          }
        }}
        startIcon={<PersonAddAltIcon />}
      >
        Registrate
      </Button>
      <Dialog onClose={() => setOpen(false)} open={open} PaperProps={{ sx: { backgroundColor: "#f7f7f7", borderRadius: '16px' } }}>
        <DialogContent sx={{ padding: 4 }}>
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
                      sx={{
                        backgroundColor: "#1565c0", 
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
                        ":hover": {
                          backgroundColor: "white", 
                          color: "#1565c0",
                          borderColor: "#1565c0",
                          boxShadow: '0 4px 6px 3px rgba(21, 101, 192, .2)', 
                        }
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
                        variant="outlined"
                        fullWidth
                        onClick={() => setIsFirstStep(true)}
                        sx={{
                            backgroundColor: "#1565c0", 
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
                            ":hover": {
                              backgroundColor: "white", 
                              color: "#1565c0",
                              borderColor: "#1565c0",
                              boxShadow: '0 4px 6px 3px rgba(21, 101, 192, .2)', 
                            }
                          }}
                        startIcon={<ChevronLeftIcon />}
                        >
                        Atrás
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button
                        variant="outlined"
                        fullWidth
                        type="submit"
                        sx={{
                            backgroundColor: "#1565c0", 
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
                            ":hover": {
                              backgroundColor: "white", 
                              color: "#1565c0",
                              borderColor: "#1565c0",
                              boxShadow: '0 4px 6px 3px rgba(21, 101, 192, .2)', 
                            }
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
                {errorSignup ? "data" in errorSignup ? `${errorSignup.data}` : "" : "Algo salió mal"}
                </Alert>
            )}
            {isSuccessSignup && (
                <Alert variant="filled" severity="success" sx={{ mt: 2 }}>
                Usuario registrado correctamente!
                </Alert>
            )}
          </form>
          {loading && <LinearProgress/>}
        </DialogContent>
      </Dialog>
    </>
  );
};

