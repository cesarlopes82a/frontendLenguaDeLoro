import { EventEmitter, Injectable, Output, HostBinding } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { global } from './global';
import { User } from '../models/user'


@Injectable({
  providedIn: 'root'
})
export class UserService {

  public url:string;
  @HostBinding('class.sendUser')
  @Output() enviarTiendasSeleccionadasAsignacion: EventEmitter<any> = new EventEmitter();

  public testVAR:string = "paso esto";
  public UserByIdAndPopulateStores:any;

  constructor(
    private _http:HttpClient
  ) { 
    this.url = global.url
  }

  getUserById(userId: string): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(this.url+'/users/'+userId,{headers});
  }

  getUsers(){
    //let headers = new HttpHeaders().set('Content-Type', 'application/json');
    //return this._http.get(this.url + '/stores/',{headers:headers})
    return this._http.get(this.url + '/users/')   
  }
  getUsersAndPopulate():Observable<any>{
    //let headers = new HttpHeaders().set('Content-Type', 'application/json');
    //return this._http.get(this.url + '/stores/',{headers:headers})
    return this._http.get(this.url + '/users/all/')   
  }
  getUserByIdAndPopulateStores(userId: string): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    this.UserByIdAndPopulateStores = this._http.get(this.url+'/users/userIdPopulateStores/'+userId,{headers});

    return this.UserByIdAndPopulateStores
  }

  sendUser(){
    return this.testVAR
  }

  createNewUser(user: any): Observable<any>{
    if(global.loggedUserRole ="adminMaster"){
      user.roles=["adminGlobal"]
    }
    let params = JSON.stringify(user)
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    
    return this._http.post(this.url+'/users/createUser',params,{headers});
  }

  createNewAdminTiendaUser(storeId:string, user: any): Observable<any>{
    
    user.roles=["adminTienda"]
    user.storeId=storeId

    let params = JSON.stringify(user)
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    
    return this._http.post(this.url+'/users/createAdminTiendaUser',params,{headers});
  }

  createNewVendedorUser(branchId:string, user: any): Observable<any>{
  
    user.roles=["vendedor"]
    user.branchId=branchId

    let params = JSON.stringify(user)
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    
    return this._http.post(this.url+'/users/createVendedorUser',params,{headers});
  }

  addStoreToUserFromRoute(userId:string, storeId:string):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    let datos={
      userId:userId,
      storeId:storeId
    }
    let params = JSON.stringify(datos)
    
    return this._http.post(this.url + '/users/addStoreToUserFromRoute',params,{headers})   
  }

  reasignarTiendas(listaTiendasSeleccionadas:any, userId:string){
    //recibo el id del usuario al que tengo que asignarle las tiendas seleccionadas y una lista de branches de este tipo
    //{6295dcb00ae7edf5992e2b31: true, 6295dcba0ae7edf5992e2b4f: false, 6295dccd0ae7edf5992e2b6d: true}
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    let datos={
      userId:userId,
      listaTiendasSeleccionadas:listaTiendasSeleccionadas
    }
    let params = JSON.stringify(datos)
    
    return this._http.post(this.url + '/users/reasignarTiendas',params,{headers}) 

  }

}

