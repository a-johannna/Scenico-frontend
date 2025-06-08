export interface CreateOportunidadDto {
  titulo: string;
  descripcion: string;
  categoria: string;
  requisitos: string;
  ubicacion: string;
  estado: 'ABIERTA' | 'CERRADA';
  // No incluimos fecha ni fechaCierre: se asignan automáticamente en el backend
}
