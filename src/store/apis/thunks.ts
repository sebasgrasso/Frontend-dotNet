import { AnyAction, ThunkAction } from "@reduxjs/toolkit";
import { checkingCredentials, login, logout, addToken } from "../auth/authSlice";
import { RootState } from "../store";
import { getToken, limpiarToken, setToken } from "../../utils/localstorage";

export const startEmailAndPasswordLogin = (
  token: string
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch) => {
    dispatch(checkingCredentials());
    setToken(token);
    const decoded = getToken();
    dispatch(
      login({
        token:decoded?.token,
        id:decoded?.sub,
        username:decoded?.username,
        email:decoded?.email,
        name:decoded?.name,
        birthdate:decoded?.birthdate,
        picture:decoded?.picture,
        zoneinfo:decoded?.zoneinfo,
        locale:decoded?.locale,
        aud:decoded?.aud,
      })
    );
  };
};

/*
export const startGoogleSignIn = (): ThunkAction<
  void,
  RootState,
  unknown,
  AnyAction
> => {
  return async (dispatch) => {
    dispatch(checkingCredentials()); // status === 'checking'

    const result = await signInWithGoogle();
    if (!result.ok) {
      dispatch(logout({ errorMessage: result.errorMessage }));
      return;
    }

    
   // FALTA SI NO ESTA EL USUARIO REGISTRADO CON GOOGLE EN EL BACKEND
  //  REGISTRARLO E INICIARLE SESION CON EL TOKEN RECIBIDO
  

    const nombreCompleto = result.displayName?.split(" ");
    const nombre = nombreCompleto ? nombreCompleto[0] : "";
    const apellido = nombreCompleto ? nombreCompleto[1] : "";

    dispatch(
      login({
        nombre,
        apellido,
        email: result.email,
        imageUrl: result.photoURL,
        uid: result.uid,
        token: null,
        googleUser: true,
        telefono: null,
        sucursal: -1,
        tipoUsuario: TipoUsuario.Comprador,
      })
    );
  };
};
*/


export const startLogout = (): ThunkAction<
  void,
  RootState,
  unknown,
  AnyAction
> => {
  return async (dispatch) => {
    //logoutWithGoogle();
    dispatch(logout({ errorMessage: null }));
    limpiarToken();

    /* si esta logueado con google llamar a firbease.auth.signout */
    /* llamar a logout y eliminar la info de localstorage */
  };
};

export const startAddToken = (
  token: string
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch) => {
    dispatch(addToken(token));
    setToken(token);
  };
};

