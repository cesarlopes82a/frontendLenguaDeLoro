import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { global } from '../services/global';

@Injectable({
  providedIn: 'root'
})
export class VentasService {
  @Output() enviarProductoSeleccionado: EventEmitter<any> = new EventEmitter();
  @Output() enviarCantProductoSeleccionado: EventEmitter<any> = new EventEmitter();
  
  public url:string;

  public coincidenciaCompletaCodigo!:boolean
  public productoSeleccionado!:string 

  constructor(
    private _http:HttpClient,
  ) {
    this.url = global.url
  }

  async setEstadoCoinicidenciaFullCod(estado:boolean){
    console.log("seteoooo " + estado)
    this.coincidenciaCompletaCodigo = estado
  }
  async getEstadoCoinicidenciaFullCod(){
    return this.coincidenciaCompletaCodigo
  }
  async setProductoSeleccionado(producto:string){
    this.productoSeleccionado = producto
    console.log("seteoooo productoSeleccionado" )
    console.log(this.productoSeleccionado)
  }
  async getProductoSeleccionado(){
    return this.productoSeleccionado
  }
  registrarVenta(listaDeProductos:any, totalVenta:number, montoEfectivo:number, montoTarjeta:number, comentarioVenta: string, branchId:string, vendedorId:string): Observable<any>{
    let parametros = {
      listaDeProductos: listaDeProductos,
      totalVenta: totalVenta,
      montoEfectivo: montoEfectivo,
      montoTarjeta: montoTarjeta,
      branchId: branchId,
      vendedorId: vendedorId,
      comentarioVenta: comentarioVenta
    }
    console.log("los paramas antes de enviarlossssssssssssssssssssssssssssssssssssssss")
    console.log(parametros)
    let params = JSON.stringify(parametros)
    
    
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(this.url+'/ventas/registrarVenta',params,{headers});
  }
  getVentasByBranchIdAndPopulateInfo(branchId:string){
    console.log("MENSAJE: getVentasByBranchIdAndPopulateInfo() - obteniendo ventas para branchId: " + branchId)
    let cabeceras = new HttpHeaders().set('Content-Type', 'application/json');
    
    return this._http.get(this.url+'/ventas/'+branchId + '/Info/',{headers:cabeceras})
  }

  getVentasForStatistics1(userId:string, yearVentas:number){

    console.log("MENSAJE: getVentasForStatistics() - obteniendo ventas para userId: " + userId)
    let cabeceras = new HttpHeaders().set('Content-Type', 'application/json');
    const params = new HttpParams().append('param', yearVentas);
    
    
    return this._http.get(this.url+'/ventas/sttVtas1/Info/',{headers:cabeceras, params})
  }

  getVentasForStatisticsPorSucursal(userId:string, branchId:string, yearVentas:number){
    console.log("MENSAJE: getVentasForStatisticsPorSucursal() - obteniendo ventas para userId: " + userId+ ". Sucursal branchId: "+ branchId+". Año: "+yearVentas)
    let cabeceras = new HttpHeaders().set('Content-Type', 'application/json');
    let objParams = {
      branchId: branchId,
      yearVentas: yearVentas
    }
    let params = new HttpParams()
                    .set("branchId",branchId)
                    .set("yearVentas", yearVentas); 
   
    
    
    return this._http.get(this.url+'/ventas/sttVtas2/Info/',{headers:cabeceras, params})

  }

  postAnularVenta(branchId:string, ventaId:string, motivo:string): Observable<any>{
    
    let parametros = {
      branchId: branchId,
      ventaId: ventaId,   
      motivo: motivo
    }
    console.log("los paramas antes de enviarlossssssssssssssssssssssssssssssssssssssss")
    console.log(parametros)
    let params = JSON.stringify(parametros)
    
    
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(this.url+'/ventas/postAnularVenta',params,{headers});
  }
}
