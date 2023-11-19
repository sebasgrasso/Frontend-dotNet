/* eslint-disable @typescript-eslint/no-unused-vars */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { AprobarUsuarioDTO, AuthLoginDTO, AuthLoginResponseDTO, BanearUsuarioDTO, CambiarContraseniaDTO, CambiarDataInstanciaDTO, CambiarRolUsuarioDTO, ChangeStatusReport, DenunciaCreateDTO, DenunciaDTO, DenunciaRazonDTO, DenunciaSalidaDTO, DtEstadisticaPost, DtEstadisticaUsuario, GenericDTO, GetInstanciaProps, InstanciaConectadaDTO, InstanciaDTO, InvitacionDTO, NewTrendDTO, NotificacionDTO, PostCreateDTO, PostDTO, PrivacidadWriteUnicoDTO, SeguirUsuarioDTO, SuspenderUsuarioDTO, TrendDTO, UsuarioCreateDTO, UsuarioDTO, UsuarioNotificacionesDTO, UsuarioPerfilUpdateDTO, getPostsBusquedaProps, getPostsFavoritosProps, getPostsProps, getReportsDetailsProps} from "../../interfaces/interfaces";
import { getInstanciaStorage } from "../../utils/localstorage";

//http://backend.servehttp.com/



export const microbApis = createApi({
  reducerPath: "microbApis",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5245",
    //agregar al header X-InstanciaId con el valor de la instancia
    prepareHeaders: (headers, { getState }) => {
      const instanciaStored = getInstanciaStorage();
      if(instanciaStored){
        headers.set("X-InstanciaId", instanciaStored.id.toString());
      }
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["listaPosts","obtenerPerfil","usuarios","denuncias","datosInstancia", "actualizarPerfil", "conexionesInstancia", "seguidores", "seguidos", "opcionesUsuario","obtenerTrends","instancias", "privacidad", "notificaciones"],
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
    signup: builder.mutation<string, UsuarioCreateDTO>({
      query: (body) => ({
        url: "/auth/register",
        method: "POST",
        body,
      }),
      invalidatesTags: [],
    }),
    invitationSignUp: builder.mutation<string, UsuarioCreateDTO>({
      query: (body) => ({
        url: `/auth/register?token=${body.guidToken}`,
        method: "POST",
        body,
      }),
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
    privateBlockUser: builder.mutation<void, {id: number, body: PrivacidadWriteUnicoDTO} >({
      query: ({ id, body }) => ({
        url: `/usuarios/me/privacidad/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ['privacidad'],
    }),
    notificationViewed: builder.mutation<void, string>({
      query: (id) => ({
        url: `/notificaciones/usuarios/visto`,
        method: "PUT",
        params: { id }, 
      }),
      invalidatesTags: ['notificaciones'],
    }),
    aproveUser: builder.mutation<void, AprobarUsuarioDTO>({
      query: ({ id }) => ({
        url: `/private/usuarios/${id}/aprobar`, 
        method: "PUT"
      }),
      invalidatesTags: ['usuarios'],
    }),
    banUser: builder.mutation<void, BanearUsuarioDTO>({
      query: ({ id }) => ({
        url: `/private/usuarios/${id}/banear`, 
        method: "PUT"
      }),
      invalidatesTags: ['usuarios', 'listaPosts'],
    }),
    followUser: builder.mutation<GenericDTO, SeguirUsuarioDTO>({
      query: ({ id }) => ({
        url: `/usuarios/${id}/seguir`, 
        method: "PUT"
      }),
      invalidatesTags: ['seguidores', 'actualizarPerfil','listaPosts'],
    }),
    userNotifications: builder.mutation<void, UsuarioNotificacionesDTO>({
      query: (body) => ({
        url: `/usuarios/me/opciones`, 
        method: "PUT",
        body,
      }),
      invalidatesTags: ['opcionesUsuario'],
    }),
    changePassword: builder.mutation<void, CambiarContraseniaDTO>({
      query: (body) => ({
        url: `/usuarios/me/privacidad/password`, 
        method: "PUT",
        body,
      }),
    }),
    newTrend: builder.mutation<void, NewTrendDTO>({
      query: ({ MinutosDesde  }) => ({
        url: `/private/trends`, 
        method: "PUT",
        params: {
          MinutosDesde,
        },
      }),
      invalidatesTags: ['obtenerTrends']
    }),
    suspendUser: builder.mutation<void, SuspenderUsuarioDTO>({
      query: ({ id, fecha }) => {
        const fechaUTC = fecha.toISOString();
        return {
          url: `/private/usuarios/${id}/suspender`,
          method: "PUT",
          params: { fecha: fechaUTC }
        };
      },
      invalidatesTags: ['usuarios'],
    }),
    changeRol: builder.mutation<void, CambiarRolUsuarioDTO>({
      query: ({ id, rol }) => ({
        url: `/private/usuarios/${id}/rol`, 
        method: "PUT",
        params: {
          rol,
        },
      }),
      invalidatesTags: ['usuarios'],
    }),
    changeStatusInstance: builder.mutation<void, void>({
      query: () => ({
        url: `/private/instancias/estado`, 
        method: "PUT",
      }),
      invalidatesTags: ['datosInstancia'],
    }),
    changeDataInstance: builder.mutation<void, CambiarDataInstanciaDTO>({
      query: (body) => ({
        url: `/private/instancias`, 
        method: "PUT",
        body,
      }),
      invalidatesTags: ['datosInstancia' , 'instancias'],
    }),
    requestConnection: builder.mutation<void, number>({
      query: (id) => ({
        url: `/private/instancias/conexion`, 
        method: "PUT",
        params: {id}      
      }),
      invalidatesTags: ['conexionesInstancia'],
    }),
    getPosts: builder.query<PostDTO[], getPostsProps>({
      query: ({ skip, limit }) => (`/posts?skip=${skip}&limit=${limit}`),
      providesTags: ["listaPosts"],
    }),
    getPostFavoritos: builder.query<PostDTO[], getPostsFavoritosProps>({
      query: ({ postID,skip, limit }) => (`/posts?postId=${postID}&skip=${skip}&limit=${limit}`),
      providesTags: [],
    }),
    addPostFavoritos: builder.mutation<void, string>({
      query: (id ) => ({
        url: `/posts/favoritos?postId=${id}`, 
        method: "POST"
      }),
      invalidatesTags: [],
    }),
    reportPost: builder.mutation<void, DenunciaCreateDTO>({
      query: (body ) => ({
        url: (`/denuncias`),
        method: "POST",
        body,
      }),
      invalidatesTags: [],
    }),
    changeStatusReport: builder.mutation<void, ChangeStatusReport>({
      query: ({ post, s }) => ({
        url: `/private/denuncias/estado`,
        method: "PUT",
        params: { post, s },
      }),
      invalidatesTags: ["denuncias"],
    }),
    
    getReportRazones: builder.query<DenunciaRazonDTO[], void >({
      query: () => ("/denuncias/razones"),
      providesTags: [],
    }),
    getPostsBusqueda: builder.query<PostDTO[], getPostsBusquedaProps>({
      query: ({ skip, limit, q }) => (`/posts?q=${q}&skip=${skip}&limit=${limit}`),
      providesTags: [],
    }),
    getNotifications: builder.query<NotificacionDTO,void>({
      query: () => ("/notificaciones/usuarios"),
      providesTags: ["notificaciones"],
    }),
    getReports: builder.query<DenunciaSalidaDTO[],void>({
      query: () => ("/private/denuncias"),
      providesTags: ["denuncias"],
    }),
    getDetailsReport: builder.query<DenunciaDTO[],string>({
      query: (post) => (`/private/denuncias/info?post=${post}&skip=0&limit=1000`),
    }),
    getEstadisticasUsers: builder.query<DtEstadisticaUsuario,void>({
      query: () => (`/private/instancias/estadisticas/usuarios`),
    }),
    getEstadisticasTrends: builder.query<TrendDTO,void>({
      query: () => (`/private/instancias/estadisticas/trend`),
    }),
    getEstadisticasPosts: builder.query<DtEstadisticaPost,void>({
      query: () => (`/private/instancias/estadisticas/post`),
    }),
    getOptionsUser: builder.query<UsuarioNotificacionesDTO, void>({
      query: () => (`/usuarios/me/opciones`),
      providesTags: ["opcionesUsuario"],
    }),
    getPostsInstancia: builder.query<PostDTO[], getPostsProps>({
      query: ({ skip, limit }) => (`/posts/hometimeline/?skip=${skip}&limit=${limit}`),
      providesTags: ["listaPosts"],
    }),
    getPost: builder.query<PostDTO, string>({
      query: (id) => (`/posts/${id}`),
      providesTags: ["listaPosts"],
    }),
    getSeguidores: builder.query<UsuarioDTO[], number>({
      query: (id) => (`/usuarios/${id}/seguidores`),
      providesTags: ["seguidores"],
    }),
    getSeguidos: builder.query<UsuarioDTO, number>({
      query: (id) => (`/usuarios/${id}/seguidos`),
      providesTags: ["seguidos"],
    }),
    getUser: builder.query<UsuarioDTO, string>({
      query: (id) => (`/usuarios/${id}`),
      providesTags: ["actualizarPerfil"],
    }),
    getRespuestas: builder.query<PostDTO[], string>({
      query: ( id ) => (`/posts/${id}/respuestas`),
      providesTags: [],
    }),
    getInstancias: builder.query<InstanciaDTO[],void>({
      query: () => (`/instancias`),
      providesTags: ["instancias"],
    }),
    getInstancia: builder.query<InstanciaDTO,GetInstanciaProps>({
      query: ({alias}) => (`/instancias/alias/${alias}`),
      providesTags: ["datosInstancia"],
    }),
    getConexionesInstancias: builder.query<InstanciaConectadaDTO[],void>({
      query: () => (`/private/instancias/conexion`),
      providesTags: ["conexionesInstancia"],
    }),
    getProfile: builder.query<UsuarioDTO,void>({
      query: (body) => ("/usuarios/me"),
      providesTags: ["obtenerPerfil"],
    }),
    getUsuarios: builder.query<UsuarioDTO[],void>({
      query: (body) => ("/private/usuarios"),
      providesTags: ['usuarios'],
    }),
    getUsersPrivacity: builder.query<UsuarioDTO[],void>({
      query: (body) => ("/usuarios/me/privacidad"),
      providesTags: ['privacidad'],
    }),
    getTrends: builder.query<TrendDTO[],void>({
      query: (body) => ("/posts/trends"),
      providesTags: ['obtenerTrends'],
    }),
    editProfile: builder.mutation<UsuarioDTO, UsuarioPerfilUpdateDTO>({
      query: (body) => ({
        url: "/usuarios/me/perfil",
        method: "PUT",
        body,
      }),
      transformResponse: (resp: UsuarioDTO, meta) => resp,
      invalidatesTags: ["actualizarPerfil", "obtenerPerfil"],
    }),
  }),
});

export const {
  useLoginMutation,
  useSignupMutation,
  useCreatePostMutation,
  useLazyGetPostsQuery,
  useLazyGetPostsBusquedaQuery,
  useLazyGetPostsInstanciaQuery,
  useGetProfileQuery,
  useGetConexionesInstanciasQuery,
  useGetReportsQuery,
  useGetDetailsReportQuery,
  useGetEstadisticasPostsQuery,
  useGetEstadisticasTrendsQuery,
  useGetEstadisticasUsersQuery,
  useEditProfileMutation,
  useGetUsuariosQuery,
  useInviteUserMutation,
  useAproveUserMutation,
  useBanUserMutation,
  useSuspendUserMutation,
  useChangeRolMutation,
  useGetInstanciaQuery,
  useGetInstanciasQuery,
  useNewTrendMutation,
  useGetRespuestasQuery,
  useGetPostQuery,
  useChangeStatusReportMutation,
  useChangeStatusInstanceMutation,
  useChangeDataInstanceMutation,
  useGetUserQuery,
  useFollowUserMutation,
  useGetSeguidoresQuery,
  useGetSeguidosQuery,
  useGetOptionsUserQuery,
  useUserNotificationsMutation,
  useGetTrendsQuery,
  useGetUsersPrivacityQuery,
  usePrivateBlockUserMutation,
  useChangePasswordMutation,
  useGetNotificationsQuery,
  useNotificationViewedMutation,
  useGetPostFavoritosQuery,
  useAddPostFavoritosMutation,
  useRequestConnectionMutation,
  useReportPostMutation,
  useGetReportRazonesQuery,
  useInvitationSignUpMutation,
  //useLoginGoogleMutation,
} = microbApis;