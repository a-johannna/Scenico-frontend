//<llm-snippet-file>src/app/services/UserService.ts</llm-snippet-file>
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {CreateUserDTO} from "../components/register/user-register/dtos/CreateUserDTO";
import {UserResponseDTO} from "../components/register/user-register/dtos/UserResponseDTO";


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:8080/api/v1/u/users'; // Ajusta la URL a tu backend

  constructor(private http: HttpClient) { }

  createUser(user: CreateUserDTO): Observable<UserResponseDTO> {
    return this.http.post<UserResponseDTO>(this.apiUrl, user);
  }
}
