/* eslint-disable @typescript-eslint/no-unused-vars */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { AuthLoginDTO, AuthLoginResponseDTO, PostCreateDTO, PostDTO, UsuarioCreateDTO, UsuarioPerfilCreateDTO } from "../../interfaces/interfaces";

interface getPostsProps{
  skip:number;
  limit:number;
}

export const microbApis = createApi({
  reducerPath: "microbApis",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:8080/api",
    prepareHeaders: (headers, { getState }) => {
      //aca iria obtencion de instancia.id para header
        headers.set("authorization","1");
      return headers;
    },
  }),
  tagTypes: ["listaPosts"],
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
    getPosts: builder.query<PostDTO[], getPostsProps>({
      query: ({ skip, limit }) => (`/posts?skip=${skip}&limit=${limit}`),
      providesTags: ["listaPosts"],
    }),
  }),
});

export const {
  useLoginMutation,
  useSignupMutation,
  useCreatePostMutation,
  useLazyGetPostsQuery
  //useLoginGoogleMutation,
} = microbApis;
