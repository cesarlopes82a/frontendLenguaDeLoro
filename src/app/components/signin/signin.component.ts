import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styles: [
  ]
})
export class SigninComponent implements OnInit {

  @Input()
  inputSideNav!: MatSidenav;

  user={
    userName:'',
    email:'',
    password:''
  }

  constructor(
    private authService:AuthService,
    private router:Router
    ) { }

  ngOnInit(): void {
  }

  signIn(){
    this.authService.signIn(this.user)
    .subscribe(
      res => {
        console.log(res)
        
        localStorage.setItem('token', res.token)
        this.router.navigate(['/private'])
      },
      err => console.log(err)
    )
  }
  

}
