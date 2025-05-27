export interface CreatePortafolioDto {
  titulo: string;
  descripcion: string;
  tipoArchivo?: string | null;
  urlArchivo?: string | null;
  urlImagen?: string | null;
  descripcionImagen?: string | null;
  etiquetas?: string [] | null;
  nombreUsuario: string;
}
