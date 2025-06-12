import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Oportunidades } from '../models/oportunidades';
import { CreateOportunidadDto } from '../components/register/user-profile/dtos/CreateOportunidadDto';

@Injectable({
  providedIn: 'root'
})
export class OportunidadService {

  private apiUrl = `${environment.url}/empresas/oportunidades`;

  constructor(private http: HttpClient) {}

  /** Obtener oportunidades por ID de empresa */
  getOportunidadesByEmpresaId(uuid: string): Observable<Oportunidades[]> {
    return this.http.get<Oportunidades[]>(`${this.apiUrl}/uuid/${uuid}`);
  }

  /** Crear nueva oportunidad */
  createOportunidad( data: CreateOportunidadDto): Observable<Oportunidades> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.http.post<Oportunidades>(`${this.apiUrl}`, data, { headers });
  }

  /** Actualizar una oportunidad existente */
  updateOportunidad(id: number, dto: CreateOportunidadDto): Observable<Oportunidades> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.http.put<Oportunidades>(`${this.apiUrl}/idOportunidad/${id}`, dto, { headers });
  }

  /** Eliminar una oportunidad */
  deleteOportunidad(id: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.http.delete(`${this.apiUrl}/${id}`, { headers });
  }

  getAllOportunidades(): Observable<Oportunidades[]> {
    return this.http.get<Oportunidades[]>(`${this.apiUrl}/todas/publicas`);
  }
}
