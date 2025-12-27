import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GeografiaService } from '../../services/geografia.service';
import { Pais, Departamento, Ciudad } from '../../models/geografia.model';

@Component({
  selector: 'app-mantenimiento-geografia',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './mantenimiento-geografia.component.html',
  styleUrl: './mantenimiento-geografia.component.scss'
})
export class MantenimientoGeografiaComponent implements OnInit {
  private geoService = inject(GeografiaService);
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
    this.cargarPaises();
  }

  formatearTexto(texto: string): string {
    if (!texto) return '';
    return texto.toLowerCase().split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
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

  guardar() {
    const nombreLimpio = this.formatearTexto(this.nombreNuevo.trim());
    if (!nombreLimpio) return;

    const postObserver = {
      next: () => {
        this.cerrarModal();
        if (this.tipoNuevo === 'Pais') this.cargarPaises();
        else if (this.tipoNuevo === 'Departamento') this.seleccionarPais(this.paisSeleccionado!);
        else if (this.tipoNuevo === 'Ciudad') this.seleccionarDepto(this.deptoSeleccionado!);
      }
    };

    if (this.tipoNuevo === 'Pais') this.geoService.crearPais(nombreLimpio).subscribe(postObserver);
    else if (this.tipoNuevo === 'Departamento' && this.paisSeleccionado) this.geoService.crearDepto(nombreLimpio, this.paisSeleccionado.paisId).subscribe(postObserver);
    else if (this.tipoNuevo === 'Ciudad' && this.deptoSeleccionado) this.geoService.crearCiudad(nombreLimpio, this.deptoSeleccionado.departamentoId).subscribe(postObserver);
  }

  // --- BORRADO CON LÓGICA DE CASCADA ---
  borrarPais(p: Pais) {
    const confirmacion = confirm(`¿Estás seguro de eliminar el país "${p.nombre}"? ATENCIÓN: Se borrarán todos los departamentos y ciudades vinculados.`);
    if (confirmacion) {
      this.geoService.borrarPais(p.paisId).subscribe({
        next: () => {
          this.cargarPaises();
          this.paisSeleccionado = undefined;
          this.departamentos = [];
          this.ciudades = [];
          this.cdr.detectChanges();
        },
        error: (err) => alert("Error: No se pudo borrar en cascada. Verifique la configuración del servidor.")
      });
    }
  }

  borrarDepto(d: Departamento) {
    const confirmacion = confirm(`¿Eliminar el departamento "${d.nombre}"? También se borrarán sus ciudades.`);
    if (confirmacion) {
      this.geoService.borrarDepto(d.departamentoId).subscribe(() => {
        if (this.paisSeleccionado) this.seleccionarPais(this.paisSeleccionado);
        this.deptoSeleccionado = undefined;
        this.ciudades = [];
        this.cdr.detectChanges();
      });
    }
  }

  borrarCiudad(c: Ciudad) {
    if (confirm(`¿Eliminar la ciudad "${c.nombre}"?`)) {
      this.geoService.borrarCiudad(c.ciudadId).subscribe(() => {
        if (this.deptoSeleccionado) this.seleccionarDepto(this.deptoSeleccionado);
      });
    }
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
