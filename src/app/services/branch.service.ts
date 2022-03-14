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

}
