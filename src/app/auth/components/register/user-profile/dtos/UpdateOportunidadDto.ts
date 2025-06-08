export interface UpdateOportunidadDto {
  titulo?: string;
  descripcion?: string;
  categoria?: string;
  requisitos?: string;
  ubicacion?: string;
  estado?: 'ABIERTA' | 'CERRADA';
 // fechaCierre?: string;
}
