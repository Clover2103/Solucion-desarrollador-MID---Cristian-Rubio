import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Necesario para el [(ngModel)]
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

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
  error: boolean = false;

  constructor(private authService: AuthService, private router: Router) { }

  onLogin() {
    this.authService.login(this.user, this.pass).subscribe({
      next: (res) => {
        console.log('Login exitoso', res); // Agrega este log para confirmar
        this.router.navigate(['/mantenimiento']); // <--- Verifica que esta ruta exista en app.routes.ts
      },
      error: (err) => {
        this.error = true;
      }
    });
  }
}
