import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Portafolio } from '../models/portafolio';
import {CreatePortafolioDto} from '../components/register/user-profile/dtos/CreatePortafolioDto';
import {Usuario} from '../models/usuario';
import {Oportunidades} from '../models/oportunidades';

@Injectable({
  providedIn: 'root'
})
export class PortafolioService {

  private apiUrl = `${environment.url}/portafolios`;

  constructor(private http: HttpClient) {}

  /**
   * Obtener portafolios por UUID del usuario
   * @param uuid
   */
  getPortafoliosByUserUuid(uuid: string): Observable<Portafolio[]> {
    return this.http.get<Portafolio[]>(`${this.apiUrl}/user/uuid/${uuid}`);
  }

  /**
   * (Opcional) Obtener portafolio individual por ID
   *
   */
  getPortafolioById(id: number): Observable<Portafolio> {
    return this.http.get<Portafolio>(`${this.apiUrl}/${id}`);
  }

  /**
   * (Opcional) Crear un nuevo portafolio
   */
  createPortafolio(data: CreatePortafolioDto): Observable<Portafolio> {
    const token = localStorage.getItem('token');
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };

    return this.http.post<Portafolio>(`${this.apiUrl}`, data, { headers });
  }


  // Actualizar usuario existente por UUID
  updatePortfolio(idPortafolio: number, portafolio: Portafolio): Observable<Portafolio> {
    const token = localStorage.getItem('token');
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
    return this.http.put<Portafolio>(`${this.apiUrl}/idPortafolio/${idPortafolio}`, portafolio, { headers });
  }



  /**
   * (Opcional) Eliminar un portafolio
   */
  deletePortafolio(idPortafolio: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
    return this.http.delete(`${this.apiUrl}/username/${idPortafolio}`, { headers });
  }

  getAllPortafolios(): Observable<Portafolio[]> {
    return this.http.get<Portafolio[]>(`${this.apiUrl}/all`);
  }



}
