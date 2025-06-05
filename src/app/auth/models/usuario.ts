
export interface Usuario {
  id_user:number;
  uuid?: string; // Es opcional porque puede ser generado por el backend
  username: string;
  email: string;
  password?: string;
  firstName: string;
  lastName: string;
  location?: string;
  description?: string;
  photoProfile?: string;
  typeUser: 'ADMIN' | 'ARTIST' | 'ENTERPRISE' | 'USER';
  isVerified?: boolean;
  createdAt?: string; // O Date si quieres manejar fechas directamente
}
