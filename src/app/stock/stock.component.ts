import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss']
})
export class StockComponent implements OnInit {

  costoInventario: number;
  costoAgotamiento: number;
  diasAgotamiento: number;
  inicial: number;
  actual: number;
  minimo: number;

  constructor() {
    this.costoInventario = 12;
    this.costoAgotamiento = 20;
    this.diasAgotamiento = -1;
    this.inicial = 12;
    this.actual = 12;
    this.minimo = 0;
  }

  getCostoTotalInventario(): number{
    return this.actual * this.costoInventario;
  }

  getCostoTotalAgotamiento(demanda: number): number{
    return this.costoAgotamiento * demanda;
  }

  ngOnInit() {
  }

}
