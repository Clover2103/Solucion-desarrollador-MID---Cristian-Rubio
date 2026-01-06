import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { MantenimientoGeografiaComponent } from './components/mantenimiento-geografia/mantenimiento-geografia.component';
import { authGuard } from './guards/auth.guard';

// Ejemplo de app.routes.ts
export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'mantenimiento-geografia', // <--- ESTE ES EL NOMBRE QUE IMPORTA
    component: MantenimientoGeografiaComponent,
    canActivate: [authGuard]
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];
