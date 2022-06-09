import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from "../services/auth.service";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ){

  }
  canActivate(): boolean{
    console.log("MENSAJE: BIENVENIDO A LENGUA DE LORO.")
    if(this.authService.loggedIn()){
      console.log("MENSAJE: Usuario Logueado.")
      return true
    }
    console.log("MENSAJE: Usuario aun no ha realizado login. redirigiendo a signin...")
    this.router.navigate(['/signin'])
    return false
  }
  
}
