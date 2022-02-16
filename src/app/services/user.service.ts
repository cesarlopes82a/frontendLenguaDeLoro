import { Injectable, HostBinding } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { global } from './global';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public url:string;
  @HostBinding('class.sendUser')

  public testVAR:string = "paso esto";
  public user:any;

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
  getUserByIdAndPopulateStores(userId: string): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    this.user = this._http.get(this.url+'/users/userIdPopulateStores/'+userId,{headers});
    return this.user
  }

  sendUser(){
    return this.testVAR
  }


}

