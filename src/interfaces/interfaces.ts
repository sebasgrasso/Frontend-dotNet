export enum TipoUsuario {
    Instancia = 0,
    Normie = 1,
    Invitado=2
  }

export interface Usuario {
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
    citado: PostType | null;
    upvotes: number;
    upvoted: boolean;
  }