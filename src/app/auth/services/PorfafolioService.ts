import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Portafolio } from '../models/portafolio';

@Injectable({
  providedIn: 'root'
})
export class PortafolioService {

  private apiUrl = `${environment.url}/portafolios`;

  constructor(private http: HttpClient) {}

  /**
   * Obtener portafolios por UUID del usuario
   */
  getPortafoliosByUserUuid(uuid: string): Observable<Portafolio[]> {
    return this.http.get<Portafolio[]>(`${this.apiUrl}/user/uuid/${uuid}`);
  }

  /**
   * (Opcional) Obtener portafolio individual por ID
   */
  getPortafolioById(id: number): Observable<Portafolio> {
    return this.http.get<Portafolio>(`${this.apiUrl}/${id}`);
  }

  /**
   * (Opcional) Crear un nuevo portafolio
   */
  createPortafolio(data: Portafolio): Observable<Portafolio> {
    return this.http.post<Portafolio>(`${this.apiUrl}/crear`, data);
  }

  /**
   * (Opcional) Eliminar un portafolio
   */
  deletePortafolio(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/eliminar/${id}`);
  }
}
