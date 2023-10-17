/* eslint-disable @typescript-eslint/no-unused-vars */
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getToken } from "../../utils/localstorage";

interface AuthSliceState {
    status?: "not-authenticated" | "checking" | "authenticated";
    token:string | null | undefined;
    id:string | null | undefined;
    username: string | null | undefined;
    email: string | null | undefined;
    name: string | null | undefined;
    birthdate: string | null | undefined; // Consider using a Date type instead
    picture: string | null | undefined;
    zoneinfo: string | null | undefined;
    locale: string | null | undefined;
    aud: string | null | undefined;
}

const initialState = (): AuthSliceState => {
  const tokenInfo = getToken();

  const state: AuthSliceState = !tokenInfo
    ? {
        status: "not-authenticated",
        token: null,
        id:null,
        username:null, 
        email:null,
        name: null,
        birthdate:null,
        picture: null,
        zoneinfo: null,
        locale:null,
        aud: null
      }
    : {
        status: "authenticated",
        token: tokenInfo.token,
        id:tokenInfo.sub,
        username:tokenInfo.username, 
        email:tokenInfo.email,
        name: tokenInfo.name,
        birthdate:tokenInfo.birthdate,
        picture: tokenInfo.picture,
        zoneinfo: tokenInfo.zoneinfo,
        locale:tokenInfo.locale,
        aud: tokenInfo.aud
      };

  return state;
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, { payload }: PayloadAction<AuthSliceState>) => {
      state.status= "authenticated"
      state.token= payload.token,
      state.id= payload.id,
      state.username= payload.username, 
      state.email= payload.email,
      state.name= payload.name,
      state.birthdate= payload.birthdate,
      state.picture= payload.picture,
      state.zoneinfo= payload.zoneinfo,
      state.locale= payload.locale,
      state.aud= payload.aud
    },
    logout: (state, action) => {
      state.status = "not-authenticated";
      state.token= null,
      state.id= null,
      state.username= null, 
      state.email= null,
      state.name= null,
      state.birthdate= null,
      state.picture= null,
      state.zoneinfo= null,
      state.locale= null,
      state.aud= null
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
