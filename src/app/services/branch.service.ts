import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store } from '../models/store'
import { Branch } from '../models/branch'
import { global } from '../services/global';
import { UserService } from './user.service';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class BranchService {
  public url:string;

  constructor(
    private _http:HttpClient,
  ) {
    this.url = global.url
  }

  getBranchById(branchId: string): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(this.url+'/branches/'+branchId,{headers});
  }
  saveBranch(sucursal: any): Observable<any>{
    let params = JSON.stringify(sucursal)
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.post(this.url+'/branches/createBranch/',params,{headers});
  }
  getBranchesByStoreId(storeId:string):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(this.url+'/branches/bystoreid/'+storeId,{headers});
  }
  getBranchesByBranchId(branchId:string):Observable<any>{
    console.log("#####")
    console.log(branchId)
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(this.url+'/branches/bybranchId/'+branchId,{headers});
  }
  
  getStockByBranchId(branchId:string):Observable<any>{
    console.log("MENSAJE: getProductosByBranchId para "+ branchId + ".")
    let cabeceras = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(this.url+'/branches/stock/'+branchId,{headers:cabeceras})
  }
  ajustarStock(branchId:string, productId:string, cantidad:number, nuevaCantidad:number, descripcionAjuste:string):Observable<any>{
    console.log("MENSAJE: branchService - ajustarStock producId: " + productId + " - branchId: " +  branchId )

    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    let datos={
      branchId:branchId,
      productId:productId,
      cantidadActual: cantidad,
      nuevaCantidad: nuevaCantidad,
      descripcionAjuste: descripcionAjuste
    }
    let params = JSON.stringify(datos)
    console.log(params)
    return this._http.post(this.url + '/branches/ajustarStock/'+branchId,params,{headers}) 
  }

  
  eliminarSucursal(branchId:string):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.delete(this.url+'/branches/deleteBranch/'+branchId,{headers});
  }

}
