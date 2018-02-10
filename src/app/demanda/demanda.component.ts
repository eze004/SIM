import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-demanda',
  templateUrl: './demanda.component.html',
  styleUrls: ['./demanda.component.scss']
})
export class DemandaComponent implements OnInit {

  rnd: number;
  demanda: number;

  constructor() {
    this.rnd = 0;
    this.demanda = 0;
  }

  ngOnInit() {
  }

  calcularDemanda(){
    this.rnd = this.getRNDDemanda();
    this.demanda = this.getDemanda(this.rnd);
  }

  getRNDDemanda():number{
    // var r = Math.round((Math.random() * 100));
    return Math.random();
  }

  getDemanda(rnd: number):number{
    /**
     * Los intervalos son 
     * 00 - 04  0
     * 05 - 24  1
     * 25 - 64  2
     * 65 - 79  3
     * 80 - 89  4
     * 90 - 94  5
     * 95 - 99  6
     */
    if (rnd < 0.04)
      return 0;
    if (rnd < 0.24)
      return 1;
    if (rnd < 0.64)
      return 2;
    if (rnd < 0.79)
      return 3;
    if (rnd < 0.89)
      return 4;
    if (rnd < 0.94){
      return 5;  
    }else{
      return 6;
    }
  }

}
