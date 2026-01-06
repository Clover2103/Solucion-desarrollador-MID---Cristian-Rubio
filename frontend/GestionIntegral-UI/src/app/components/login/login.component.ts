import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  user: string = '';
  pass: string = '';
  loading: boolean = false;
  error: boolean = false; // <-- Agregada para evitar el error de compilación

  constructor(private authService: AuthService, private router: Router) { }

  onLogin() {
    // 1. Validación básica de campos vacíos
    if (!this.user || !this.pass) {
      Swal.fire({
        icon: 'warning',
        title: 'Campos incompletos',
        text: 'Por favor, ingrese su usuario y contraseña.',
        confirmButtonColor: '#8B0000'
      });
      return;
    }

    this.loading = true;
    this.error = false; // Reiniciamos el estado de error al intentar loguear

    this.authService.login(this.user, this.pass).subscribe({
      next: (res) => {
        this.loading = false;

        Swal.fire({
          icon: 'success',
          title: '¡Acceso Concedido!',
          text: 'Bienvenido al Sistema de Gestión Integral',
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          // Navegación segura después de la alerta
          this.router.navigate(['/mantenimiento-geografia']);
        });
      },
      error: (err) => {
        this.loading = false;
        this.error = true; // <-- Ahora el HTML podrá leer esta propiedad sin errores

        Swal.fire({
          icon: 'error',
          title: 'Fallo de Autenticación',
          text: 'Usuario o contraseña incorrectos. Por favor, intente de nuevo.',
          confirmButtonColor: '#8B0000'
        });

        console.error('Error en login:', err);
      }
    });
  }
}
