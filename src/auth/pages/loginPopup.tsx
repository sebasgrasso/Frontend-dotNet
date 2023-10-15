import { Box, Button, Dialog, Grid, IconButton, TextField, Typography } from "@mui/material";
import { SyntheticEvent, useState } from "react";
import { useForm } from "../../hooks/useForm";
import { useAuth } from "../hooks/useAuth";
import { FormLayout } from "../layout/formLayout";

const initialStateForm = {
  username: "",
  password: "",
};


export const LoginPopup = () => {
  const [open, setOpen] = useState(false);

  const { username, password, handleInputChange, reset } =
  useForm(initialStateForm);

  const {
      handleGoogleLogin,
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


    return (
      <>
        <Button onClick={() => setOpen(true)} sx={{backgroundColor:"blue",color:"white", ":hover":{backgroundColor:"white", color:"blue"}}}>
          LOGIN
        </Button>
        <Dialog onClose={() => setOpen(false)} open={open}>
        <FormLayout>
          <form>
            <Grid container alignItems="center">
            <Grid container justifyContent="center">
              <img
                src={"data:image/jpeg;base64,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"}
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
                  ¿No tienes una cuenta?
                </Typography>
                <Button
                  variant="text"
                  color="primary"
                  sx={{ textTransform: "capitalize", fontSize: 12 }}
                  disabled={isAuthenticatingLogin}
                
                >
                  Regístrate.
                </Button>
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
                  recuperar contraseña
                </Button>
              </Grid>
            </Grid>
            <Grid item xs={12} mb={1} sx={{ position: "relative" }}>
              <SocialMediaLoginLabel />
              <Grid container justifyContent="center">
                <IconButton
                  onClick={() => {
                    handleGoogleLogin();
                  }}
                  sx={{
                    backgroundColor: "#fff",
                    color: "rgb(0,130,255)",
                    "&:hover": { backgroundColor: "#ddd" },
                  }}
                >
                  
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