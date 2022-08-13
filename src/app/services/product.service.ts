import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product';
import { global } from '../services/global';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  public url:string;
  @Output() enviarDatosProductoQueQuieroEditar: EventEmitter<any> = new EventEmitter();

  constructor(
    private _http:HttpClient,
  ) { 
    this.url = global.url
  }
  

  saveProducto(product: any, storeId: string): Observable<any>{
    product.storeId=storeId
    let params = JSON.stringify(product)
    
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(this.url+'/products/createProducto',params,{headers});
  }
  getProductos():Observable<any>{
    console.log("MENSAJE: getProductos() - estoy dentro del getProductos desde el product.service.ts")
    let cabeceras = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.get(this.url+'/products',{headers:cabeceras})
  }

  getProductById(productId: string):Observable<any>{
    console.log("MENSAJE: ProductService - getProductById(" + productId + ")...")

    let cabeceras = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(this.url+'/products/productId/'+productId,{headers:cabeceras})
  }
  getProductosByStoreId(storeId: string):Observable<any>{
    
    console.log("MENSAJE: ProductService-getProductosByStoreId(" + storeId + ") - ")

    let cabeceras = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(this.url+'/products/store/'+storeId,{headers:cabeceras})
  }
  
  getProductosByStoreIdAndPopulate(storeId: string):Observable<any>{
    console.log("MENSAJE: ProductService-getProductosByStoreIdAndPopulateCompras(" + storeId + ") - ")

    let cabeceras = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(this.url+'/products/storep/'+storeId,{headers:cabeceras})
  }

  postChangeStatusProductById(productId: string):Observable<any>{
    console.log("MENSAJE: productService - cambiar estado de productId: " + productId + " - Iniciando proceso... ")

    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    let params = JSON.stringify(productId)
    console.log(params)
    return this._http.post(this.url + '/products/chStatus/'+productId,{headers})

  }

  postUpdateProducto(producto: Product):Observable<any>{
    console.log("MENSAJE: productService - actualizando productId: " + producto._id + " - Iniciando proceso... ")

    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    let params = JSON.stringify(producto)
    console.log(params)
    return this._http.post(this.url + '/products/updateProducto/'+producto._id,params,{headers})


  }
  

}