import { useAppDispatch } from "../../hooks/hooks";
import { useLoginMutation, useSignupMutation } from "../../store/apis/microbApis";
import { startEmailAndPasswordLogin, startGoogleSignIn, startLogout } from "../../store/apis/thunks";

export const useAuth = () => {
  const dispatch = useAppDispatch();

  const [
    startLogin,
    {
      isLoading: isAuthenticatingLogin,
      status: statusLogin,
      error: errorLogin,
      isError: isErrorLogin,
      isSuccess: isSuccessLogin,
      data: dataLogin,
    },
  ] = useLoginMutation();

  const [
    startRegistrarUsuario,
    {
      isLoading: isAuthenticatingRegistro,
      status: statusRegistro,
      error: errorSignup,
      isError: isErrorSignup,
      isSuccess: isSuccessSignup,
      data: dataSignup,
    },
  ] = useSignupMutation();

  const handleLogout = () => {
    dispatch(startLogout());
  };

  const handleLogin = async (username: string, password: string) => {
    startLogin({
      contrasenia: password,
      username: username,
    })
      .unwrap()
      .then((resp:any) => {
        setTimeout(() => {
          const token: string = resp;
          dispatch(startEmailAndPasswordLogin(token));
        }, 3000);
      })
      .catch((error:any) => {
        console.error(error);
      });
  };

  const handleGoogleLogin = async () => {
    dispatch(startGoogleSignIn());
  };

  const handleRegistrarUsuario = async (
    nombre: string,
    email: string,
    contrasenia: string,
    perfil:{
        nickname: string,
        fechaNac: Date,
        fotoUrl: string,
        bio: string,
        sitioWeb: string
    },
    username:string
  ) => {
    startRegistrarUsuario({
        nombre,
        email,
        contrasenia,
        perfil,
        username,
    })
      .unwrap()
      .then((resp:any) => {
        setTimeout(() => {
          const token: string = resp;
          dispatch(startEmailAndPasswordLogin(token));
        }, 3000);
      })
      .catch((error: any) => {
        console.error(error);
      });
  };
  return {
    handleRegistrarUsuario,
    handleLogin,
    handleLogout,
    handleGoogleLogin,
    isAuthenticatingLogin,
    statusLogin,
    isAuthenticatingRegistro,
    statusRegistro,
    isErrorLogin,
    errorLogin,
    isSuccessLogin,
    isErrorSignup,
    errorSignup,
    isSuccessSignup,
    dataLogin,
    dataSignup
  };
};
