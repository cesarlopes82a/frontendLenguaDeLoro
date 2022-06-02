import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
    let params = JSON.stringify(parametros)
    console.log("los paramas antes de enviarlossssssssssssssssssssssssssssssssssssssss")
    console.log(params)
    
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(this.url+'/ventas/registrarVenta',params,{headers});
  }
  getVentasByBranchIdAndPopulateInfo(branchId:string){
    console.log("MENSAJE: getVentasByBranchIdAndPopulateInfo() - obteniendo ventas para branchId: " + branchId)
    let cabeceras = new HttpHeaders().set('Content-Type', 'application/json');
    
    return this._http.get(this.url+'/ventas/'+branchId + '/Info/',{headers:cabeceras})
  }
}
