import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { productOfLDP } from 'src/app/models/productOfLDP';
import { Listadeprecios } from '../models/listadeprecio';
import { Product } from '../models/product';
import { global } from '../services/global';

@Injectable({
  providedIn: 'root'
})
export class ListadepreciosService {
  @Output() enviarListId: EventEmitter<any> = new EventEmitter();

  _productsList: productOfLDP[] = []
  public url: string;
  public listaOrigen!:string;
  

  constructor(
    private _http:HttpClient,
  ) { 
    this.url = global.url
  }
  testFuncion(){
    console.log("testFuncion() desde el servicio")
  }
  nuevoPrecioVenta(precioVenta:number){
    console.log("nuevo precio de venta: " + precioVenta)
  }

  addProductTothelist(product: productOfLDP){
    this._productsList.push(product)
  }
  deleteProductOfthelist(id: string){
    const product = this._productsList.findIndex(c => c._id === id);
    this._productsList.splice(product,1)
  }
  getAllProductsOfthelist(){
    return this._productsList
  }
  registrarNuevaLDP(_productsList: any, ldpNombre:string, ldpDescripcion:string, fechaDeCreacion:string, storeId:string): Observable<any>{

    let listadeprecios = new Listadeprecios(
      ldpNombre,
      ldpDescripcion,
      _productsList,
      String(localStorage.getItem("loggedUserID")),
      fechaDeCreacion,
      storeId)

    let params = JSON.stringify(listadeprecios)
    console.log("MENSAJE: listadeprecios.service - registrarNuevaLDP() - registrando nueva lista de precios.")
    
    
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    console.log("la lista de precios q voy a pasar------------------------------------")
    console.log(listadeprecios)
    
    return this._http.post(this.url+'/ldp/registrarLDP',params,{headers});
  }
  getListasdpByStoreIdAndPopulateInfo(storeId:string){
    
    console.log("estoy dentro del getListasdpByStoreIdAndPopulateInfo desde el listadeprecios.service.ts")
    let cabeceras = new HttpHeaders().set('Content-Type', 'application/json');
    
    return this._http.get(this.url+'/ldp/store/'+storeId,{headers:cabeceras})
  }
  getListaDpByIdAndPopulateProducts(listaId:string){    
    console.log("MENSAJE: getListasdpByStoreIdAndPopulateInfo() desde el listadeprecios.service.ts ListaID: " +listaId)
    let cabeceras = new HttpHeaders().set('Content-Type', 'application/json');
    
    return this._http.get(this.url+'/ldp/'+listaId,{headers:cabeceras})

  }
  async setListaId(listaId:string){
    this.listaOrigen=listaId
  }
  async getListaId(){
    return this.listaOrigen
  }
  clearListaId(){
    this.listaOrigen=""
  }
  

  setDefaultStoreLDP(itemMenuSeleccionadoId:string, listaId:string): Observable<any>{
    
    console.log("MENSAJE: .................")
    console.log(itemMenuSeleccionadoId)
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    let datos={
      listaId:listaId
    }
    let params = JSON.stringify(datos)
    

    return this._http.post(this.url+'/ldp/setDefaultStoreLDP/'+itemMenuSeleccionadoId,params,{headers});
  }

}
