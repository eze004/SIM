import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.scss']
})
export class ConfiguracionComponent implements OnInit {

  cantidadSemanas: number;
  semanaDesde: number;
  semanaHasta: number;
  diasMultiplo: number;

  constructor() {
    this.cantidadSemanas = 16;
    this.semanaDesde = 1;
    this.semanaHasta = 0;
    this.diasMultiplo = 1;
  }

  ngOnInit() {
  }

}
