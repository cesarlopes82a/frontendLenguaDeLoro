import { Component, Input, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { AuthService } from 'src/app/services/auth.service';
import { global } from 'src/app/services/global';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: [
  ]
})
export class NavbarComponent implements OnInit {
  @Input()
  inputSideNav!: MatSidenav;

  constructor(public authService:AuthService) { }

  ngOnInit(): void {
 
    console.log("me traigo el token en el navbar")
    let tocken = this.authService.getToken()
    if(tocken){
      let tockenDecoded = this.authService.getDecodedAccessToken(tocken)
      console.log(tockenDecoded)
    }
    if (this.authService.loggedIn()){
      this.inputSideNav.open()
      console.log("tiro el opeeeennnnn")
    }
  }
  ngAfterViewInit() 
  {
    if (this.authService.loggedIn()){
      //this.inputSideNav.open()
      console.log("tiro el opeeeennnnn")
    }
    console.log("235i843905824395'84395043859403583049584350943854903")
  }
 

}
window.onload = function () 
{
    console.log('OkkkkkkkkkkkK');
   // this.inputSideNav.toggle()
};
