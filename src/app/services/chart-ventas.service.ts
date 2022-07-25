import { Injectable } from '@angular/core';

interface VentasTienda {
  name: string,
  value: number
}
interface CantVentasTienda {
  name: string,
  value: number
}
interface FormaDePago {
  name: string,
  value: number
}

@Injectable({
  providedIn: 'root'
})
export class ChartVentasService {

  private totalVtasYearGeneral: VentasTienda[] = [];
  private totalCantVtasYearGral: CantVentasTienda[] = [];
  private totalTransacFormaDePagoGeneral: FormaDePago[] = [];

  get totalVentasPorTienda(){
    return this.totalVtasYearGeneral
  }
  get totalCantVtasYearGeneral(){
    return this.totalCantVtasYearGral
  }
  get totalCantTransacPorFormaDePagoGral(){
    return this.totalTransacFormaDePagoGeneral
  }

  setDataTotalVentasPorTienda(ventas:any){
    console.log("seteo la data!")
    console.log(ventas)
    this.totalVtasYearGeneral.splice(0, this.totalVtasYearGeneral.length);
    this.totalVtasYearGeneral = ventas.slice();
  }
  setDataTotalCantVentasYearGeneral(datos:any){
    console.log("seteo la data! totalCantVentasYearGeneral")
    console.log(datos)
    this.totalCantVtasYearGral.splice(0, this.totalCantVtasYearGral.length);
    this.totalCantVtasYearGral = datos.slice();
    console.log("revisoo")
    console.log(this.totalCantVtasYearGeneral)
  }
  setDataTotalTransacFormaDePagoGral(datos:any){
    console.log("seteo la data! setDatatotalFormaDePagoGral")
    console.log(datos)
    this.totalTransacFormaDePagoGeneral.splice(0, this.totalTransacFormaDePagoGeneral.length);
    this.totalTransacFormaDePagoGeneral = datos.slice();
    console.log("revisoo")
    console.log(this.totalTransacFormaDePagoGeneral)
  }
  constructor() { }
}
