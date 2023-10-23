import { Box, Button, Dialog, Grid, IconButton, TextField, Typography } from "@mui/material";
import { SyntheticEvent, useState } from "react";
import { useForm } from "../../hooks/useForm";
import { useAuth } from "../hooks/useAuth";
import { FormLayout } from "../layout/formLayout";
import { FcGoogle } from "react-icons/fc";

const initialStateForm = {
  username: "",
  password: "",
};


export const LoginPopup = () => {
  const [open, setOpen] = useState(false);

  const { username, password, handleInputChange, reset } =
  useForm(initialStateForm);

  const {
      //handleGoogleLogin,
      handleLogin,
      isAuthenticatingLogin,
      //isErrorLogin,
     // isSuccessLogin,
    } = useAuth();

  
  const handleFormSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    if (!username || !password) return;
    handleLogin(username, password);
    reset();
  };


    return (
      <>
        <Button onClick={() => setOpen(true)} 
          sx={{
            backgroundColor:"blue",
            color:"white", 
            ":hover":{backgroundColor:"white", color:"blue",borderColor:"blue",border:"1px solid"}}
          
          
        }>
          Iniciar Sesión
        </Button>
        <Dialog onClose={() => setOpen(false)} open={open}>
        <FormLayout>
          <form onSubmit={handleFormSubmit}>
            <Grid container alignItems="center">
            <Grid container justifyContent="center">
              <img
                src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkplfjklL3n3QVZdOZZR-D-CFvdumk8GrY-w&usqp=CAU"}
                alt="brand logo"
                style={{ height: 100, width: 300, objectFit: "cover" }}
              />
            </Grid>
            <Grid item xs={12} mb={2}>
              <Typography variant="subtitle2" mb={1} color="primary">
                Acceso
              </Typography>
              <TextField
                size="small"
                variant="filled"
                fullWidth
                label="Email/Usuario"
                type="text"
                sx={{ backgroundColor: "#fff", borderRadius: 2 }}
                name="username"
                value={username}
                onChange={handleInputChange}
                disabled={isAuthenticatingLogin}
              />
            </Grid>
            <Grid item xs={12} mb={3}>
              <TextField
                size="small"
                variant="filled"
                fullWidth
                label="Contraseña"
                type="password"
                sx={{ backgroundColor: "#fff", borderRadius: 2 }}
                name="password"
                value={password}
                onChange={handleInputChange}
                disabled={isAuthenticatingLogin}
              />
            </Grid>
            <Grid container mb={1} justifyContent="space-between">
              <Grid item xs={12}>
                <LoginButton
                  titulo="Iniciar sesion"
                  type="submit"
                  disabled={isAuthenticatingLogin}
                />
              </Grid>

              <Grid container justifyContent="center" alignItems="center">
                <Typography color="#fff" sx={{ fontSize: 12 }}>
                  ¿Olvidaste tu contraseña?
                </Typography>
                <Button
                  size="small"
                  variant="text"
                  sx={{
                    textTransform: "capitalize",
                    fontSize: 12,
                    textDecoration: "underline",
                    color: "#fff",
                  }}
                  disabled={isAuthenticatingLogin}
                  
                >
                  Recuperar contraseña
                </Button>
              </Grid>
            </Grid>
            <Grid item xs={12} mb={1} sx={{ position: "relative" }}>
              <SocialMediaLoginLabel />
              <Grid container justifyContent="center">
                <IconButton
                  onClick={() => {
                    //handleGoogleLogin();
                  }}
                  sx={{
                    backgroundColor: "#fff",
                    color: "rgb(0,130,255)",
                    "&:hover": { backgroundColor: "#ddd" },
                  }}
                >
                  <FcGoogle />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
            </form>
          </FormLayout>
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
      sx={{ mb: 1 }}
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