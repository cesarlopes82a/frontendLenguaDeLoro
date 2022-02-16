import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styles: [
  ]
})
export class SignupComponent implements OnInit {

  @Input()
  inputSideNav!: MatSidenav;

  user={
    username:'',
    email:'',
    password:''
  }

  constructor(
    private authService:AuthService,
    private router:Router
    ) { }

  ngOnInit(): void {
  }

  signUp(){
    this.authService.signUp(this.user)
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
