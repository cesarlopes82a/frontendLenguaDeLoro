import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styles: [
  ]
})
export class SigninComponent implements OnInit {

  public unauthorized = false

  user={
    userName:'',
    email:'',
    password:''
  }

  constructor(
    private _authService:AuthService,
    private router:Router
    ) { }

  ngOnInit(): void {
    if(this._authService.loggedIn()){
      this.router.navigate(['/private'])
    }
  }

  signIn(){
    console.log("MENSAJE: SigninComponent - logueando usuario... " + this.user.email + ":"+this.user.userName)
    this._authService.signIn(this.user)

    .subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token)

        localStorage.setItem("loggedUserID", this._authService.getDecodedAccessToken(String(this._authService.getToken())).id),
        localStorage.setItem("loggedUserEmail", this._authService.getDecodedAccessToken(String(this._authService.getToken())).email),
        localStorage.setItem("loggedUserRole",this._authService.getDecodedAccessToken(String(this._authService.getToken())).role),
        localStorage.setItem("loggedUserName", this._authService.getDecodedAccessToken(String(this._authService.getToken())).username),
        localStorage.setItem("loggedUserDB", this._authService.getDecodedAccessToken(String(this._authService.getToken())).userDB)
              
        console.log(res)
      },
      error: (e) => {
        this.unauthorized = true
        console.error(e)
      },
      complete: () => {
        console.info('(903458)complete desde signIn signIn.component') 
        
        location.reload()
        
      }
     })

  }


}
