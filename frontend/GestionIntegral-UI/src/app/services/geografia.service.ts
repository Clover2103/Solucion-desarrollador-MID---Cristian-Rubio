import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pais, Departamento, Ciudad } from '../models/geografia.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class GeografiaService {
  private http = inject(HttpClient);
  // Asegúrate de que este puerto coincida con el de tu Backend en Visual Studio
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
    // Enviamos el objeto plano para que coincida con el modelo de C#
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
    // Al crear, enviamos nombre y el ID del padre
    return this.http.post(`${this.url}/Departamentos`, {
      nombre: nombre,
      paisId: paisId
    });
  }

  actualizarDepto(id: number, nombre: string, paisId: number) {
    // Construimos el objeto EXACTAMENTE como lo espera la clase C#
    const body = {
      departamentoId: id,
      nombre: nombre,
      paisId: paisId
    };

    // Imprime en consola para verificar que el ID no sea undefined antes de enviar
    console.log("Enviando PUT a:", `${this.url}/Departamentos/${id}`, body);

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
