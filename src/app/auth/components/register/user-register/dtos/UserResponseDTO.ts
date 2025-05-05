
export class UserResponseDTO {
  username: string = '';
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  location: string = '';
  photoProfile: string = '';
  description: string = '';
  typeUser: TypeUser = TypeUser.USER;
  verified: boolean = false;

}


enum TypeUser {
  USER = "USER",
  ARTIST = "ARTIST",
  ADMIN = "ADMIN"
}
