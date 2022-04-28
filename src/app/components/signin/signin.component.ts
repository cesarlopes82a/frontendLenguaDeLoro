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
  }

  signIn(){
    this._authService.signIn(this.user)

    .subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token)

        localStorage.setItem("loggedUserID", this._authService.getDecodedAccessToken(String(this._authService.getToken())).id),
        localStorage.setItem("loggedUserEmail", this._authService.getDecodedAccessToken(String(this._authService.getToken())).email),
        localStorage.setItem("loggedUserRole",this._authService.getDecodedAccessToken(String(this._authService.getToken())).role),
        localStorage.setItem("loggedUserName", this._authService.getDecodedAccessToken(String(this._authService.getToken())).username),
        localStorage.setItem("loggedUserDB", this._authService.getDecodedAccessToken(String(this._authService.getToken())).userDB)

        console.log("MUESTRO LOS DATOS DESDE EL LOCAL STORAGE------------------")
        console.log(localStorage.getItem("loggedUserID"))
        console.log(localStorage.getItem("loggedUserEmail"))
        console.log(localStorage.getItem("loggedUserRole"))
        console.log(localStorage.getItem("loggedUserName"))
        console.log(localStorage.getItem("loggedUserDB"))

        this.router.navigate(['/private'])
        console.log(res)
      },
      error: (e) => console.error(e),
      complete: () => console.info('(903458)complete desde signIn signIn.component') 
     })
    /*
    .subscribe(
      res => {
        console.log(res)
        
        localStorage.setItem('token', res.token)
        this.router.navigate(['/private'])
      },
      err => console.log(err)
    )
    */
  }
  

}
