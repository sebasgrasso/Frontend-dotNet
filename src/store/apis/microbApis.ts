/* eslint-disable @typescript-eslint/no-unused-vars */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { AprobarUsuarioDTO, AuthLoginDTO, AuthLoginResponseDTO, BanearUsuarioDTO, CambiarRolUsuarioDTO, GetInstanciaProps, InstanciaConectadaDTO, InstanciaDTO, InvitacionDTO, PostCreateDTO, PostDTO, SuspenderUsuarioDTO, UsuarioCreateDTO, UsuarioDTO, UsuarioPerfilUpdateDTO, getPostsProps} from "../../interfaces/interfaces";

//http://backend.servehttp.com/



export const microbApis = createApi({
  reducerPath: "microbApis",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5245",
    //agregar al header X-InstanciaId con el valor de la instancia
    prepareHeaders: (headers, { getState }) => {
      const instanciaID = (getState() as RootState).instance.id.toString();
      headers.set("X-InstanciaId", instanciaID);
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["listaPosts","obtenerPerfil"],
  endpoints: (builder) => ({
    login: builder.mutation<string, AuthLoginDTO>({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body,
      }),
      invalidatesTags: [],
      transformResponse: (response: AuthLoginResponseDTO, meta, arg) => {
        return response.accessToken;
      },
    }),
    /*loginGoogle: builder.mutation<string, LoginGoogleProps>({
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
    }),*/
    signup: builder.mutation<string, UsuarioCreateDTO>({
      query: (body) => ({
        url: "/auth/register",
        method: "POST",
        body,
      }),
      transformResponse: (resp: AuthLoginResponseDTO, meta) => resp.accessToken,
      invalidatesTags: [],
    }),
    createPost: builder.mutation<PostDTO, PostCreateDTO>({
      query: (body) => ({
        url: "/posts",
        method: "POST",
        body,
      }),
      transformResponse: (resp: PostDTO, meta) => resp,
      invalidatesTags: ["listaPosts"],
    }),

    inviteUser: builder.mutation<void, InvitacionDTO>({
      query: (body) => ({
        url: "/private/usuarios/invitacion",
        method: "POST",
        body,
      }),
    }),

    aproveUser: builder.mutation<void, AprobarUsuarioDTO>({
      query: ({ id }) => ({
        url: `/private/usuarios/${id}/aprobar`, 
        method: "PUT"
      }),
    }),

    banUser: builder.mutation<void, BanearUsuarioDTO>({
      query: ({ id }) => ({
        url: `/private/usuarios/${id}/banear`, 
        method: "PUT"
      }),
    }),

    suspendUser: builder.mutation<void, SuspenderUsuarioDTO>({
      query: ({ id, fecha }) => {
        const fechaUTC = fecha.toISOString();
        const encodedFechaUTC = encodeURIComponent(fechaUTC);
        return {
          url: `/private/usuarios/${id}/suspender`,
          method: "PUT",
          params: { fecha: fechaUTC }
        };
      },
    }),

    changeRol: builder.mutation<void, CambiarRolUsuarioDTO>({
      query: ({ id, rol }) => ({
        url: `/private/usuarios/${id}/rol`, 
        method: "PUT",
        params: {
          rol,
        },
      }),
    }),

    getPosts: builder.query<PostDTO[], getPostsProps>({
      query: ({ skip, limit }) => (`/posts?skip=${skip}&limit=${limit}`),
      providesTags: ["listaPosts"],
    }),
    getInstancia: builder.query<InstanciaDTO,GetInstanciaProps>({
      query: ({alias}) => (`/instancias/alias/${alias}`),
      providesTags: [],
    }),
    getProfile: builder.query<UsuarioDTO,void>({
      query: (body) => ("/usuarios/me"),
      providesTags: ["obtenerPerfil"],
    }),
    getUsuarios: builder.query<UsuarioDTO[],void>({
      query: (body) => ("/private/usuarios"),
      providesTags: [],
    }),
    editProfile: builder.mutation<UsuarioDTO, UsuarioPerfilUpdateDTO>({
      query: (body) => ({
        url: "/usuarios/me/perfil",
        method: "PUT",
        body,
      }),
      transformResponse: (resp: UsuarioDTO, meta) => resp,
      invalidatesTags: ["obtenerPerfil"],
    }),
  }),
});

export const {
  useLoginMutation,
  useSignupMutation,
  useCreatePostMutation,
  useLazyGetPostsQuery,
  useGetProfileQuery,
  useEditProfileMutation,
  useGetUsuariosQuery,
  useInviteUserMutation,
  useAproveUserMutation,
  useBanUserMutation,
  useSuspendUserMutation,
  useChangeRolMutation,
  useGetInstanciaQuery
  //useLoginGoogleMutation,
} = microbApis;
