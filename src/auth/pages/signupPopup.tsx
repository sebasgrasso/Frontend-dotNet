import { Alert, Button, Dialog, Grid, TextField, Typography } from "@mui/material";
import { FormLayout } from "../layout/formLayout";
import { useForm } from "../../hooks/useForm";
import { SyntheticEvent, useState } from "react";
import { useAuth } from "../hooks/useAuth";

const initialStateForm = {
  username: "",
  email: "",
  contrasenia: "",
  nickname:""
};

export const SignUpPopup = () => {
    const [open, setOpen] = useState(false);  
  const [isFirstStep, setIsFirstStep] = useState<boolean>(true);
  //const navigate = useNavigate();
  const {
    handleRegistrarUsuario,
    errorSignup,
    isErrorSignup,
    isSuccessSignup
  } = useAuth();

  const {
    username,
    email,
    contrasenia,
    nickname,
    reset,
    handleInputChange
  } = useForm(initialStateForm);

  const handleFormSubmit = (event: SyntheticEvent): void => {
    event.preventDefault();
    //checkear que datos son obligatorios
    if (!username || !email || !contrasenia || !nickname ) return;
    handleRegistrarUsuario(username,email,contrasenia,nickname);
    reset();
  };

  return (
    <>
        <Button onClick={() => setOpen(true)} 
        sx={{backgroundColor:"blue",
            color:"white", 
            ":hover":{backgroundColor:"white", color:"blue",borderColor:"blue",border:"1px solid"}}}>
            Signup
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

            <Grid item xs={12} mb={1}>
                <Typography variant="subtitle2" color="primary" mb={1}>
                Crea tu cuenta
                </Typography>
            </Grid>
            {isFirstStep ? (
                <>
                <Grid item xs={12} mb={1}>
                    <TextField
                    size="small"
                    variant="filled"
                    fullWidth
                    label="Usuario"
                    type="text"
                    sx={{ backgroundColor: "#fff", borderRadius: 2 }}
                    name="username"
                    value={username}
                    onChange={handleInputChange}
                    />
                </Grid>
                <Grid item xs={12} mb={1}>
                    <TextField
                    size="small"
                    variant="filled"
                    fullWidth
                    label="Email"
                    type="email"
                    sx={{ backgroundColor: "#fff", borderRadius: 2 }}
                    name="email"
                    value={email}
                    onChange={handleInputChange}
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
                    name="contrasenia"
                    value={contrasenia}
                    onChange={handleInputChange}
                    />
                </Grid>
                </>
            ) : (
                <>
                <Grid item xs={12} mb={1}>
                    <TextField
                    size="small"
                    variant="filled"
                    fullWidth
                    label="Nickname"
                    type="text"
                    sx={{ backgroundColor: "#fff", borderRadius: 2 }}
                    name="nickname"
                    value={nickname}
                    onChange={handleInputChange}
                    />
                </Grid>
                {/*<Grid item xs={12} mb={1}>
                    <TextField
                    size="small"
                    variant="filled"
                    fullWidth
                    label="Apellido"
                    type="text"
                    sx={{ backgroundColor: "#fff", borderRadius: 2 }}
                    name="surname"
                    value={surname}
                    onChange={handleInputChange}
                    />
                </Grid>

                <Grid item xs={12} mb={1}>
                    <TextField
                    size="small"
                    variant="filled"
                    fullWidth
                    label="Telefono"
                    type="text"
                    sx={{ backgroundColor: "#fff", borderRadius: 2 }}
                    name="phone"
                    value={phone}
                    onChange={handleInputChange}
                    />
                </Grid>
                <Grid item xs={12} mb={3} >
                    <TextField
                    size="small"
                    variant="filled"
                    fullWidth
                    label="Fecha de Nacimiento"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    type="date"
                    sx={{ backgroundColor: "#fff", borderRadius: 2 }}
                    name="fechaNac"
                    value={fechaNac}
                    onChange={handleInputChange}
                    />
                </Grid> */}
                
                </>
            )}

            <Grid container justifyContent="center">
                <Grid container justifyContent="space-between">
                <Grid item xs={12} sm={5}>
                    {!isFirstStep && (
                    <Button
                        variant="contained"
                        size="small"
                        fullWidth
                        onClick={() => {
                        setIsFirstStep(true);
                        }}
                    >
                        Atras
                    </Button>
                    )}
                </Grid>
                <Grid item xs={12} sm={5}>
                    {isFirstStep ? (
                    <Button
                        variant="contained"
                        size="small"
                        fullWidth
                        onClick={() => {
                        setIsFirstStep(false);
                        }}
                    >
                        Siguiente
                    </Button>
                    ) : (
                    <SignupButton titulo="Registrar" type="submit" />
                    )}
                </Grid>
                </Grid>
                <Grid container justifyContent="center" alignItems="center" mt={2}>
                <Typography color="#fff" sx={{ fontSize: 12 }}>
                    ¿Tienes una cuenta?
                </Typography>
                <Button
                    size="small"
                    variant="text"
                    color="primary"
                    sx={{ textTransform: "capitalize", fontSize: 12 }}
                    onClick={() => {
                    //navigate("/auth/login");
                    }}
                >
                    Inicia sesión.
                </Button>
                </Grid>
            </Grid>
            </Grid>
        </form>
        {isErrorSignup && (
            <Alert variant="filled" severity="error">
            {errorSignup
                ? "data" in errorSignup
                ? `${errorSignup.data}`
                : ""
                : "Algo salio mal"}
            </Alert>
        )}
        {isSuccessSignup && (
            <Alert variant="filled" severity="success">
            Usuario registrado Correctamente!.
            </Alert>
        )}
        </FormLayout>
    </Dialog>
    </>
  );
};

interface SignupButtonProps {
  titulo: string;
  handleOnClick?: () => void;
  type?: "submit" | "button" | "reset";
}
const SignupButton = ({ titulo, handleOnClick, type }: SignupButtonProps) => (
  <Button
    fullWidth
    size="small"
    variant="contained"
    onClick={handleOnClick}
    type={type}
  >
    {titulo}
  </Button>
);
