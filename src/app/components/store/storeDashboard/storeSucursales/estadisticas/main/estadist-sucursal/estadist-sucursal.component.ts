import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LegendPosition } from '@swimlane/ngx-charts';
import { AuthService } from 'src/app/services/auth.service';
import { VentasService } from 'src/app/services/ventas.service';

@Component({
  selector: 'app-estadist-sucursal',
  templateUrl: './estadist-sucursal.component.html',
  styleUrls: ['./estadist-sucursal.component.css']
})
export class EstadistSucursalComponent implements OnInit {
  public yearVentas!: number
  public branchId!: string;
  public datosForStatistic!: any
  public totalVtasPorMesGeneral: string [] = [];
  public totalVtasPorMesGeneralFTyTJ: string [] = [];
  public totalTransacPorMesGeneral: string [] = [];
  public totalTransacPorMesGeneralFTyTJ: string [] = [];
  public totalVentasPorVendedorAnual: string [] = [];
  public totalVentasPorVendedorMensual: any [] = [];
  public totalTransacPorVendedorAnual: string [] = [];
  public totalTransacPorVendedorMensual: any [] = [];
  public totalProdMasVendidosAnual: any [] = [];
  public totalProdMasVendidosAnualFull: any [] = [];
  public totalProdMasVendidosMensual: any [] = [];
  public totalProdMasVendidosMensualFull: any [] = [];
  public totalProdMasVendidos$Mensual: any [] = [];
  
  


  view: [number, number] = [1000, 250];
  view2: [number, number] = [1000, 500];
  // options
  showXAxis = true;
  showXAxisFalse = false;
  showYAxis = true;
  gradient = true;
  showLegend = true;
  showLegendFalse = false;
  showXAxisLabel = false;
  xAxisLabel = 'Mes';
  showYAxisLabel = true;
  yAxisLabel = 'Ventas $';
  yAxisLabel1 = 'Transacciones';
  yAxisLabel2 = 'Cant Vendidos';
  showDataLabels = true
  legendTitle="Referencia"
  below = LegendPosition.Below
  

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };
  

  constructor(
    private _route: ActivatedRoute,
    private _authService:AuthService,
    private _ventasService:VentasService,
  ) { 
    var currentTime = new Date();
    this.yearVentas = currentTime.getFullYear()
    console.log(this.yearVentas);
  }

  ngOnInit(): void {
    this._route.params.subscribe(
      params => {
        this.branchId = params['id']
        if (this._authService.loggedIn()){
          console.log("MENSAJE: Decodificando access token...")
          const userId = this._authService.getDecodedAccessToken(String(this._authService.getToken())).id
          this.getVentasForStatisticsPorSucursal(userId)
        }  
      }
    )
    
  }

  updateData(){
    this.totalVtasPorMesGeneral = [...this.totalVtasPorMesGeneral]
    this.totalVtasPorMesGeneralFTyTJ = [...this.totalVtasPorMesGeneralFTyTJ]
    this.totalTransacPorMesGeneral = [...this.totalTransacPorMesGeneral]
    this.totalTransacPorMesGeneralFTyTJ = [...this.totalTransacPorMesGeneralFTyTJ]
    this.totalVentasPorVendedorAnual = [...this.totalVentasPorVendedorAnual]
    this.totalVentasPorVendedorMensual = [...this.totalVentasPorVendedorMensual]
    this.totalTransacPorVendedorAnual = [...this.totalTransacPorVendedorAnual]
    this.totalTransacPorVendedorMensual = [...this.totalTransacPorVendedorMensual]
    this.totalProdMasVendidosAnual = [...this.totalProdMasVendidosAnual]
    this.totalProdMasVendidosMensual = [...this.totalProdMasVendidosMensual]
    this.totalProdMasVendidos$Mensual = [...this.totalProdMasVendidos$Mensual]
    
    
    
    
  }
  updateData2(){
    const userId = this._authService.getDecodedAccessToken(String(this._authService.getToken())).id
    this.getVentasForStatisticsPorSucursal(userId)
  }
  onSelect(event: any) {
    console.log(event);    
  }
  getVentasForStatisticsPorSucursal = async (userId:string) => {
    console.log("MENSAJE: Obteniendo VentasForStatistics para userId: " +userId + "year:" +this.yearVentas )
    this._ventasService.getVentasForStatisticsPorSucursal(userId, this.branchId, this.yearVentas)
    .subscribe({
      next: (v) => {
        this.totalVtasPorMesGeneral.splice(0, this.totalVtasPorMesGeneral.length);
        this.totalVtasPorMesGeneralFTyTJ.splice(0, this.totalVtasPorMesGeneralFTyTJ.length);
        this.totalTransacPorMesGeneral.splice(0, this.totalTransacPorMesGeneral.length);
        this.totalTransacPorMesGeneralFTyTJ.splice(0, this.totalTransacPorMesGeneralFTyTJ.length);
        this.totalVentasPorVendedorAnual.splice(0,this.totalVentasPorVendedorAnual.length)
        this.totalVentasPorVendedorMensual.splice(0,this.totalVentasPorVendedorMensual.length)        
        this.totalTransacPorVendedorAnual.splice(0,this.totalTransacPorVendedorAnual.length)
        this.totalTransacPorVendedorMensual.splice(0,this.totalTransacPorVendedorMensual.length)
        this.totalProdMasVendidosAnual.splice(0,this.totalProdMasVendidosAnual.length)
        this.totalProdMasVendidosMensual.splice(0,this.totalProdMasVendidosMensual.length)
        this.totalProdMasVendidos$Mensual.splice(0,this.totalProdMasVendidos$Mensual.length)
        

        console.log("MENSAJE: ventas obtenidas exitosamente para userId: " +userId+ ". branchId: " + this.branchId+ ". Año: " + this.yearVentas)
        console.log(v)
        this.datosForStatistic = v

        //VENTAS POR MES GENERAL
        let objVetasPorMesGeneral: any
        for (let mes = 1; mes <= 12; mes++) {
          let mesNombre=""
          let totVentas=0
          switch (mes) {
            case 1:                                       
                mesNombre="Enero"
                totVentas=this.datosForStatistic.totVtas01
                break;
            case 2:
                mesNombre="Febrero"
                totVentas=this.datosForStatistic.totVtas02
                break;                        
            case 3:
                mesNombre="Marzo"
                totVentas=this.datosForStatistic.totVtas03
                break;
            case 4:
                mesNombre="Abril"
                totVentas=this.datosForStatistic.totVtas04
                break;
            case 5:
                mesNombre="Mayo"
                totVentas=this.datosForStatistic.totVtas05
                break;
            case 6:
                mesNombre="Junio"
                totVentas=this.datosForStatistic.totVtas06
                break;
            case 7:
                mesNombre="Julio"
                totVentas=this.datosForStatistic.totVtas07
                break;
            case 8:
                mesNombre="Agosto"
                totVentas=this.datosForStatistic.totVtas08
                break;                        
            case 9:
                mesNombre="Septiembre"
                totVentas=this.datosForStatistic.totVtas09
                break;
            case 10:
                mesNombre="Octubre"
                totVentas=this.datosForStatistic.totVtas10
                break;
            case 11:
                mesNombre="Noviembre"
                totVentas=this.datosForStatistic.totVtas11
                break;
            case 12:
                mesNombre="Diciembre"
                totVentas=this.datosForStatistic.totVtas12
                break;

          }
          objVetasPorMesGeneral = {
            name: mesNombre,
            value: totVentas
          }
          this.totalVtasPorMesGeneral.push(objVetasPorMesGeneral)          
        }

        //VENTAS POR MES GENERAL en EFECTIVO/TARJETA
        let objVetasPorMesGeneralFTyTJ: any
        for (let mes = 1; mes <= 12; mes++) {
          let mesNombre=""
          let totVentasFT=0
          let totVentasTJ=0      
          switch (mes) {
            case 1:                                       
                mesNombre="Enero"
                totVentasFT=this.datosForStatistic.totVtasFt01
                totVentasTJ=this.datosForStatistic.totVtasTj01
                break;
            case 2:
                mesNombre="Febrero"
                totVentasFT=this.datosForStatistic.totVtasFt02
                totVentasTJ=this.datosForStatistic.totVtasTj02
                break;                        
            case 3:
                mesNombre="Marzo"
                totVentasFT=this.datosForStatistic.totVtasFt03
                totVentasTJ=this.datosForStatistic.totVtasTj03
                break;
            case 4:
                mesNombre="Abril"
                totVentasFT=this.datosForStatistic.totVtasFt04
                totVentasTJ=this.datosForStatistic.totVtasTj04
                break;
            case 5:
                mesNombre="Mayo"
                totVentasFT=this.datosForStatistic.totVtasFt05
                totVentasTJ=this.datosForStatistic.totVtasTj05
                break;
            case 6:
                mesNombre="Junio"
                totVentasFT=this.datosForStatistic.totVtasFt06
                totVentasTJ=this.datosForStatistic.totVtasTj06
                break;
            case 7:
                mesNombre="Julio"
                totVentasFT=this.datosForStatistic.totVtasFt07
                totVentasTJ=this.datosForStatistic.totVtasTj07              
                break;
            case 8:
                mesNombre="Agosto"
                totVentasFT=this.datosForStatistic.totVtasFt08
                totVentasTJ=this.datosForStatistic.totVtasTj08
                break;                        
            case 9:
                mesNombre="Septiembre"
                totVentasFT=this.datosForStatistic.totVtasFt09
                totVentasTJ=this.datosForStatistic.totVtasTj09
                break;
            case 10:
                mesNombre="Octubre"
                totVentasFT=this.datosForStatistic.totVtasFt10
                totVentasTJ=this.datosForStatistic.totVtasTj10
                break;
            case 11:
                mesNombre="Noviembre"
                totVentasFT=this.datosForStatistic.totVtasFt11
                totVentasTJ=this.datosForStatistic.totVtasTj11
                break;
            case 12:
                mesNombre="Diciembre"
                totVentasFT=this.datosForStatistic.totVtasFt12
                totVentasTJ=this.datosForStatistic.totVtasTj12
                break;

          }
          let seriesFT = {
            "name":"Efectivo",
            "value":totVentasFT
          }
          let seriesTJ = {
            "name":"Tarjeta",
            "value":totVentasTJ
          }          
          objVetasPorMesGeneralFTyTJ = {
            "name": mesNombre,
            "series": [seriesFT,seriesTJ]
          }
          this.totalVtasPorMesGeneralFTyTJ.push(objVetasPorMesGeneralFTyTJ)          
        }
        ///////////////////////////////////////////////////////
        //VENTAS POR MES GENERAL
        let objTransacPorMesGeneral: any
        for (let mes = 1; mes <= 12; mes++) {
          let mesNombre=""
          let totVentas=0
          switch (mes) {
            case 1:                                       
                mesNombre="Enero"
                totVentas=this.datosForStatistic.totTrasac01
                break;
            case 2:
                mesNombre="Febrero"
                totVentas=this.datosForStatistic.totTrasac02
                break;                        
            case 3:
                mesNombre="Marzo"
                totVentas=this.datosForStatistic.totTrasac03
                break;
            case 4:
                mesNombre="Abril"
                totVentas=this.datosForStatistic.totTrasac04
                break;
            case 5:
                mesNombre="Mayo"
                totVentas=this.datosForStatistic.totTrasac05
                break;
            case 6:
                mesNombre="Junio"
                totVentas=this.datosForStatistic.totTrasac06
                break;
            case 7:
                mesNombre="Julio"
                totVentas=this.datosForStatistic.totTrasac07
                break;
            case 8:
                mesNombre="Agosto"
                totVentas=this.datosForStatistic.totTrasac08
                break;                        
            case 9:
                mesNombre="Septiembre"
                totVentas=this.datosForStatistic.totTrasac09
                break;
            case 10:
                mesNombre="Octubre"
                totVentas=this.datosForStatistic.totTrasac10
                break;
            case 11:
                mesNombre="Noviembre"
                totVentas=this.datosForStatistic.totTrasac11
                break;
            case 12:
                mesNombre="Diciembre"
                totVentas=this.datosForStatistic.totTrasac12
                break;

          }
          objTransacPorMesGeneral = {
            name: mesNombre,
            value: totVentas
          }
          this.totalTransacPorMesGeneral.push(objTransacPorMesGeneral)          
        }

        //VENTAS POR MES GENERAL en EFECTIVO/TARJETA
        let objTransacPorMesGeneralFTyTJ: any
        for (let mes = 1; mes <= 12; mes++) {
          let mesNombre=""
          let totVentasFT=0
          let totVentasTJ=0      
          switch (mes) {
            case 1:                                       
                mesNombre="Enero"
                totVentasFT=this.datosForStatistic.totTrasacFT01
                totVentasTJ=this.datosForStatistic.totTrasacTJ01
                break;
            case 2:
                mesNombre="Febrero"
                totVentasFT=this.datosForStatistic.totTrasacFT02
                totVentasTJ=this.datosForStatistic.totTrasacTJ02
                break;                        
            case 3:
                mesNombre="Marzo"
                totVentasFT=this.datosForStatistic.totTrasacFT03
                totVentasTJ=this.datosForStatistic.totTrasacTJ03
                break;
            case 4:
                mesNombre="Abril"
                totVentasFT=this.datosForStatistic.totTrasacFT04
                totVentasTJ=this.datosForStatistic.totTrasacTJ04
                break;
            case 5:
                mesNombre="Mayo"
                totVentasFT=this.datosForStatistic.totTrasacFT05
                totVentasTJ=this.datosForStatistic.totTrasacTJ05
                break;
            case 6:
                mesNombre="Junio"
                totVentasFT=this.datosForStatistic.totTrasacFT06
                totVentasTJ=this.datosForStatistic.totTrasacTJ06
                break;
            case 7:
                mesNombre="Julio"
                totVentasFT=this.datosForStatistic.totTrasacFT07
                totVentasTJ=this.datosForStatistic.totTrasacTJ07
                break;
            case 8:
                mesNombre="Agosto"
                totVentasFT=this.datosForStatistic.totTrasacFT08
                totVentasTJ=this.datosForStatistic.totTrasacTJ08
                break;                        
            case 9:
                mesNombre="Septiembre"
                totVentasFT=this.datosForStatistic.totTrasacFT09
                totVentasTJ=this.datosForStatistic.totTrasacTJ09
                break;
            case 10:
                mesNombre="Octubre"
                totVentasFT=this.datosForStatistic.totTrasacFT10
                totVentasTJ=this.datosForStatistic.totTrasacTJ10
                break;
            case 11:
                mesNombre="Noviembre"
                totVentasFT=this.datosForStatistic.totTrasacFT11
                totVentasTJ=this.datosForStatistic.totTrasacTJ11
                break;
            case 12:
                mesNombre="Diciembre"
                totVentasFT=this.datosForStatistic.totTrasacFT12
                totVentasTJ=this.datosForStatistic.totTrasacTJ12
                break;

          }
          let seriesFT = {
            "name":"Efectivo",
            "value":totVentasFT
          }
          let seriesTJ = {
            "name":"Tarjeta",
            "value":totVentasTJ
          }          
          objTransacPorMesGeneralFTyTJ = {
            "name": mesNombre,
            "series": [seriesFT,seriesTJ]
          }
          this.totalTransacPorMesGeneralFTyTJ.push(objTransacPorMesGeneralFTyTJ)          
        }

        console.log("#########################")
        ///////////////////VENDEDORES
        for (let ve = 0; ve < this.datosForStatistic.vendedores.length; ve++) {                    
          //VENTAS totales anuales POR vendedor        
          let objVetasPorVendedorAnuales: any = {
            "name": this.datosForStatistic.vendedores[ve].username,
            "value": this.datosForStatistic.vendedores[ve].totalVentas
          }
          this.totalVentasPorVendedorAnual.push(objVetasPorVendedorAnuales)

          //TRANSACCIONES totales anuales POR vendedor
          let objTransacPorVendedorAnuales: any = {
            "name": this.datosForStatistic.vendedores[ve].username,
            "value": this.datosForStatistic.vendedores[ve].totalTransacc
          }
          this.totalTransacPorVendedorAnual.push(objTransacPorVendedorAnuales)

          
          //VENTAS totales mensuales POR vendedor
          
          let objVentasPorVendedorMensual: any
          let objTransacPorVendedorMensual: any
          for (let mes = 1; mes <= 12; mes++) {
            let mesNombre=""
            let totVentas=0
            let totTransac=0
            switch (mes) {
              case 1:                                       
                  mesNombre="Enero"
                  totVentas=this.datosForStatistic.vendedores[ve].totVtas01
                  totTransac=this.datosForStatistic.vendedores[ve].totTrasac01
                  break;
              case 2:
                  mesNombre="Febrero"
                  totVentas=this.datosForStatistic.vendedores[ve].totVtas02
                  totTransac=this.datosForStatistic.vendedores[ve].totTrasac02
                  break;                        
              case 3:
                  mesNombre="Marzo"
                  totVentas=this.datosForStatistic.vendedores[ve].totVtas03
                  totTransac=this.datosForStatistic.vendedores[ve].totTrasac03
                  break;
              case 4:
                  mesNombre="Abril"
                  totVentas=this.datosForStatistic.vendedores[ve].totVtas04
                  totTransac=this.datosForStatistic.vendedores[ve].totTrasac04
                  break;
              case 5:
                  mesNombre="Mayo"
                  totVentas=this.datosForStatistic.vendedores[ve].totVtas05
                  totTransac=this.datosForStatistic.vendedores[ve].totTrasac05
                  break;
              case 6:
                  mesNombre="Junio"
                  totVentas=this.datosForStatistic.vendedores[ve].totVtas06
                  totTransac=this.datosForStatistic.vendedores[ve].totTrasac06
                  break;
              case 7:
                  mesNombre="Julio"
                  totVentas=this.datosForStatistic.vendedores[ve].totVtas07
                  totTransac=this.datosForStatistic.vendedores[ve].totTrasac07
                  break;
              case 8:
                  mesNombre="Agosto"
                  totVentas=this.datosForStatistic.vendedores[ve].totVtas08
                  totTransac=this.datosForStatistic.vendedores[ve].totTrasac08
                  break;                        
              case 9:
                  mesNombre="Septiembre"
                  totVentas=this.datosForStatistic.vendedores[ve].totVtas09
                  totTransac=this.datosForStatistic.vendedores[ve].totTrasac09
                  break;
              case 10:
                  mesNombre="Octubre"
                  totVentas=this.datosForStatistic.vendedores[ve].totVtas10
                  totTransac=this.datosForStatistic.vendedores[ve].totTrasac10
                  break;
              case 11:
                  mesNombre="Noviembre"
                  totVentas=this.datosForStatistic.vendedores[ve].totVtas11
                  totTransac=this.datosForStatistic.vendedores[ve].totTrasac11
                  break;
              case 12:
                  mesNombre="Diciembre"
                  totVentas=this.datosForStatistic.vendedores[ve].totVtas12
                  totTransac=this.datosForStatistic.vendedores[ve].totTrasac12
                  break;
            }
       
          
            let mesEncontrado = false
            //PARA LAS VENTAS
            let seriesVtas = {
              "name": this.datosForStatistic.vendedores[ve].username,
              "value": totVentas
            }                      
            objVentasPorVendedorMensual = {
              "name": mesNombre,
              "series": [seriesVtas]
            }
            mesEncontrado = false   
            for (let tvvm = 0; tvvm < this.totalVentasPorVendedorMensual.length; tvvm++) {   
              if(String(this.totalVentasPorVendedorMensual[tvvm].name) == mesNombre){
                this.totalVentasPorVendedorMensual[tvvm].series.push(seriesVtas)
                mesEncontrado=true
              }
            }
            if(mesEncontrado==false){
              this.totalVentasPorVendedorMensual.push(objVentasPorVendedorMensual)
            }

            //PARA LAS TRANSACCCIONES
            let seriesTransac = {
              "name": this.datosForStatistic.vendedores[ve].username,
              "value": totTransac
            }
            objTransacPorVendedorMensual = {
              "name": mesNombre,
              "series": [seriesTransac]
            }
            mesEncontrado = false
            for (let ttvm = 0; ttvm < this.totalTransacPorVendedorMensual.length; ttvm++) {              
              if(String(this.totalTransacPorVendedorMensual[ttvm].name) == mesNombre){
                this.totalTransacPorVendedorMensual[ttvm].series.push(seriesTransac)
                mesEncontrado=true
              }
            }
            if(mesEncontrado==false){
              this.totalTransacPorVendedorMensual.push(objTransacPorVendedorMensual)
            }            
          } 
        }

        //PRODUCTOS
        for (let p = 0; p < this.datosForStatistic.productos.length; p++) {
          //TOTAL ANUALES      
          let objTotalProdMasVendidosAnual: any = {
            "name": this.datosForStatistic.productos[p].nombre,
            "value": this.datosForStatistic.productos[p].totalVendido
          }
          this.totalProdMasVendidosAnual.push(objTotalProdMasVendidosAnual)

          //TOTAL MENSUALES
          let objTotalProdMasVendidosMensual: any
          let objTotalProdMasVendidos$Mensual: any
          let series: any
          let series$: any
          let mesEncontrado = false
          for (let mes = 1; mes <= 12; mes++) {
            let mesNombre=""
            let totalVendido=0
            let totalVendido$=0
            switch (mes) {
              case 1:                                       
                  mesNombre="Enero"
                  totalVendido=this.datosForStatistic.productos[p].totalVdo01
                  totalVendido$=this.datosForStatistic.productos[p].totalVdo$01                  
                  break;
              case 2:
                  mesNombre="Febrero"
                  totalVendido=this.datosForStatistic.productos[p].totalVdo02
                  totalVendido$=this.datosForStatistic.productos[p].totalVdo$02
                  break;                        
              case 3:
                  mesNombre="Marzo"
                  totalVendido=this.datosForStatistic.productos[p].totalVdo03
                  totalVendido$=this.datosForStatistic.productos[p].totalVdo$03
                  break;
              case 4:
                  mesNombre="Abril"
                  totalVendido=this.datosForStatistic.productos[p].totalVdo04
                  totalVendido$=this.datosForStatistic.productos[p].totalVdo$04
                  break;
              case 5:
                  mesNombre="Mayo"
                  totalVendido=this.datosForStatistic.productos[p].totalVdo05
                  totalVendido$=this.datosForStatistic.productos[p].totalVdo$05
                  break;
              case 6:
                  mesNombre="Junio"
                  totalVendido=this.datosForStatistic.productos[p].totalVdo06
                  totalVendido$=this.datosForStatistic.productos[p].totalVdo$06
                  break;
              case 7:
                  mesNombre="Julio"
                  totalVendido=this.datosForStatistic.productos[p].totalVdo07
                  totalVendido$=this.datosForStatistic.productos[p].totalVdo$07
                  break;
              case 8:
                  mesNombre="Agosto"
                  totalVendido=this.datosForStatistic.productos[p].totalVdo08
                  totalVendido$=this.datosForStatistic.productos[p].totalVdo$08
                  break;                        
              case 9:
                  mesNombre="Septiembre"
                  totalVendido=this.datosForStatistic.productos[p].totalVdo09
                  totalVendido$=this.datosForStatistic.productos[p].totalVdo$09
                  break;
              case 10:
                  mesNombre="Octubre"
                  totalVendido=this.datosForStatistic.productos[p].totalVdo10
                  totalVendido$=this.datosForStatistic.productos[p].totalVdo$10
                  break;
              case 11:
                  mesNombre="Noviembre"
                  totalVendido=this.datosForStatistic.productos[p].totalVdo11
                  totalVendido$=this.datosForStatistic.productos[p].totalVdo$11
                  break;
              case 12:
                  mesNombre="Diciembre"
                  totalVendido=this.datosForStatistic.productos[p].totalVdo12
                  totalVendido$=this.datosForStatistic.productos[p].totalVdo$12
                  break;
            }


            mesEncontrado = false 
            series = {
              "name": this.datosForStatistic.productos[p].nombre,
              "value": totalVendido
            }
            series$ = {
              "name": this.datosForStatistic.productos[p].nombre,
              "value": totalVendido$
            } 

            objTotalProdMasVendidosMensual = {
              "name": mesNombre,
              "series": [series]
            }
            objTotalProdMasVendidos$Mensual = {
              "name": mesNombre,
              "series": [series$]
            }

            for (let t = 0; t < this.totalProdMasVendidosMensual.length; t++) {
              if(String(this.totalProdMasVendidosMensual[t].name) == mesNombre){
                this.totalProdMasVendidosMensual[t].series.push(series)
                mesEncontrado=true
              }
            }
            if(mesEncontrado==false){
              this.totalProdMasVendidosMensual.push(objTotalProdMasVendidosMensual)
            }

            mesEncontrado=false
            for (let t = 0; t < this.totalProdMasVendidos$Mensual.length; t++) {
              if(String(this.totalProdMasVendidos$Mensual[t].name) == mesNombre){
                this.totalProdMasVendidos$Mensual[t].series.push(series$)
                mesEncontrado=true
              }
            }
            if(mesEncontrado==false){
              this.totalProdMasVendidos$Mensual.push(objTotalProdMasVendidos$Mensual)
            }

          }
          
  

        }
        this.totalProdMasVendidosAnual.sort(((a, b) => b.value - a.value))

        //Ordeno los valores de las series mensuales
        for (let s = 0; s < this.totalProdMasVendidosMensual.length; s++) {
          this.totalProdMasVendidosMensual[s].series.sort(((a: { value: number; }, b: { value: number; }) => b.value - a.value))
        }

        //Ordeno los valores $ de las series mensuales
        for (let s = 0; s < this.totalProdMasVendidos$Mensual.length; s++) {
          this.totalProdMasVendidos$Mensual[s].series.sort(((a: { value: number; }, b: { value: number; }) => b.value - a.value))
        }
        

        //Clonamos el array ordenado
        this.totalProdMasVendidosAnualFull = this.totalProdMasVendidosAnual.slice();
        //Dejamos solo los primeros 10 Productos
        this.totalProdMasVendidosAnual = this.totalProdMasVendidosAnualFull.slice(0, 10)

       
       

        
      },
      error: (e) => console.error(e),
      complete: () => {
        console.info('este es el complete') 
        this.updateData()
       
      }
    })
  }
}
