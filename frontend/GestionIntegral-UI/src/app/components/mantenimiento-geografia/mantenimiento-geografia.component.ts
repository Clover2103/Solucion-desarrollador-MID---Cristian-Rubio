import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { GeografiaService } from '../../services/geografia.service';
import { AuthService } from '../../services/auth.service';
import { Pais, Departamento, Ciudad } from '../../models/geografia.model';
import Swal from 'sweetalert2';

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

  // Variables para creación y edición
  nombreNuevo: string = '';
  tipoNuevo: 'Pais' | 'Departamento' | 'Ciudad' = 'Pais';
  mostrarModal: boolean = false;
  isEditando: boolean = false;
  idEdicion?: number;

  cargando: boolean = false;

  ngOnInit() {
    if (!this.authService.estaAutenticado()) {
      this.router.navigate(['/login']);
      return;
    }
    this.cargarPaises();
  }

  // --- SESIÓN ---
  cerrarSesion() {
    Swal.fire({
      title: '¿Cerrar sesión?',
      text: "Se finalizará su sesión actual.",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#8B0000',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Sí, salir'
    }).then((result) => {
      if (result.isConfirmed) {
        this.authService.logout();
        Swal.fire({ icon: 'info', title: 'Sesión Cerrada', showConfirmButton: false, timer: 1000 });
      }
    });
  }

  // --- CARGA DE DATOS ---
  cargarPaises() {
    this.geoService.getPaises().subscribe({
      next: (res) => {
        this.paises = [...res];
        this.cdr.detectChanges();
      },
      error: (err) => {
        if (err.status === 401) this.authService.logout();
      }
    });
  }

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

  // --- OPERACIONES CRUD ---
  guardar() {
    const nombreLimpio = this.nombreNuevo.trim();
    if (!nombreLimpio) {
      Swal.fire('Atención', 'El nombre no puede estar vacío', 'warning');
      return;
    }

    if (this.cargando) return;
    this.cargando = true;

    const observer = {
      next: () => {
        this.cargando = false;
        this.cerrarModal();
        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'success',
          title: this.isEditando ? 'Registro actualizado' : 'Registro creado',
          showConfirmButton: false,
          timer: 2500
        });
        this.refrescarListas();
      },
      error: (err: any) => {
        this.cargando = false;
        console.error("Error en operación:", err);
        Swal.fire('Error', 'No se pudo completar la operación. Verifique la consola.', 'error');
      }
    };

    if (this.isEditando && this.idEdicion) {
      // --- UPDATE (PUT) ---
      if (this.tipoNuevo === 'Pais') {
        this.geoService.actualizarPais(this.idEdicion, nombreLimpio).subscribe(observer);
      }
      else if (this.tipoNuevo === 'Departamento' && this.paisSeleccionado) {
        // CORRECCIÓN: idEdicion ahora garantiza ser el ID del departamento
        this.geoService.actualizarDepto(this.idEdicion, nombreLimpio, this.paisSeleccionado.paisId).subscribe(observer);
      }
      else if (this.tipoNuevo === 'Ciudad' && this.deptoSeleccionado) {
        this.geoService.actualizarCiudad(this.idEdicion, nombreLimpio, this.deptoSeleccionado.departamentoId).subscribe(observer);
      }
    } else {
      // --- CREATE (POST) ---
      if (this.tipoNuevo === 'Pais') {
        this.geoService.crearPais(nombreLimpio).subscribe(observer);
      } else if (this.tipoNuevo === 'Departamento' && this.paisSeleccionado) {
        this.geoService.crearDepto(nombreLimpio, this.paisSeleccionado.paisId).subscribe(observer);
      } else if (this.tipoNuevo === 'Ciudad' && this.deptoSeleccionado) {
        this.geoService.crearCiudad(nombreLimpio, this.deptoSeleccionado.departamentoId).subscribe(observer);
      }
    }
  }

  private refrescarListas() {
    if (this.tipoNuevo === 'Pais') this.cargarPaises();
    else if (this.tipoNuevo === 'Departamento' && this.paisSeleccionado) this.seleccionarPais(this.paisSeleccionado);
    else if (this.tipoNuevo === 'Ciudad' && this.deptoSeleccionado) this.seleccionarDepto(this.deptoSeleccionado);
  }

  // --- BORRADO ---
  borrarPais(p: Pais) {
    Swal.fire({
      title: `¿Eliminar ${p.nombre}?`,
      text: "Se borrarán departamentos y ciudades asociados.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      confirmButtonText: 'Sí, borrar todo'
    }).then((result) => {
      if (result.isConfirmed) {
        this.geoService.borrarPais(p.paisId).subscribe(() => {
          this.cargarPaises();
          this.paisSeleccionado = undefined;
          this.departamentos = [];
          this.ciudades = [];
          Swal.fire('Eliminado', 'El país ha sido borrado.', 'success');
        });
      }
    });
  }

  borrarDepto(d: Departamento) {
    Swal.fire({
      title: `¿Eliminar ${d.nombre}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33'
    }).then((result) => {
      if (result.isConfirmed) {
        this.geoService.borrarDepto(d.departamentoId).subscribe(() => {
          if (this.paisSeleccionado) this.seleccionarPais(this.paisSeleccionado);
          this.deptoSeleccionado = undefined;
          this.ciudades = [];
          Swal.fire('Eliminado', 'Departamento eliminado.', 'success');
        });
      }
    });
  }

  borrarCiudad(c: Ciudad) {
    Swal.fire({ title: `¿Eliminar ${c.nombre}?`, icon: 'warning', showCancelButton: true, confirmButtonColor: '#d33' }).then((result) => {
      if (result.isConfirmed) {
        this.geoService.borrarCiudad(c.ciudadId).subscribe(() => {
          if (this.deptoSeleccionado) this.seleccionarDepto(this.deptoSeleccionado);
          Swal.fire('Eliminado', 'Ciudad eliminada.', 'success');
        });
      }
    });
  }

  // --- MODALES (CORREGIDO) ---
  abrirModal(tipo: 'Pais' | 'Departamento' | 'Ciudad', item?: any) {
    this.tipoNuevo = tipo;
    this.mostrarModal = true;
    this.cargando = false;

    if (item) {
      this.isEditando = true;
      this.nombreNuevo = item.nombre;

      // Lógica de asignación de ID explícita para evitar confusiones
      if (tipo === 'Pais') this.idEdicion = item.paisId;
      if (tipo === 'Departamento') this.idEdicion = item.departamentoId;
      if (tipo === 'Ciudad') this.idEdicion = item.ciudadId;

      console.log(`Editando ${tipo} con ID:`, this.idEdicion);
    } else {
      this.isEditando = false;
      this.nombreNuevo = '';
      this.idEdicion = undefined;
    }
    this.cdr.detectChanges();
  }

  cerrarModal() {
    this.mostrarModal = false;
    this.isEditando = false;
    this.nombreNuevo = '';
    this.idEdicion = undefined;
    this.cargando = false;
    this.cdr.detectChanges();
  }
}
