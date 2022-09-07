import { Component,  OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { VentasService } from 'src/app/services/ventas.service';
import { ChartVentasService } from 'src/app/services/chart-ventas.service';
import { Subject } from 'rxjs';
//import { single } from './data';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styles: [
  ],
})

export class EstadisticasGlobalComponent implements OnInit {
  public loggedUser:any = null;

  public yearVentas!: number
  public cantidad!: Date;
  public totalVtasYearGeneral: string [] = [];
  public totalCantVtasYearGeneral: string [] = [];
  public totalCantTransacPorFormaPagoGral: any [] = [];
  public totCantTransacPorFpagoXTienda: any [] = [];
  public totVtasYearPorSucursal: string [] = []
 

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
  showDataLabels = true
  legendTitle="Referencia"

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
    public _chartVentasService: ChartVentasService,
  ) {
    var currentTime = new Date();
    this.yearVentas = currentTime.getFullYear()
    console.log(this.yearVentas);


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
    console.log(this.yearVentas)

   // this._chartVentasService.setDataTotalVentasPorTienda(this.totalVtasYearGeneral)
    this.totalVtasYearGeneral = [...this.totalVtasYearGeneral]

  // this._chartVentasService.setDataTotVtasYearPorTiendaPorSucursal(this.totVtasYearPorSucursal)
    this.totVtasYearPorSucursal = [...this.totVtasYearPorSucursal]

  //  this._chartVentasService.setDataTotalCantVentasYearGeneral(this.totalCantVtasYearGeneral)
    this.totalCantVtasYearGeneral = [...this.totalCantVtasYearGeneral]

  //  this._chartVentasService.setDataTotalTransacFormaDePagoGral(this.totalCantTransacPorFormaPagoGral)
    this.totalCantTransacPorFormaPagoGral = [...this.totalCantTransacPorFormaPagoGral]

  //  this._chartVentasService.setDataTotalTransacPorFpagoXTienda(this.totCantTransacPorFpagoXTienda)
    this.totCantTransacPorFpagoXTienda = [...this.totCantTransacPorFpagoXTienda]
    
    
    
    
  }

  updateData2(){
    console.log("2222222222222222" + this.yearVentas)
    const userId = this._authService.getDecodedAccessToken(String(this._authService.getToken())).id
    this.getVentasForStatistics1(userId)

  }
  

  getVentasForStatistics1 = async (userId:string) => {
    console.log("MENSAJE: Obteniendo VentasForStatistics para userId: " +userId + "year:" +this.yearVentas )
    this._ventasService.getVentasForStatistics1(userId, this.yearVentas)
    .subscribe({
      next: (v) => {
        this.totalVtasYearGeneral.splice(0, this.totalVtasYearGeneral.length);
        this.totVtasYearPorSucursal.splice(0, this.totVtasYearPorSucursal.length);
        this.totalCantVtasYearGeneral.splice(0, this.totalCantVtasYearGeneral.length);
        this.totalCantTransacPorFormaPagoGral.splice(0, this.totalCantTransacPorFormaPagoGral.length);
        this.totCantTransacPorFpagoXTienda.splice(0, this.totCantTransacPorFpagoXTienda.length);

        console.log("MENSAJE: ventas obtenidas exitosamente para userId: " +userId )
        console.log(v)
        this.datosForStatistic = v
        let objTotalVtasYearGeneral: any
        let objTotalCantVtasYearGeneral: any
        let objTotalCantTransacPorFormaPago: any
        let objTotCantTransacPorFpagoXTienda: any
        let objTotVtasYearPorSucursal: any
        let totalTransacEfectivo = 0
        let totalTransacTarjeta = 0
        let totalTransacMixto = 0
        

        let objSerie:any
        

        for (let i = 0; i < this.datosForStatistic.length; i++) {

          let serie: string [] = []
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
          //chart cant transacciones por forma de pago por tienda
          objSerie = {
            "name": "Efectivo",
            "value": this.datosForStatistic[i].cantVentasEfectivo
          }
          serie.push(objSerie)
          objSerie = {
            "name": "Tarjeta",
            "value": this.datosForStatistic[i].cantVentasTerjeta
          }
          serie.push(objSerie)
          objSerie = {
            "name": "Pago Mixto",
            "value": this.datosForStatistic[i].cantVtasPagoMixto
          }
          serie.push(objSerie)
          objTotCantTransacPorFpagoXTienda = {
            "name": this.datosForStatistic[i].tiendaName,
            "series": serie
          }
          this.totCantTransacPorFpagoXTienda.push(objTotCantTransacPorFpagoXTienda)
          
          //chart ventas por sucursal
          let serieTienda: string [] = []
                     
            objSerie = {
              "name": "Efectivo",
              "value": this.datosForStatistic[i].totalEfectivo
            }
            serieTienda.push(objSerie)
            objSerie = {
              "name": "Tarjeta",
              "value": this.datosForStatistic[i].totalTarjeta
            }
            serieTienda.push(objSerie)
          
          objTotVtasYearPorSucursal = {
            "name": this.datosForStatistic[i].tiendaName,
            "series": serieTienda
          }
          this.totVtasYearPorSucursal.push(objTotVtasYearPorSucursal)          
          
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
        

      },
      error: (e) => console.error(e),
      complete: () => {
        console.info('este es el complete') 
        this.updateData()
      }
    })
  }
}


