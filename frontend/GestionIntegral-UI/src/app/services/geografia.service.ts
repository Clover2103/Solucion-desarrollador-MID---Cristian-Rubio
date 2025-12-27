import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pais, Departamento, Ciudad } from '../models/geografia.model';

@Injectable({ providedIn: 'root' })
export class GeografiaService {
  private http = inject(HttpClient);
  private url = 'http://localhost:5000/api';

  // --- CRUD PAÍSES ---
  getPaises() { return this.http.get<Pais[]>(`${this.url}/Paises`); }
  crearPais(nombre: string) { return this.http.post(`${this.url}/Paises`, { nombre }); }
  borrarPais(id: number) { return this.http.delete(`${this.url}/Paises/${id}`); }

  // --- CRUD DEPARTAMENTOS ---
  getDeptosPorPais(paisId: number) {
    return this.http.get<Departamento[]>(`${this.url}/Departamentos/porpais/${paisId}`);
  }
  crearDepto(nombre: string, paisId: number) {
    return this.http.post(`${this.url}/Departamentos`, { nombre, paisId });
  }
  borrarDepto(id: number) { return this.http.delete(`${this.url}/Departamentos/${id}`); }

  // --- CRUD CIUDADES ---
  getCiudadesPorDepto(deptoId: number) {
    return this.http.get<Ciudad[]>(`${this.url}/Ciudades/pordepartamento/${deptoId}`);
  }
  crearCiudad(nombre: string, departamentoId: number) {
    return this.http.post(`${this.url}/Ciudades`, { nombre, departamentoId });
  }
  borrarCiudad(id: number) { return this.http.delete(`${this.url}/Ciudades/${id}`); }
}
