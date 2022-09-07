import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LegendPosition } from '@swimlane/ngx-charts';
import { AuthService } from 'src/app/services/auth.service';
import { VentasService } from 'src/app/services/ventas.service';

@Component({
  selector: 'app-estadist-tienda',
  templateUrl: './estadist-tienda.component.html',
  styleUrls: ['./estadist-tienda.component.css']
})
export class EstadistTiendaComponent implements OnInit {
  public yearVentas!: number
  public storeId!: string;
  public datosForStatistic!: any
  public totalVtasYearGeneral: string [] = [];

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
  showDataLabels = true
  legendTitle="Referencia"

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
   }

  ngOnInit(): void {
    this._route.params.subscribe(
      params => {
        this.storeId = params['id']
        if (this._authService.loggedIn()){
          console.log("MENSAJE: Decodificando access token...")
          const userId = this._authService.getDecodedAccessToken(String(this._authService.getToken())).id
          this.getVentasForStatisticsPorTienda(userId)
        }  
      }
    )
    
  }
  getVentasForStatisticsPorTienda = async (userId:string) => {
    console.log("MENSAJE: Obteniendo VentasForStatisticsPorTienda para userId: " +userId + "year:" +this.yearVentas )
    this._ventasService.getVentasForStatisticsPorTienda(userId, this.storeId, this.yearVentas)
    .subscribe({
      next: (v) => {
        this.totalVtasYearGeneral.splice(0, this.totalVtasYearGeneral.length);


        this.datosForStatistic = v
        let objTotalVtasYearGeneral: any


        for (let i = 0; i < this.datosForStatistic.length; i++) {

          let serie: string [] = []
          //chart total $ ventas por tienda
          objTotalVtasYearGeneral = {
            name: this.datosForStatistic[i].branchName,
            value: this.datosForStatistic[i].totalVentas
          }
          this.totalVtasYearGeneral.push(objTotalVtasYearGeneral)
        }

        /*
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
        */
        

        console.log("MENSAJE: ventas obtenidas exitosamente para userId: " +userId+ ". storeId: " + this.storeId+ ". Año: " + this.yearVentas)
        console.log(v)
        this.datosForStatistic = v
      },
      error: (e) => console.error(e),
      complete: () => {
        console.info('este es el complete') 
        this.updateData()
       
      }
    })
  }

  onSelect(event: any) {
    console.log(event);    
  }

  updateData(){
    console.log(this.yearVentas)

    this.totalVtasYearGeneral = [...this.totalVtasYearGeneral]

  }

  updateData2(){
    const userId = this._authService.getDecodedAccessToken(String(this._authService.getToken())).id
    this.getVentasForStatisticsPorTienda(userId)
  }

}
