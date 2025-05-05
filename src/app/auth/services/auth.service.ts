import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {catchError, Observable, retry, throwError} from 'rxjs';
import { LoginRequestDTO } from '../components/login/dtos/LoginRequestDTO';
import { LoginResponseDTO } from '../components/login/dtos/LoginResponseDTO';
import {CreateUserDTO} from '../components/register/user-register/dtos/CreateUserDTO';
import {UserResponseDTO} from '../components/register/user-register/dtos/UserResponseDTO';
import {UserService} from "./UserService";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8080/api/v1/users'; // Reemplaza con la URL de tu backend

  constructor(private http: HttpClient,private userService: UserService) { }

  login(credentials: LoginRequestDTO): Observable<LoginResponseDTO> { // Usa la interfaz aquí
    return this.http.post<LoginResponseDTO>(`${this.apiUrl}/login`, credentials).pipe(
    retry(5),
      catchError(this.handleError));
  }

  private handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Error del lado del servidor
      errorMessage = `Código de Error: ${error.status}\nMensaje: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }


  register(createUserDTO: CreateUserDTO): Observable<UserResponseDTO> {
    return this.userService.createUser(createUserDTO); // Retorna el observable directamente
  }

}
