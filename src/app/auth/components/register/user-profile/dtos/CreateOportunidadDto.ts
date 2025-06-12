export interface CreateOportunidadDto {
  titulo: string;
  descripcion: string;
  categoria: string;
  requisitos: string;
  ubicacion: string;
  estado: 'ABIERTO' | 'CERRADO';

}
