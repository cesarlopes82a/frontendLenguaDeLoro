import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store } from '../models/store'
import { global } from '../services/global';
import { UserService } from './user.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  public url:string;

  constructor(
    private _http:HttpClient,
    private _userService:UserService,
    private _authService:AuthService

  ) { 
    this.url = global.url
  }

  testService(){
    return 'probando el servicio de store '
  }

  saveStore(store: Store): Observable<any>{
    let params = JSON.stringify(store)
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.post(this.url+'/stores/createStore',params,{headers});
  }
  getStoreById(storeId: string): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(this.url+'/stores/'+storeId,{headers});
  }

  getStoresByUserId(userId:string){
    

  }

  getStores(){
    //let headers = new HttpHeaders().set('Content-Type', 'application/json');
    //return this._http.get(this.url + '/stores/',{headers:headers})
    return this._http.get(this.url + '/stores/')  
     
  }
  

}
