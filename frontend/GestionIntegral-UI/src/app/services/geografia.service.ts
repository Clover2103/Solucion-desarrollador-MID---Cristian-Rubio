import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pais, Departamento, Ciudad } from '../models/geografia.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class GeografiaService {
  private http = inject(HttpClient);
  private url = 'http://localhost:5000/api';

  // ==========================================
  // --- PAÍSES ---
  // ==========================================
  getPaises(): Observable<Pais[]> {
    return this.http.get<Pais[]>(`${this.url}/Paises`);
  }

  crearPais(nombre: string): Observable<any> {
    return this.http.post(`${this.url}/Paises`, { nombre });
  }

  actualizarPais(id: number, nombre: string): Observable<any> {
    return this.http.put(`${this.url}/Paises/${id}`, {
      paisId: id,
      nombre: nombre
    });
  }

  borrarPais(id: number): Observable<any> {
    return this.http.delete(`${this.url}/Paises/${id}`);
  }


  // ==========================================
  // --- DEPARTAMENTOS ---
  // ==========================================
  getDeptosPorPais(paisId: number): Observable<Departamento[]> {
    return this.http.get<Departamento[]>(`${this.url}/Departamentos/porpais/${paisId}`);
  }

  crearDepto(nombre: string, paisId: number): Observable<any> {
    return this.http.post(`${this.url}/Departamentos`, {
      nombre: nombre,
      paisId: paisId
    });
  }

  actualizarDepto(id: number, nombre: string, paisId: number) {
    const body = {
      departamentoId: id,
      nombre: nombre,
      paisId: paisId
    };

    return this.http.put(`${this.url}/Departamentos/${id}`, body);
  }

  borrarDepto(id: number): Observable<any> {
    return this.http.delete(`${this.url}/Departamentos/${id}`);
  }


  // ==========================================
  // --- CIUDADES ---
  // ==========================================
  getCiudadesPorDepto(deptoId: number): Observable<Ciudad[]> {
    return this.http.get<Ciudad[]>(`${this.url}/Ciudades/pordepartamento/${deptoId}`);
  }

  crearCiudad(nombre: string, departamentoId: number): Observable<any> {
    return this.http.post(`${this.url}/Ciudades`, {
      nombre: nombre,
      departamentoId: departamentoId
    });
  }

  actualizarCiudad(id: number, nombre: string, deptoId: number): Observable<any> {
    const payload = {
      ciudadId: id,
      nombre: nombre,
      departamentoId: deptoId
    };
    return this.http.put(`${this.url}/Ciudades/${id}`, payload);
  }

  borrarCiudad(id: number): Observable<any> {
    return this.http.delete(`${this.url}/Ciudades/${id}`);
  }
}
