import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Asegúrate de que este puerto coincida con el de tu API de .NET
  private apiUrl = 'http://localhost:5000/api/auth';

  constructor(private http: HttpClient, private router: Router) { }

  login(usuario: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { usuario, password }).pipe(
      tap((res: any) => {
        localStorage.setItem('token', res.token); // Si esto no se ejecuta, el Guard te bloquea
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  estaAutenticado(): boolean {
    // Retorna true si existe el token en el localStorage
    return !!localStorage.getItem('token');
  }
}
