import jwt_decode from "jwt-decode";
import { Token } from "../interfaces/interfaces";

export const getToken = () => {
    try {
      const token: string = JSON.parse(localStorage.getItem("token") || "");
  
      if (!token) return;
  
      const decoded: Token = jwt_decode(token);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { iss, exp, ...rest } = decoded;
  
      return {
        ...rest,
        token,
      };
    } catch (error) {
      return;
    }
  };
  
  export const setToken = (token: string) => {
    window.localStorage.setItem("token", JSON.stringify(token));
  };
  
  export const limpiarToken = () => {
    localStorage.removeItem("token");
  };
  
  export const limpiarStorage = () => {
    localStorage.clear();
  };

  export const setInstanciaStorage = ({id,alias}: {id:string,alias:string}) =>{
    console.log("setInstance",{id,alias});
    
    window.localStorage.setItem("instancia", JSON.stringify({id,alias}));
  }

  export const getInstanciaStorage = () => {
    try {
      const instancia: {id:number,alias:string} = JSON.parse(localStorage.getItem("instancia") || "");
  
      if (!instancia) return;
  
    
      return instancia;
    } catch (error) {
      return;
    }
  };

  export const limpiarInstancia = () => {
    localStorage.removeItem("instancia");
  };