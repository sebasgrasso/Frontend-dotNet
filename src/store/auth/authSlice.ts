import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getToken } from "../../utils/localstorage";
import { TipoUsuario } from "../../interfaces/interfaces";

interface AuthSliceState {
  status?: "not-authenticated" | "checking" | "authenticated";
  rol?: TipoUsuario;
  username?: string | null | undefined;
  nickname: string | null | undefined;
  email: string | null | undefined;
  telefono: string | null | undefined;
  uid?: string | null | undefined;
  token?: string | null | undefined;
  errorMessage?: string | null | undefined;
  googleUser?: boolean | null | undefined;
}

const initialState = (): AuthSliceState => {
  const tokenInfo = getToken();

  const state: AuthSliceState = !tokenInfo
    ? {
        status: "not-authenticated",
        usuario: null,
        nombre: null,
        apellido: null,
        email: null,
        telefono: null,
        uid: null,
        token: null,
        errorMessage: null,
        rol: TipoUsuario.Invitado,
      }
    : {
        status: "authenticated",
        usuario: tokenInfo.usuario,
        nombre: tokenInfo.nombre,
        apellido: tokenInfo.apellido,
        email: tokenInfo.correo,
        telefono: tokenInfo.telefono,
        uid: tokenInfo.uid,
        token: tokenInfo.token,
        errorMessage: null,
        rol: tokenInfo.rol,
      };

  return state;
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, { payload }: PayloadAction<AuthSliceState>) => {
      state.status = "authenticated";
      state.rol=payload.rol;
      state.nombre = payload.nombre;
      state.apellido = payload.apellido;
      state.email = payload.email;
      state.rol = payload.rol;
      state.uid = payload.uid;
      state.usuario = payload.usuario;
      state.token = payload.token;
    },
    logout: (state, action) => {
      state.status = "not-authenticated";
      state.usuario = null;
      state.nombre = null;
      state.apellido = null;
      state.email = null;
      state.uid = null;
      state.token = null;
      state.rol = TipoUsuario.Invitado;
      state.errorMessage = action.payload.errorMessage;
    },
    checkingCredentials: (state) => {
      state.status = "checking";
    },
    addToken: (state, action) => {
      state.token = action.payload;
    },
  },
});

// Action creator are generated for each case reducer function
export const { login, logout, checkingCredentials, addToken } =
  authSlice.actions;
