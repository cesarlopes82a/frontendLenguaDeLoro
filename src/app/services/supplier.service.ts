import { Injectable, Output, EventEmitter} from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { global } from '../services/global';
import { Proveedor } from '../models/proveedor';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {
  @Output() enviarProveedorSeleccionado: EventEmitter<any> = new EventEmitter();
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
 
  getProveedorById(proveedorId: string):Observable<any>{
    console.log("MENSAJE: SupplierService - getProveedorById(" + proveedorId + ")...")

    let cabeceras = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(this.url+'/proveedor/'+proveedorId,{headers:cabeceras})
  }
  postUpdateProveedor(proveedor: Proveedor):Observable<any>{
    console.log("MENSAJE: supplierService - actualizando proveedorId: " + proveedor._id + " - Iniciando proceso... ")

    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    let params = JSON.stringify(proveedor)
    console.log(params)
    return this._http.post(this.url + '/proveedor/updateProveedor/'+proveedor._id,params,{headers})


  }
}

