import {Usuario} from './usuario';

export interface Oportunidades {
  id: number; // o string si es UUID
  titulo: string;
  descripcion: string;
  categoria: string;
  requisitos: string;
  ubicacion: string;
  estado: 'ABIERTA' | 'CERRADA' | 'PENDIENTE';
  fechaPublicacion: string; // ISO date
  fechaCierre: string; // ISO date
  usuarioEmpresa: Usuario; // relación con empresa
}
