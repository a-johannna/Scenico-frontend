import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {catchError, Observable, retry, tap, throwError} from 'rxjs';
import { LoginRequestDTO } from '../components/login/dtos/LoginRequestDTO';
import { LoginResponseDTO } from '../components/login/dtos/LoginResponseDTO';
import {CreateUserDTO} from '../components/register/user-register/dtos/CreateUserDTO';
import {UserResponseDTO} from '../components/register/user-register/dtos/UserResponseDTO';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = environment.url;

  constructor(private http: HttpClient) { }

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


  register(data: CreateUserDTO): Observable<UserResponseDTO> {

    const headers = new HttpHeaders( {
      'Content-Type': 'application/json'

    });

    return this.http.post<UserResponseDTO>(`${this.apiUrl}/register`, data).pipe(
      tap(response => {
        console.log('Usuario registrado correctamente: ', response);
      }),

      catchError(error => {
        // Log detallado del error
        console.error('Error en registro:', error);

        if (error.status === 401) {
          console.error('Error de autenticación - Detalles:', error);
          return throwError(() => ['No autorizado. Verifica las credenciales o permisos.']);
        }

        if (error.status === 400 && error.error?.errors) {
          const messages = error.error.errors.map((e: any) => e.defaultMessage || e.message);
          return throwError(() => messages);
        }

        return throwError(() => ['Error inesperado en el servidor.']);
      })

    );
  }




    resetPassword(email: string, newPassword: string): Observable<any> {
      return this.http.post('/api/auth/reset-password', { email, newPassword }).pipe(
        catchError((error: HttpErrorResponse) => {
          // Manejo de errores del backend
          let errorMessage = 'Error desconocido';
          if (error.error instanceof ErrorEvent) {
            // Error del cliente
            errorMessage = `Error: ${error.error.message}`;
          } else {
            // Error del backend
            errorMessage = `Código de error: ${error.status}\nMensaje: ${error.error?.message || error.message}`;
          }

          console.error(errorMessage);
          return throwError(() => new Error(errorMessage)); // Propaga el error para que el componente lo maneje.
        })
      );
    }

  getCurrentUserUuid(): string | null {
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.uuid || null;
    } catch (error) {
      console.error('Error al decodificar el token:', error);
      return null;
    }
  }


  logout(): void {
    // Eliminar token y cualquier otro dato del usuario
    localStorage.removeItem('token');
    localStorage.removeItem('user'); // si guardas info extra
    localStorage.removeItem('idUsuario'); // si lo estás usando

  }
}



