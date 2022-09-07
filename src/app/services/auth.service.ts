import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router';
import { global } from './global';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private URL = global.url


  constructor(
    private http: HttpClient,
    private router:Router
    ) { }

  signUp(user:any){
    return this.http.post<any>(this.URL + '/auth/signup',user) //el <any> puede ser reemplazado por una interfaz si la creamos
  } 

  signIn(user:any){
    console.log("voy por el metodo signIn del auth.service")
    return this.http.post<any>(this.URL + '/auth/signin',user) //el <any> puede ser reemplazado por una interfaz si la creamos
  }

  loggedIn(): Boolean{
    return !!localStorage.getItem('token');
  }

  getToken(){
    console.log("el token desde el auth service " + localStorage.getItem('token'))
    return localStorage.getItem('token')
  }
  

  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['/signin'])
    localStorage.removeItem("loggedUserName");
    localStorage.removeItem("loggedUserEmail");
    localStorage.removeItem("loggedUserRole");
    localStorage.removeItem("loggedUserDB");
    localStorage.removeItem("itemMenuSeleccionadoId");
    localStorage.removeItem("itemMenuSeleccionado");
    localStorage.removeItem("defaultListaDP");
    localStorage.removeItem("loggedUserID");
  }
  
  getDecodedAccessToken(token: string): any {
    try{
        return jwt_decode(token);
    }
    catch(Error){
        return null;
    }
  }
}
