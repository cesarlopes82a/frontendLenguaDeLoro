import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { global } from '../services/global';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  public url:string;

  constructor(
    private _http:HttpClient,
  ) {
    this.url = global.url
  }
  getCategories(){
    //let headers = new HttpHeaders().set('Content-Type', 'application/json');
    //return this._http.get(this.url + '/stores/',{headers:headers})
    return this._http.get(this.url + '/categories/')  
     
  }
}
