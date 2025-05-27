export interface Portafolio {
  idPortafolio: number;
  titulo: string;
  descripcion: string | null;
  tipoArchivo: string | null;
  urlArchivo: string | null;
  urlImagen: string | null;
  descripcionImagen: string | null;
  etiquetas: string [] | null;
  nombreUsuario: string;
}
