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
interface FormaDePagoxtienda {
  name: string,
  series: []
}
interface VentasTiendaPorSucursal {
  name: string,
  series: []
}

@Injectable({
  providedIn: 'root'
})
export class ChartVentasService {

  private totalVtasYearGeneral: VentasTienda[] = [];
  private totalCantVtasYearGral: CantVentasTienda[] = [];
  private totalTransacFormaDePagoGeneral: FormaDePago[] = [];
  private totalTransacPorFpagoXTienda: FormaDePagoxtienda[] = [];
  private totalVentasPorTiendaPorSucursal: VentasTiendaPorSucursal[] = [];

  get totalVentasPorTienda(){
    return this.totalVtasYearGeneral
  }
  get totVtasYearPorTiendaPorSucursal(){
    return this.totalVentasPorTiendaPorSucursal
  }
  get totalCantVtasYearGeneral(){
    return this.totalCantVtasYearGral
  }
  get totalCantTransacPorFormaDePagoGral(){
    return this.totalTransacFormaDePagoGeneral
  }
  get totalCantTransacPorFpagoXTienda(){
    return this.totalTransacPorFpagoXTienda
  }

  setDataTotalVentasPorTienda(ventas:any){
    console.log("seteo la data!")
    console.log(ventas)
    this.totalVtasYearGeneral.splice(0, this.totalVtasYearGeneral.length);
    this.totalVtasYearGeneral = ventas.slice();
  }
  setDataTotVtasYearPorTiendaPorSucursal(ventas:any){
    console.log("seteo la data! setDataTotVtasYearPorTiendaPorSucursal")
    console.log(ventas)
    this.totalVentasPorTiendaPorSucursal.splice(0, this.totalVentasPorTiendaPorSucursal.length);
    this.totalVentasPorTiendaPorSucursal = ventas.slice();
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
  setDataTotalTransacPorFpagoXTienda(datos:any){
    console.log("seteo la data! setDataTotalTransacPorFpagoXTienda")
    console.log(datos)
    this.totalTransacPorFpagoXTienda.splice(0, this.totalTransacPorFpagoXTienda.length);
    this.totalTransacPorFpagoXTienda = datos.slice();
    console.log("revisoo")
    console.log(this.totalTransacPorFpagoXTienda)
  }
  constructor() { }
}
