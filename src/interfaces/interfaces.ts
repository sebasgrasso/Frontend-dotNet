export enum TipoUsuario {
    Instancia = 0,
    Normie = 1,
    Invitado=2
  }

export interface Usuario {
    id: number;
    usuario: string;
    contrasenia: null;
    nombre: string;
    apellido: string;
    eliminado: boolean;
    bloqueado: boolean;
    googleId: string;
    correo: string;
    telefono: string;
    rol: number;
    fechaNacimiento: string;
  }

export interface Token {
    rol: TipoUsuario;
    nombre: string;
    apellido: string;
    correo: string;
    telefono: string;
    imagenUrl: string;
    usuario: string;
    uid: string;
    iat: number;
    exp: number;
    sub: string;
  }

  export interface PostType {
    userName: string;
    userLongName: string;
    content: string;
    citado: PostType | null | undefined;
  }