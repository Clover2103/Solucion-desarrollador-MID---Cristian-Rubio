import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { MantenimientoGeografiaComponent } from './components/mantenimiento-geografia/mantenimiento-geografia.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'mantenimiento-geografia',
    component: MantenimientoGeografiaComponent,
    canActivate: [authGuard]
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];
