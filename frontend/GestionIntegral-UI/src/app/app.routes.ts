import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { MantenimientoGeografiaComponent } from './components/mantenimiento-geografia/mantenimiento-geografia.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  // 1. Al entrar a la raíz (localhost:4200), redirigimos al login
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // 2. Ruta pública para el Login
  { path: 'login', component: LoginComponent },

  // 3. Ruta PROTEGIDA para el CRUD de 3 columnas
  {
    path: 'mantenimiento',
    component: MantenimientoGeografiaComponent,
    canActivate: [authGuard] // Aquí el Guard revisa si el usuario está logueado
  },

  // 4. Comodín: Cualquier otra ruta desconocida manda al login
  { path: '**', redirectTo: 'login' }
];
