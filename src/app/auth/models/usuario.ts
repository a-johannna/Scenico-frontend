
export interface Usuario {
  id_user:number;
  uuid?: string;
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
  createdAt?: string;
}
