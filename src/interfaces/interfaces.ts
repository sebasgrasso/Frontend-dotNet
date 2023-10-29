// AuthLoginDTO
export interface AuthLoginDTO {
  username: string; // minLength: 1, pattern: /^[a-zA-Z0-9]+$/
  contrasenia: string; // minLength: 1
}

// AuthLoginResponseDTO
export interface AuthLoginResponseDTO {
  accessToken: string; // minLength: 1
}

// ErrorResponse
export interface ErrorResponse {
  statusCode: number; // integer($int32)
  message: string;
}

// InstanciaDTO
export interface InstanciaDTO {
  id: number; // integer($int64)
  nombre: string; // minLength: 1
  url: string; // minLength: 1
  alias: string; // minLength: 1
  tipoRegistro: TipoRegistro; // TipoRegistro enum
  tematicas: TematicaDTO[];
}

// InvitacionDTO
export interface InvitacionDTO {
  instanciaId: number; // integer($int64)
  email: string; // minLength: 1
}

// PostCitadoDTO
export interface PostCitadoDTO {
  id: string; // minLength: 1
  instanciaId: number; // integer($int64)
  instanciaAlias: string; // minLength: 1
  usuarioId: number; // integer($int64)
  usuarioUsername: string; // minLength: 1
  usuarioNickname: string; // minLength: 1
  fechaHora: string; // string($date-time)
  contenido: string; // minLength: 1
}

// PostCreateDTO
export interface PostCreateDTO {
  instanciaId: number; // integer($int64)
  usuarioId: number; // integer($int64)
  contenido: string; // minLength: 1
  postIdCita?: string | null;
  postIdPadre?: string | null;
}

// PostDTO
export interface PostDTO {
  id: string; // minLength: 1
  instanciaId: number; // integer($int64)
  instanciaAlias: string; // minLength: 1
  usuarioId: number; // integer($int64)
  usuarioUsername: string; // minLength: 1
  usuarioNickname: string; // minLength: 1
  fechaHora: string; // string($date-time)
  contenido: string; // minLength: 1
  hashtags: string[];
  tieneCita: boolean;
  postCitado?: PostCitadoDTO;
  postIdPadre?: string | null;
}

// Rol enum
export enum Rol {
  ADMIN = 0,
  MODERATOR = 1,
  USER = 2
}

// TematicaDTO
export interface TematicaDTO {
  id: number; // integer($int64)
  nombre: string; // minLength: 1
}

// TipoRegistro enum
export enum TipoRegistro {
  TIPO_REGISTRO_VALUE = 4
}

// UsuarioCreateDTO
export interface UsuarioCreateDTO {
  username: string; // maxLength: 32, minLength: 5, pattern: /^[a-zA-Z0-9]+$/
  email: string; // minLength: 1
  contrasenia: string; // minLength: 8
  perfil: UsuarioPerfilCreateDTO;
}

// UsuarioDTO
export interface UsuarioDTO {
  id: number; // integer($int64)
  username: string; // minLength: 1
  perfil: UsuarioPerfilDTO;
  instanciaAlias: string; // minLength: 1
}

// UsuarioPerfilCreateDTO
export interface UsuarioPerfilCreateDTO {
  nickname: string; // minLength: 1
  fechaNac?: string | null; // string($date-time), nullable
  bio?: string | null; // nullable
  ocupacion?: string | null; // nullable
  sitioWeb?: string | null; // nullable
  fotoUrl?: string | null; // nullable
}

// UsuarioPerfilDTO
export interface UsuarioPerfilDTO {
  nickname: string; // minLength: 1
  fechaNac?: string | null; // string($date-time), nullable
  bio?: string | null; // nullable
  ocupacion?: string | null; // nullable
  sitioWeb?: string | null; // nullable
  fotoUrl?: string | null; // nullable
}

// UsuarioPerfilUpdateDTO
export interface UsuarioPerfilUpdateDTO {
  nickname: string; // minLength: 1
  fechaNac?: string | null; // string($date-time), nullable
  bio?: string | null; // nullable
  ocupacion?: string | null; // nullable
  sitioWeb?: string | null; // nullable
  fotoUrl?: string | null; // nullable
}

export interface getPostsProps{
  skip:number;
  limit:number;
}

export interface Token {
  sub: string
  username: string
  role: string
  email: string
  name: string
  birthdate: string
  picture: string
  exp: number
  iss: string
  aud: string
}