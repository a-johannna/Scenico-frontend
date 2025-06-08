import {Usuario} from './usuario';

export interface Oportunidades {
  id: number;
  titulo: string;
  descripcion: string;
  categoria: string;
  requisitos: string;
  ubicacion: string;
  estado: 'ABIERTA' | 'CERRADA' | 'PENDIENTE';
  fechaPublicacion: string;
  fechaCierre: string;
  usuarioEmpresa: Usuario;
}
