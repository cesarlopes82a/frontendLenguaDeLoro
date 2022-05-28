import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VentasService {
  @Output() enviarProductoSeleccionado: EventEmitter<any> = new EventEmitter();

  public coincidenciaCompletaCodigo!:boolean
  public productoSeleccionado!:string 

  constructor() { }

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
}
