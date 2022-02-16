import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{
  constructor(
    private authService:AuthService
  ) { }
  
  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = String(this.authService.getToken());

    let request = req;
    
    console.log("es el token " + localStorage.getItem('token'))
    if (token) {
      request = req.clone({
        setHeaders: {
          'x-access-token': token
        }
      });
    }

    return next.handle(request)
  }



/*
  intercept(req, next){
    const tokenizeReq = req.clone({
      setHeaders: {
        x-access-tocken: `hello ${this.authService.getToken()}`
      }
    })
    return next.handle(tokenizeReq)
  }
*/

}
