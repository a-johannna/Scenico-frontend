
export interface Usuario {
  uuid?: string;
  username: string;
  email: string;
  password?: string;
  firstName: string;
  lastName: string;
  location?: string;
  description?: string;
  photoProfile?: string;
  rol: 'ARTISTA' | 'EMPRESA' | 'ADMIN' | 'USUARIO_NORMAL';
  isVerified?: boolean;
  createdAt?: string;
}
