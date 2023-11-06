/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";
import { TematicaDTO,TipoRegistrostring } from "../../interfaces/interfaces";

interface GetInstanceSliceState {
    id: number; 
    nombre: string; 
    url: string; 
    alias: string; 
    tipoRegistro: TipoRegistrostring; 
    tematicas: TematicaDTO[];
}

const initialState = (): GetInstanceSliceState => {
  const state: GetInstanceSliceState = {
    id:0,
    nombre:"",
    url:"",
    alias:"",
    tipoRegistro:"Cerrado",
    tematicas:[]
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
    },
  },
}); 

// Action creator are generated for each case reducer function
export const { setInstance} =
  instanceSlice.actions;
