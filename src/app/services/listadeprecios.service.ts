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
  _productsList: productOfLDP[] = []
  public url: string;


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
      ldpDescripcion,_productsList,
      String(localStorage.getItem("loggedUserID")),
      fechaDeCreacion,
      storeId)

    let params = JSON.stringify(listadeprecios)
    console.log("MENSAJE: listadeprecios.service - registrarNuevaLDP() - registrando nueva lista de precios.")
    
    
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    
    return this._http.post(this.url+'/ldp/registrarLDP',params,{headers});
  }
}
