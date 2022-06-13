import { Injectable, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { global } from '../services/global';


@Injectable({
  providedIn: 'root'
})
export class ComprasService {
  public url:string;
  @Output() pasoStoreId: EventEmitter<any> = new EventEmitter();
  constructor(
    private _http:HttpClient,
  ) {
    this.url = global.url
  }

  registrarCompra(compra: any): Observable<any>{

    let params = JSON.stringify(compra)
        
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(this.url+'/compras/registrarCompra',params,{headers});
  }
  eliminarRegistroCompra(compraId:string):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.delete(this.url+'/compras/eliminarRegistroCompra/'+compraId,{headers});
  }
  
  getCompras():Observable<any>{
    console.log("estoy dentro del getCompras desde el compras.service.ts")
    let cabeceras = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.get(this.url+'/compras',{headers:cabeceras})
  }
  getComprasByBranch(branchId: string):Observable<any>{
    console.log("estoy dentro del getComprasByBranch desde el compras.service.ts")
    let cabeceras = new HttpHeaders().set('Content-Type', 'application/json');
    
    return this._http.get(this.url+'/compras/'+branchId,{headers:cabeceras})
  }
  
  getComprasByBranchAndPopulateInfo(branchId: string):Observable<any>{
    console.log("estoy dentro del getComprasByBranch desde el compras.service.ts")
    let cabeceras = new HttpHeaders().set('Content-Type', 'application/json');
    
    return this._http.get(this.url+'/compras/'+branchId+'/info',{headers:cabeceras})
  }
}
