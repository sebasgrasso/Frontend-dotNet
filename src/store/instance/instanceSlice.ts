/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";
import { TematicaDTO,TipoRegistrostring } from "../../interfaces/interfaces";

interface GetInstanceSliceState {
    id: number; 
    nombre: string; 
    url: string; 
    alias: string; 
    isBanned: boolean;
    isActiva: boolean;
    tipoRegistro: TipoRegistrostring; 
    tematicas: TematicaDTO[];
    tema:string;
}

const initialState = (): GetInstanceSliceState => {
  const state: GetInstanceSliceState = {
    id:1, //solucion parcial mientras no obtengamos instancia.id antes de getPosts
    nombre:"",
    url:"",
    alias:"",
    isBanned: false,
    isActiva: false,
    tipoRegistro:"Cerrado",
    tematicas:[],
    tema:"azul"
}
  return state;
};

export const instanceSlice = createSlice({
  name: "instance",
  initialState,
  reducers: {
    setInstance: (state,action) => {
      state.id = action.payload.id;
      state.nombre = action.payload.nombre;
      state.url = action.payload.url;
      state.alias = action.payload.alias;
      state.tipoRegistro = action.payload.tipoRegistro;
      state.tematicas = action.payload.tematicas;
      state.isActiva = action.payload.isActiva;
      state.isBanned = action.payload.isBanned;
      state.tema = action.payload.tema;
    },
  },
}); 

// Action creator are generated for each case reducer function
export const { setInstance} =
  instanceSlice.actions;
