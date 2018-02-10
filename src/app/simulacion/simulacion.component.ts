import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-simulacion',
  templateUrl: './simulacion.component.html',
  styleUrls: ['./simulacion.component.scss']
})
export class SimulacionComponent implements OnInit {

  semana: number;
  dia: number;
  cantidadDias: number;
  vectorEstado: any[];

  constructor() {
    this.semana = 1;
    this.dia = 1;
    this.cantidadDias = 0;
    this.vectorEstado = [];
  }

  agregarVectorEstado(v: any[]){
    this.vectorEstado.push(v);
  }

  ngOnInit() {
  }

}
