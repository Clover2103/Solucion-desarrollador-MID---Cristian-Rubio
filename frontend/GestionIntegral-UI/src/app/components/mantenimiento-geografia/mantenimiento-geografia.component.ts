import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router'; // Importado
import { GeografiaService } from '../../services/geografia.service';
import { AuthService } from '../../services/auth.service'; // Importado
import { Pais, Departamento, Ciudad } from '../../models/geografia.model';
import Swal from 'sweetalert2'; // Importado

@Component({
  selector: 'app-mantenimiento-geografia',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './mantenimiento-geografia.component.html',
  styleUrl: './mantenimiento-geografia.component.scss'
})
export class MantenimientoGeografiaComponent implements OnInit {
  private geoService = inject(GeografiaService);
  private authService = inject(AuthService);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  paises: Pais[] = [];
  departamentos: Departamento[] = [];
  ciudades: Ciudad[] = [];

  paisSeleccionado?: Pais;
  deptoSeleccionado?: Departamento;

  nombreNuevo: string = '';
  tipoNuevo: 'Pais' | 'Departamento' | 'Ciudad' = 'Pais';
  mostrarModal: boolean = false;

  ngOnInit() {
    // PUNTO 1: Validación de seguridad inmediata
    if (!this.authService.estaAutenticado()) {
      this.router.navigate(['/login']);
      return;
    }
    this.cargarPaises();
  }

  cerrarSesion() {
    this.authService.logout();
  }

  cargarPaises() {
    this.geoService.getPaises().subscribe({
      next: (res) => {
        this.paises = [...res];
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error al cargar países', err)
    });
  }

  // --- MÉTODOS DE SELECCIÓN ---
  seleccionarPais(pais: Pais) {
    this.paisSeleccionado = pais;
    this.deptoSeleccionado = undefined;
    this.departamentos = [];
    this.ciudades = [];
    this.geoService.getDeptosPorPais(pais.paisId).subscribe(res => {
      this.departamentos = [...res];
      this.cdr.detectChanges();
    });
  }

  seleccionarDepto(depto: Departamento) {
    this.deptoSeleccionado = depto;
    this.ciudades = [];
    this.geoService.getCiudadesPorDepto(depto.departamentoId).subscribe(res => {
      this.ciudades = [...res];
      this.cdr.detectChanges();
    });
  }

  // --- GUARDADO CON SWAL ---
  guardar() {
    const nombreLimpio = this.nombreNuevo.trim();
    if (!nombreLimpio) return;

    const postObserver = {
      next: () => {
        this.cerrarModal();
        Swal.fire('Guardado', `${this.tipoNuevo} creado con éxito`, 'success');
        if (this.tipoNuevo === 'Pais') this.cargarPaises();
        else if (this.tipoNuevo === 'Departamento') this.seleccionarPais(this.paisSeleccionado!);
        else if (this.tipoNuevo === 'Ciudad') this.seleccionarDepto(this.deptoSeleccionado!);
      }
    };

    if (this.tipoNuevo === 'Pais') this.geoService.crearPais(nombreLimpio).subscribe(postObserver);
    else if (this.tipoNuevo === 'Departamento' && this.paisSeleccionado) this.geoService.crearDepto(nombreLimpio, this.paisSeleccionado.paisId).subscribe(postObserver);
    else if (this.tipoNuevo === 'Ciudad' && this.deptoSeleccionado) this.geoService.crearCiudad(nombreLimpio, this.deptoSeleccionado.departamentoId).subscribe(postObserver);
  }

  // --- BORRADO CON SWAL2 (REEMPLAZA EL CONFIRM) ---
  borrarPais(p: Pais) {
    Swal.fire({
      title: `¿Eliminar ${p.nombre}?`,
      text: "Se borrarán todos los departamentos y ciudades vinculados.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, borrar todo'
    }).then((result) => {
      if (result.isConfirmed) {
        this.geoService.borrarPais(p.paisId).subscribe(() => {
          this.cargarPaises();
          this.paisSeleccionado = undefined;
          this.departamentos = [];
          this.ciudades = [];
          Swal.fire('Eliminado', 'El país ha sido borrado.', 'success');
          this.cdr.detectChanges();
        });
      }
    });
  }

  borrarDepto(d: Departamento) {
    Swal.fire({
      title: `¿Eliminar ${d.nombre}?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.geoService.borrarDepto(d.departamentoId).subscribe(() => {
          if (this.paisSeleccionado) this.seleccionarPais(this.paisSeleccionado);
          this.deptoSeleccionado = undefined;
          this.ciudades = [];
          Swal.fire('Eliminado', 'Departamento borrado.', 'success');
          this.cdr.detectChanges();
        });
      }
    });
  }

  borrarCiudad(c: Ciudad) {
    Swal.fire({
      title: `¿Eliminar ${c.nombre}?`,
      icon: 'warning',
      showCancelButton: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.geoService.borrarCiudad(c.ciudadId).subscribe(() => {
          if (this.deptoSeleccionado) this.seleccionarDepto(this.deptoSeleccionado);
          Swal.fire('Eliminado', 'Ciudad borrada.', 'success');
        });
      }
    });
  }

  abrirModal(tipo: 'Pais' | 'Departamento' | 'Ciudad') {
    this.tipoNuevo = tipo;
    this.nombreNuevo = '';
    this.mostrarModal = true;
    this.cdr.detectChanges();
  }

  cerrarModal() {
    this.mostrarModal = false;
    this.cdr.detectChanges();
  }
}
