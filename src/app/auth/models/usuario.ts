
export interface Usuario {
  uuid?: string; // Es opcional porque puede ser generado por el backend
  username: string;
  email: string;
  password?: string; // Opcional para evitar mostrarla innecesariamente
  firstName: string;
  lastName: string;
  location?: string;
  description?: string;
  photoProfile?: string;
  rol: 'ARTISTA' | 'EMPRESA' | 'ADMIN' | 'USUARIO_NORMAL';
  isVerified?: boolean;
  createdAt?: string; // O Date si quieres manejar fechas directamente
}
