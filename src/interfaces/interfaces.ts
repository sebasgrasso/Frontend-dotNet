export interface InstanciaUpdateDTO {
  nombre: string | null;
  tipoRegistro: TipoRegistrostring;
}

export interface InvitacionDTO {
  instanciaId: number;
  email: string;
}

export interface NotificacionDTO {
  id: string;
  usuarioId: number;
  refUsuarioId: number;
  refPostId: string;
  mensaje: string;
  fechaHora: string; // Consider using Date type for date-time values
  visto: boolean;
}

export interface PostCitadoDTO {
  id: string;
  instanciaId: number;
  instanciaAlias: string;
  usuarioId: number;
  usuarioUsername: string;
  usuarioNickname: string;
  fotoUrl: string;
  fechaHora: string; // Consider using Date type for date-time values
  contenido: string;
}

export interface PostCreateDTO {
  contenido: string | null;
  postIdCita: string | null;
  postIdPadre: string | null;
}

export interface PrivacidadWriteUnicoDTO {
  isBloqueado: boolean | null;
  isSilenciado: boolean | null;
  minutosSilenciado: number | null;
}

export interface PostCitadoDTO {
  id: string;
  instanciaId: number;
  instanciaAlias: string;
  usuarioId: number;
  usuarioUsername: string;
  usuarioNickname: string;
  fotoUrl: string;
  fechaHora: string; // Assuming date-time format
  contenido: string;
}

export interface PostDTO {
  id: string;
  instanciaId: number;
  instanciaAlias: string;
  usuarioId: number;
  usuarioUsername: string;
  usuarioNickname: string;
  fotoUrl: string;
  fechaHora: string; // Assuming date-time format
  contenido: string;
  hashtags: string[];
  tieneCita: boolean;
  tieneMensaje: boolean;
  cantMensaje: number;
  cantFavoritos: number;
  isUsuarioInFavoritos: boolean;
  postCitado?: PostCitadoDTO;
  postIdPadre?: string | null;
}


export type Rolstring = 'User' | 'Mod' | 'Admin';

export interface RolFullDTO {
  id: number;
  descripcion: string | null;
}

export interface TematicaDTO {
  id: number;
  nombre: string;
}

export type TipoRegistrostring = 'Abierto' | 'AbiertoConAprobacion' | 'CerradoConInvitacion' | 'Cerrado';

export interface TrendDTO {
  instanciaId: number;
  keyword: string;
  cantidad: number;
}

export interface DtEstadisticaUsuario {
  intervalo: number;
  cantidades: {
    adminCount: number;
    modCount: number;
    userCount: number;
  };
}

export interface DtEstadisticaPost {
  intervalo: number;
  cantidades: number;
}

export interface UsuarioCreateDTO {
  guidToken: string | null;
  username: string;
  email: string;
  contrasenia: string;
  perfil: UsuarioPerfilCreateDTO;
}

export interface UsuarioDTO {
  id: number;
  username: string;
  perfil: UsuarioPerfilDTO;
  fotoUrl: string;
  cantSeguidores: number;
  cantSeguidos: number;
  instanciaAlias: string;
}

export interface UsuarioDTOMod {
  id: number;
  username: string;
  email: string;
  fechaIngreso: string; // Consider using Date type for date-time values
  isActivo: boolean;
  isSuspendido: boolean;
  fechaSuspendidoHasta: string; // Consider using Date type for date-time values
  isBanned: boolean;
  rol: RolFullDTO;
  perfil: UsuarioPerfilDTOMod;
}

export interface UsuarioNotificacionesDTO {
  nuevoPostNotifi: boolean | null;
  seguirNotifi: boolean | null;
  favoritoNotifi: boolean | null;
}

export interface CambiarContraseniaDTO {
  contraseniaActual: string;
  contraseniaNueva: string;
}

export interface UsuarioPerfilCreateDTO {
  nickname: string;
  fechaNac: string | null; // Consider using Date type for date values
  bio: string | null;
  ocupacion: string | null;
  sitioWeb: string | null;
  fotoUrl: string | null;
}

export interface UsuarioPerfilDTO {
  nickname: string;
  fechaNac: string; // Consider using Date type for date values
  bio: string | null;
  ocupacion: string | null;
  sitioWeb: string | null;
  fotoUrl: string | null;
}

export interface UsuarioPerfilDTOMod {
  nickname: string;
  fechaNac: string; // Consider using Date type for date values
  bio: string | null;
  ocupacion: string | null;
  sitioWeb: string | null;
  fotoUrl: string | null;
}

export interface UsuarioPerfilUpdateDTO {
  nickname: string;
  fechaNac: string; // Consider using Date type for date values
  bio: string | null;
  ocupacion: string | null;
  sitioWeb: string | null;
  fotoUrl: string | null;
}

export interface AuthLoginDTO {
  username: string;
  contrasenia: string;
}

export interface AuthLoginResponseDTO {
  accessToken: string;
}

export interface AuthResetPasswordDTO {
  token: string;
  contraseniaNueva: string;
}

export interface DenunciaCreateDTO {
  reportadoId: number;
  post: string;
  texto: string;
  denunciaRazonId: number;
}

export interface DenunciaDTO {
  id: number;
  reporta: UsuarioDTO;
  reportado: UsuarioDTO;
  post: string;
  texto: string;
  resuelto: boolean;
  denunciaRazon: DenunciaRazonDTO;
}

export interface DenunciaRazonDTO {
  id: number;
  nombre: string;
}

export interface DenunciaSalidaDTO {
  usuarioPost: string;
  post: string;
  username: string;
  countPost: number;
}

export interface ErrorResponse {
  status: number;
  message: string;
  errors: string[] | null;
}

export interface InstanciaConectadaDTO {
  instanciaA: InstanciaDTO;
  instanciaB: InstanciaDTO;
  isAceptadaA: boolean;
  isAceptadaB: boolean;
  isHabilitada: boolean;
}

export interface InstanciaDTO {
  alias: string;
  id: number;
  isActiva: boolean;
  isBanned: boolean;
  nombre: string;
  tematicas: TematicaDTO[];
  tipoRegistro: TipoRegistrostring;
  tema: string;
  url: string;
}

export interface AprobarUsuarioDTO{
  id: number;
}

export interface BanearUsuarioDTO{
  id: number;
}

export interface SeguirUsuarioDTO{
  id: number;
}

export interface GenericDTO{
  result: boolean;
  message: string;
}

export interface NewTrendDTO{
  MinutosDesde: number;
}

export interface GetInstanciaProps {
  alias:string;
}

export interface ChangeStatusReport {
  post : string;
  s : string;
}

export interface SuspenderUsuarioDTO{
  id: number;
  fecha: Date;
}

export interface CambiarDataInstanciaDTO{
  nombre: string;
  tipoRegistro: string;
  tema: string;
}

export interface CambiarRolUsuarioDTO {
  id: number; 
  rol: string;    
}

export interface getPostsProps{
  skip:number;
  limit:number;
}

export interface getPostsBusquedaProps{
  q:string;
  skip:number;
  limit:number;
}

export interface getReportsDetailsProps{
  post:string;
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

export interface getPostsFavoritosProps{
  postID:string;
  skip:string;
  limit:string;
}