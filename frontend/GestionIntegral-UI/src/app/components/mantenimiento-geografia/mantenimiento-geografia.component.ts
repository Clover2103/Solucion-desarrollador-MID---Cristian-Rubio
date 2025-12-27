import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Importante para el input
import { GeografiaService } from '../../services/geografia.service';
import { Pais, Departamento, Ciudad } from '../../models/geografia.model';

@Component({
  selector: 'app-mantenimiento-geografia',
  standalone: true,
  imports: [CommonModule, FormsModule], // Añadido FormsModule
  templateUrl: './mantenimiento-geografia.component.html',
  styleUrl: './mantenimiento-geografia.component.scss'
})
export class MantenimientoGeografiaComponent implements OnInit {
  private geoService = inject(GeografiaService);

  paises: Pais[] = [];
  departamentos: Departamento[] = [];
  ciudades: Ciudad[] = [];

  paisSeleccionado: any = null;
  deptoSeleccionado: any = null;

  // Variables para el Modal Moderno
  nombreNuevo: string = '';
  tipoNuevo: 'Pais' | 'Departamento' | 'Ciudad' = 'Pais';
  mostrarModal: boolean = false;

  ngOnInit() {
    this.cargarPaises();
  }

  // --- LÓGICA DE MODAL ---
  abrirModal(tipo: 'Pais' | 'Departamento' | 'Ciudad') {
    this.tipoNuevo = tipo;
    this.nombreNuevo = '';
    this.mostrarModal = true;
  }

  cerrarModal() {
    this.mostrarModal = false;
  }

  guardar() {
    if (!this.nombreNuevo.trim()) return;

    if (this.tipoNuevo === 'Pais') {
      this.geoService.crearPais(this.nombreNuevo).subscribe(() => {
        this.cargarPaises();
        this.cerrarModal();
      });
    } else if (this.tipoNuevo === 'Departamento' && this.paisSeleccionado) {
      this.geoService.crearDepto(this.nombreNuevo, this.paisSeleccionado.paisId).subscribe(() => {
        this.seleccionarPais(this.paisSeleccionado);
        this.cerrarModal();
      });
    } else if (this.tipoNuevo === 'Ciudad' && this.deptoSeleccionado) {
      this.geoService.crearCiudad(this.nombreNuevo, this.deptoSeleccionado.departamentoId).subscribe(() => {
        this.seleccionarDepto(this.deptoSeleccionado);
        this.cerrarModal();
      });
    }
  }

  // --- CARGA Y SELECCIÓN ---
  cargarPaises() {
    this.geoService.getPaises().subscribe(res => this.paises = res);
  }

  seleccionarPais(pais: Pais) {
    this.paisSeleccionado = pais;
    this.deptoSeleccionado = null;
    this.ciudades = [];
    this.geoService.getDeptosPorPais(pais.paisId).subscribe(res => this.departamentos = res);
  }

  seleccionarDepto(depto: Departamento) {
    this.deptoSeleccionado = depto;
    this.geoService.getCiudadesPorDepto(depto.departamentoId).subscribe(res => this.ciudades = res);
  }

  // --- BORRADO ---
  borrarPais(id: number) {
    if (confirm('¿Eliminar país y todo su contenido?')) {
      this.geoService.borrarPais(id).subscribe(() => {
        this.cargarPaises();
        this.paisSeleccionado = null;
        this.departamentos = [];
      });
    }
  }

  borrarDepto(id: number) {
    if (confirm('¿Eliminar departamento?')) {
      this.geoService.borrarDepto(id).subscribe(() => {
        this.seleccionarPais(this.paisSeleccionado);
      });
    }
  }

  borrarCiudad(id: number) {
    if (confirm('¿Eliminar ciudad?')) {
      this.geoService.borrarCiudad(id).subscribe(() => {
        this.seleccionarDepto(this.deptoSeleccionado);
      });
    }
  }
}
