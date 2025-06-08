export interface CreateUserDTO {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  rol: RolUsuario;
  location?: string;
  description?: string;
  photoProfile?: string;
}

export enum RolUsuario {
  USER = 'USER',
  ARTIST = 'ARTIST',
  ENTERPRISE = 'ENTERPRISE',
  ADMIN = 'ADMIN'
}

const newUser: CreateUserDTO = {
  username: '',
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  rol: RolUsuario.USER,
  location: '',
  description: '',
  photoProfile: ''
};
