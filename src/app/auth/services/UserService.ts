//<llm-snippet-file>src/app/services/UserService.ts</llm-snippet-file>
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '../../../environments/environment';
import {Usuario} from '../models/usuario';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = environment.url; // Ajusta la URL a tu backend

  constructor(private http: HttpClient) { }

// Obtener todos los usuarios
  getAllUsers(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.apiUrl}/listar`);
  }

  // Obtener un usuario por UUID
  getUserByUuid(uuid: string): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.apiUrl}/uuid/${uuid}`);
  }

  // Crear un nuevo usuario
  createUser(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.apiUrl}/crear`, usuario);
  }

  // Actualizar usuario existente por UUID
  updateUser(uuid: string, usuario: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.apiUrl}/uuid/${uuid}`, usuario);
  }

  // Eliminar usuario por UUID
  deleteUser(uuid: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/uuid/${uuid}`);
  }

  uploadPhoto(formData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/upload-photo`, formData);
  }

}
