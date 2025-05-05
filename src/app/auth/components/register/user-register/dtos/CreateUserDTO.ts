export interface CreateUserDTO {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  location: string;
  password: string;
  typeUser: TypeUser;
  photoProfile: string;
  description: string;

}
enum TypeUser {
  USER = "USER",
  ARTIST = "ARTIST",
  ADMIN = "ADMIN"

}

const newUser: CreateUserDTO = {
  username: '',
  firstName: '',
  lastName: '',
  email: '',
  location: '',
  password: '',
  typeUser: TypeUser.USER,
  photoProfile: '',
  description: ''
}

