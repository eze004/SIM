import { Component, ViewChild } from '@angular/core';
import { DemandaComponent } from './demanda/demanda.component';
import { PedidoComponent } from './pedido/pedido.component';
import { StockComponent } from './stock/stock.component';
import { ConfiguracionComponent } from './configuracion/configuracion.component';
import { SimulacionComponent } from './simulacion/simulacion.component';
import { MatPaginator, MatTableDataSource } from '@angular/material';


@Component({
  selector: 'mdb-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']

})

export class AppComponent {
  demanda: DemandaComponent = new DemandaComponent();
  pedido: PedidoComponent = new PedidoComponent();
  stock: StockComponent = new StockComponent();
  configuracion: ConfiguracionComponent = new ConfiguracionComponent();
  simulacion: SimulacionComponent = new SimulacionComponent();

  pedidoPrimerDia: boolean = true;

  resultados: any[] = [];
  menorCostoPorDia: number = 0;
  mayorCostoPorDia: number = 0;

  dataSource = null;
  // dataSource = new MatTableDataSource(ELEMENT_DATA);
  columnasAMostrar = ['dia', 'stockInicial', 'rndDemanda', 'demanda',
    'rndPedido', 'plazoPedido', 'llegadaPedido', 'stockFinal', 'costoStock',
    'diasAgotamiento', 'costoAgotamiento', 'costoTotal', 'costoSumatoria'];
  // paginator: MatPaginator = new MatPaginator();
  @ViewChild(MatPaginator) paginator: MatPaginator;

  /**
   * Set the paginator after the view init since this component will
   * be able to query its view for the initialized paginator.
   */
  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
  }

  simular(){
    this.dataSource = null;
    this.simulacion = new SimulacionComponent();
    this.simulacion.cantidadDias = this.configuracion.cantidadSemanas * 7;
    var hastaLaSemana = this.configuracion.semanaHasta;
    if(this.configuracion.semanaHasta == 0)
      hastaLaSemana = this.configuracion.cantidadSemanas;
    
    var stockInicial = this.stock.inicial;
    this.stock.diasAgotamiento = -1;
    this.pedido.diaEntrega = 0;
    this.pedido.plazo = 0;

    var vectorEstado: any[];
    var costoSumatoria = 0;
    var costoTotal = 0;
    var semana = 1;
    var ultimoVectorEstado = null;

    for(var dia = 1; dia <= this.simulacion.cantidadDias; dia++){
      vectorEstado = new Array();
      costoTotal = 0;

      vectorEstado.push(dia);

      if(dia == this.pedido.diaEntrega){
        stockInicial += this.pedido.unidadesPorLote;
        this.stock.diasAgotamiento = -1;
        this.pedido.diaEntrega = 0;
        this.pedido.plazo = 0;
      }

      vectorEstado.push(stockInicial);

      this.demanda.calcularDemanda();
      vectorEstado.push(this.demanda.rnd);
      vectorEstado.push(this.demanda.demanda);

      if (stockInicial > this.demanda.demanda) {
        this.stock.actual = stockInicial - this.demanda.demanda;
        stockInicial = this.stock.actual;
      } else {
        this.stock.actual = 0;
        stockInicial = 0;
        // this.stock.diasAgotamiento++;
      }
      if(this.stock.actual <= this.stock.minimo && this.stock.diasAgotamiento == -1)
        this.stock.diasAgotamiento++;
      
      if (this.stock.diasAgotamiento == 0 || (this.pedidoPrimerDia && dia == 1)) {
        this.pedido.calcularPedido(dia);
        vectorEstado.push(this.pedido.rnd);
        vectorEstado.push(this.pedido.plazo);
        vectorEstado.push(this.pedido.diaEntrega);
        vectorEstado.push(this.pedido.costo);
        costoTotal += this.pedido.costo;
        
        if(dia == this.pedido.diaEntrega){
          this.stock.actual += this.pedido.unidadesPorLote;
          stockInicial = this.stock.actual;
          this.stock.diasAgotamiento = -1;
          this.pedido.diaEntrega = 0;
          this.pedido.plazo = 0;
        }
      } else {
        vectorEstado.push('');
        vectorEstado.push('');

        // if(this.pedido.plazo > 0)
        //   this.pedido.plazo = this.pedido.plazo - 1;
        // if(this.pedido.plazo > 0) {
        //   vectorEstado.push('');
        // } else {
        //   vectorEstado.push(this.pedido.plazo);
        // }

        if(this.pedido.diaEntrega == 0) {
          vectorEstado.push('');
        } else {
          vectorEstado.push(this.pedido.diaEntrega);
        }
        // this.pedido.diaEntrega == 0 ? vectorEstado.push('') : vectorEstado.push(this.pedido.diaEntrega);
        vectorEstado.push('');
      }


      vectorEstado.push(this.stock.actual);
      vectorEstado.push(this.stock.getCostoTotalInventario());
      costoTotal += this.stock.getCostoTotalInventario();

      if (this.stock.diasAgotamiento >= 0) {
        vectorEstado.push(this.stock.diasAgotamiento);
        if (this.stock.diasAgotamiento <= 7) {
          vectorEstado.push('');
        } else{
          vectorEstado.push(this.stock.getCostoTotalAgotamiento(this.demanda.demanda));
          costoTotal += this.stock.getCostoTotalAgotamiento(this.demanda.demanda);
        }
        this.stock.diasAgotamiento++;
      } else {
        vectorEstado.push(this.stock.diasAgotamiento == 0 ? 0 : '');
        vectorEstado.push('');
      }

      costoSumatoria += costoTotal;
      vectorEstado.push(costoTotal);
      vectorEstado.push(costoSumatoria);

      
      ultimoVectorEstado = vectorEstado;
      if(semana >= this.configuracion.semanaDesde
        && semana <= hastaLaSemana
        && dia % this.configuracion.diasMultiplo == 0)
        this.simulacion.agregarVectorEstado(ultimoVectorEstado);
        
      //logica para incluir en la vista
      if(dia % 7 == 0)
        semana++;
    }
    this.dataSource = new MatTableDataSource(this.simulacion.vectorEstado);
    this.dataSource.paginator = this.paginator;
    // alert('Ha finalizado la simulacion, se estara imprimiendo en la pantalla: ' + (fechaFinal.getTime() - fechaInicial.getTime()));
    // this.resultados.push(this.simulacion.vectorEstado[this.simulacion.vectorEstado.length - 1]);
    this.calcularResultados(ultimoVectorEstado);
    document.getElementById('btnResultado').click();
  }

  calcularResultados(vEstado: any[]){
    var resultado = [];
    var cantDias = vEstado[0];
    var cantSemanas = vEstado[0] / 7;
    var costoFinal = vEstado[vEstado.length - 1];

    resultado.push(cantSemanas); //Cantidad de Semanas
    resultado.push(cantDias); //Cantidad de Dias
    resultado.push(this.stock.costoInventario);
    resultado.push(this.stock.costoAgotamiento);
    resultado.push(this.stock.inicial);
    resultado.push(this.pedido.costo);
    resultado.push(this.pedido.unidadesPorLote);
    resultado.push(this.stock.minimo);
    resultado.push(costoFinal);
    resultado.push(costoFinal / cantSemanas);
    resultado.push(costoFinal / cantDias);

    this.resultados.push(resultado);

    var costoSumatoriaIndex = 8;
    if(this.resultados.length == 1){
      this.menorCostoPorDia = this.resultados[0][costoSumatoriaIndex] / this.resultados[0][1];
    } else {
      // this.menorCostoPorDia = this.resultados[0][costoSumatoriaIndex];
      this.resultados.forEach(sim => {
        var mencpd = sim[costoSumatoriaIndex] / sim[1]
        if(mencpd < this.menorCostoPorDia)
          this.menorCostoPorDia = mencpd;
      });

      this.mayorCostoPorDia = 0;
      this.resultados.forEach(sim => {
        var maycpd = sim[costoSumatoriaIndex] / sim[1]
        if(maycpd > this.mayorCostoPorDia)
          this.mayorCostoPorDia = maycpd;
      });
    }
  }

  onLoad(){
    alert('En onLoad');
  }

  checkInputs(){
    if(this.stock.costoInventario == null || this.stock.costoInventario <= 0)
      this.stock.costoInventario = 0;
    if(this.stock.costoAgotamiento == null || this.stock.costoAgotamiento <= 0)
      this.stock.costoAgotamiento = 0;
    if(this.stock.inicial == null || this.stock.inicial <= 0)
      this.stock.inicial = 0;
    if(this.stock.minimo == null || this.stock.minimo <= 0)
      this.stock.minimo = 0;

    if(this.pedido.costo == null || this.pedido.costo <= 0)
      this.pedido.costo = 1;
    if(this.pedido.unidadesPorLote == null || this.pedido.unidadesPorLote <= 0)
      this.pedido.unidadesPorLote = 1;

    if(this.configuracion.cantidadSemanas == null || this.configuracion.cantidadSemanas <= 0)
      this.configuracion.cantidadSemanas = 1;
    if(this.configuracion.semanaDesde == null || this.configuracion.semanaDesde <= 0)
      this.configuracion.semanaDesde = 1;
    if(this.configuracion.semanaDesde > this.configuracion.cantidadSemanas)
      this.configuracion.semanaDesde = this.configuracion.cantidadSemanas;
    
    if(this.configuracion.semanaHasta == null || this.configuracion.semanaHasta <= 0)
      this.configuracion.semanaHasta = 0;
    if(this.configuracion.semanaHasta > this.configuracion.cantidadSemanas)
      this.configuracion.semanaHasta = this.configuracion.cantidadSemanas;
    
    if(this.configuracion.diasMultiplo == null || this.configuracion.diasMultiplo <= 0)
      this.configuracion.diasMultiplo = 1;
  }

  reiniciarValores(){
    this.demanda = new DemandaComponent();
    this.pedido = new PedidoComponent();
    this.stock = new StockComponent();
    this.configuracion = new ConfiguracionComponent();
    this.simulacion = new SimulacionComponent();
    this.dataSource = null;
    // this.dataSource.paginator = this.paginator;
    this.resultados = [];
    this.menorCostoPorDia = 0;
    this.mayorCostoPorDia = 0;

    this.pedidoPrimerDia = true;
    this.pedido.diaEntrega = 0;
  }
}
