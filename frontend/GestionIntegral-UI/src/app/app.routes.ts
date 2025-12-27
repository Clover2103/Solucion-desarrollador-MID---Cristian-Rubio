import { Routes } from '@angular/router';
import { MantenimientoGeografiaComponent } from './components/mantenimiento-geografia/mantenimiento-geografia.component';

export const routes: Routes = [
  { path: '', component: MantenimientoGeografiaComponent }, // Carga directa
  { path: '**', redirectTo: '' }
];
