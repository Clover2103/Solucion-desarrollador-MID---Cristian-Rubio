export interface Pais {
  paisId: number;
  nombre: string;
}

export interface Departamento {
  departamentoId: number;
  nombre: string;
  paisId: number;
}

export interface Ciudad {
  ciudadId: number;
  nombre: string;
  departamentoId: number;
}