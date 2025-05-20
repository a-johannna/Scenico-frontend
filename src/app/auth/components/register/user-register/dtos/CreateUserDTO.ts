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
  USUARIO_NORMAL = 'USUARIO_NORMAL',
  ARTISTA = 'ARTISTA',
  EMPRESA = 'EMPRESA',
  ADMIN = 'ADMIN'
}

const newUser: CreateUserDTO = {
  username: '',
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  rol: RolUsuario.USUARIO_NORMAL,
  location: '',
  description: '',
  photoProfile: ''
};
