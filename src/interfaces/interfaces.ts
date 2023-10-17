export interface AuthLoginDTO {
  username: string;
  contrasenia: string;
}

export interface AuthLoginResponseDTO {
  accessToken: string;
}

export interface ErrorResponse {
  statusCode: number;
  message: string | null;
}

export interface PostCitadoDTO {
  id: string;
  instanciaId: number;
  instanciaNickname: string;
  usuarioId: number;
  usuarioUsername: string;
  usuarioNickname: string;
  fechaHora: string; // Consider using a Date type instead
  contenido: string;
  postIdCita?: string | null;
  postIdPadre?: string | null;
}

export interface PostCreateDTO {
  instanciaId: number;
  usuarioId: number;
  contenido: string;
  postIdCita?: string | null;
  postIdPadre?: string | null;
}

export interface PostDTO {
  id: string;
  instanciaId: number;
  instanciaNickname: string;
  usuarioId: number;
  usuarioUsername: string;
  usuarioNickname: string;
  fechaHora: string; // Consider using a Date type instead
  contenido: string;
  hashtags: string[];
  tieneCita: boolean;
  postCitado: PostCitadoDTO | null;
  postIdPadre?: string | null;
}

export interface UsuarioCreateDTO {
  username: string;
  email: string;
  contrasenia: string;
  perfil: UsuarioPerfilCreateDTO;
}

export interface UsuarioDTO {
  id: number;
  username: string;
  email: string;
  fechaIngreso: string; // Consider using a Date type instead
  perfil: UsuarioPerfilDTO;
}

export interface UsuarioPerfilCreateDTO {
  nickname: string;
  fechaNac?: string | null; // Consider using a Date type instead
  fotoUrl?: string | null;
  bio?: string | null;
  sitioWeb?: string | null;
}

export interface UsuarioPerfilDTO {
  nickname: string;
  fechaNac?: string | null; // Consider using a Date type instead
  fotoUrl?: string | null;
  bio?: string | null;
  sitioWeb?: string | null;
}

export interface UsuarioPerfilUpdateDTO {
  nickname: string;
  fechaNac?: string | null; // Consider using a Date type instead
  fotoUrl?: string | null;
  bio?: string | null;
  sitioWeb?: string | null;
}

export interface Token {
  sub: string;
  //http://schemas.microsoft.com/ws/2008/06/identity/claims/role: string;
  username: string;
  email: string;
  name: string;
  birthdate: string;
  picture: string;
  zoneinfo: string;
  locale: string;
  exp: number;
  iss: string;
  aud: string;
}

export interface Instancia {
  id: number;
  nombre: string;
  url: string;
  alias: string;
  tipoRegistro: number;
  tematicas: {
    id: number;
    nombre: string;
  }[];
}