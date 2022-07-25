import { Component,  OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { VentasService } from 'src/app/services/ventas.service';
import { ChartVentasService } from 'src/app/services/chart-ventas.service';
//import { single } from './data';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styles: [
  ],
})

export class EstadisticasGlobalComponent implements OnInit {
  public loggedUser:any = null;

  public yearVentas: number = 2022
  public cantidad!: Date;
  public totalVtasYearGeneral: string [] = [];
  public totalCantVtasYearGeneral: string [] = [];
  public totalCantTransacPorFormaPagoGral: any [] = []

  public datosForStatistic!: any

  view: [number, number] = [600, 250];
  // options
  showXAxis = true;
  showYAxis = true;
  gradient = true;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Tiendas';
  showYAxisLabel = true;
  yAxisLabel = 'Ventas $';
  yAxisLabel1 = 'Transacciones';

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  view1: [number, number] = [600, 150];
  // options
  gradient1: boolean = true;
  showLegend1: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  colorScheme1 = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  view3: [number, number] = [600, 250];

  constructor(
    private _authService:AuthService,
    private _userService:UserService,
    private _ventasService:VentasService,
    private _chartVentasService: ChartVentasService,
  ) {
      
  }

  get totalVentasPorTienda(){
    return this._chartVentasService.totalVentasPorTienda
  }

  get totalCantVtasPorTienda(){
    return this._chartVentasService.totalCantVtasYearGeneral
  }

  get totalTransacFormaDePagoGral(){
    return this._chartVentasService.totalCantTransacPorFormaDePagoGral
  }

  onSelect(event: any) {
    console.log(event);    
  }
 
  ngOnInit(): void {
    if (this._authService.loggedIn()){
      console.log("MENSAJE: Decodificando access token...")
      const userId = this._authService.getDecodedAccessToken(String(this._authService.getToken())).id
      this.getVentasForStatistics1(userId)
    }  
  }

  updateData(){
    this._chartVentasService.setDataTotalVentasPorTienda(this.totalVtasYearGeneral)
    this._chartVentasService.setDataTotalCantVentasYearGeneral(this.totalCantVtasYearGeneral)
    this._chartVentasService.setDataTotalTransacFormaDePagoGral(this.totalCantTransacPorFormaPagoGral)

  }

  getVentasForStatistics1 = async (userId:string) => {
    console.log("MENSAJE: Obteniendo VentasForStatistics para userId: " +userId )
    this._ventasService.getVentasForStatistics1(userId)
    .subscribe({
      next: (v) => {
        console.log("MENSAJE: ventas obtenidas exitosamente para userId: " +userId )
        console.log(v)
        this.datosForStatistic = v
        let objTotalVtasYearGeneral: any
        let objTotalCantVtasYearGeneral: any
        let objTotalCantTransacPorFormaPago: any
        let totalTransacEfectivo = 0
        let totalTransacTarjeta = 0
        let totalTransacMixto = 0

        for (let i = 0; i < this.datosForStatistic.length; i++) {
          //chart total $ ventas por tienda
          objTotalVtasYearGeneral = {
            name: this.datosForStatistic[i].tiendaName,
            value: this.datosForStatistic[i].totalVentas
          }
          this.totalVtasYearGeneral.push(objTotalVtasYearGeneral)
          //chart cant transacciones por tienda
          objTotalCantVtasYearGeneral = {
            name: this.datosForStatistic[i].tiendaName,
            value: this.datosForStatistic[i].cantVentas
          }
          this.totalCantVtasYearGeneral.push(objTotalCantVtasYearGeneral)
          //chart cant transacciones por forma de pago
          totalTransacEfectivo += this.datosForStatistic[i].cantVentasEfectivo
          totalTransacTarjeta += this.datosForStatistic[i].cantVentasTerjeta
          totalTransacMixto += this.datosForStatistic[i].cantVtasPagoMixto

                   
          
        }
        //chart cant transacciones por forma de pago
        objTotalCantTransacPorFormaPago = {
          "name": "Efectivo",
          "value": totalTransacEfectivo
        }
        this.totalCantTransacPorFormaPagoGral.push(objTotalCantTransacPorFormaPago)
        objTotalCantTransacPorFormaPago = {
          "name": "Tarjeta",
          "value": totalTransacTarjeta
        },
        this.totalCantTransacPorFormaPagoGral.push(objTotalCantTransacPorFormaPago)
        objTotalCantTransacPorFormaPago = {
          "name": "Pago Mixto",
          "value": totalTransacMixto
        },
        this.totalCantTransacPorFormaPagoGral.push(objTotalCantTransacPorFormaPago)
        

        console.log("-------")
        console.log(this.totalCantVtasYearGeneral)
        

/*
  export var multi = [
    {
      "name": "Germany",
      "series": [
        {
          "name": "2010",
          "value": 7300000
        },
        {
          "name": "2011",
          "value": 8940000
        }
      ]
    },
*/

        

      },
      error: (e) => console.error(e),
      complete: () => {
        console.info('este es el complete') 
        this.updateData()
      }
    })
  }
}


