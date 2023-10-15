import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

interface LoginProps {
  contrasenia: string;
  username: string;
}

interface SignupProps {
  nombre: string;
  email: string;
  contrasenia: string;
  perfil:{
    nickname: string,
    fechaNac: Date,
    fotoUrl: string,
    bio: string,
    sitioWeb: string
  }
  username:string;
}

type AuthResponse = {
  token: string;
};

interface LoginGoogleProps {
  correo: string;
  nombre: string;
  googleId: string;
}

export const microbApis = createApi({
  reducerPath: "microbApis",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:8080/api/",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: [
  ],
  endpoints: (builder) => ({
    login: builder.mutation<string, LoginProps>({
      query: (body) => ({
        url: "auth/login",
        method: "POST",
        body,
      }),
      invalidatesTags: [
      ],
      transformResponse: (response: AuthResponse, meta, arg) => {
        return response.token;
      },
    }),
    loginGoogle: builder.mutation<string, LoginGoogleProps>({
      query: (body) => ({
        url: "auth/google",
        method: "POST",
        body,
      }),
      invalidatesTags: [
      ],
      transformResponse: (response: AuthResponse, meta, arg) => {
        return response.token;
      },
    }),
    signup: builder.mutation<string, SignupProps>({
      query: (body) => ({
        url: "cliente/crear",
        method: "POST",
        body,
      }),
      transformResponse: (resp: AuthResponse, meta) => resp.token,
      invalidatesTags: [
      ],
    }),
  }),
});

export const {
  useLoginMutation,
  useSignupMutation,
  useLoginGoogleMutation,
} = microbApis;
