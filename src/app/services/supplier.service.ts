import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { global } from '../services/global';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {
  public url:string;

  constructor(
    private _http:HttpClient,
  ) {
    this.url = global.url
  }

  saveProveedor(proveedor: any): Observable<any>{
    let params = JSON.stringify(proveedor)
    
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(this.url+'/proveedor/createProveedor',params,{headers});
  }
  getProveedores():Observable<any>{
    console.log("estoy dentro del getProveedores desde el supplier.service.ts")
    let cabeceras = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.get(this.url+'/proveedor',{headers:cabeceras})
  }
}

