import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.scss']
})
export class PedidoComponent implements OnInit {

  rnd: number;
  plazo: number;
  costo: number;
  unidadesPorLote: number;
  diaEntrega: number;

  constructor() {
    this.rnd = 0;
    this.plazo = 0;
    this.costo = 220;
    this.unidadesPorLote = 20;
    this.diaEntrega = 0;
  }

  calcularPedido(dia: number){
    this.rnd = this.getRNDPedido();
    this.plazo = this.getPlazo(this.rnd);
    this.diaEntrega = dia + this.plazo;
  }

  getRNDPedido():number{
    // var r = (Math.random() * 100);
    return Math.random();
  }

  getPlazo(rnd: number):number{
    /**
     * Los intervalos son 
     * 00 - 09  0
     * 10 - 29  1
     * 30 - 59  2
     * 60 - 89  3
     * 90 - 94  4
     * 95 - 99  5
     */
    if (rnd < 0.09)
      return 0;
    if (rnd < 0.29)
      return 1;
    if (rnd < 0.59)
      return 2;
    if (rnd < 0.89)
      return 3;
    if (rnd < 0.94){
      return 4;  
    }else{
      return 5;
    }
  }

  ngOnInit() {
  }

}
