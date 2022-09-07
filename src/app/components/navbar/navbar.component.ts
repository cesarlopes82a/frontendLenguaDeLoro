import { Component, Input, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { AuthService } from 'src/app/services/auth.service';
import { global } from 'src/app/services/global';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: [
  ],
  providers:[AuthService, UserService]
})
export class NavbarComponent implements OnInit {
  @Input()
  inputSideNav!: MatSidenav;
  public loggedUserName:string = global.loggedUserName
  public loggedUserEmail:string = global.loggedUserEmail
  public loggedUserRole:string = global.loggedUserRole
  public loggedUser:any = null;

  constructor(
    public _authService:AuthService, 
    public _userService:UserService
    ) { 
      
    }

   ngOnInit(): void {
    console.log("MENSAJE: NavbarComponent - OnInit navbar....")

    this.loggedUserName = String(localStorage.getItem("loggedUserName"))
    this.loggedUserEmail = String(localStorage.getItem("loggedUserEmail"))
    this.loggedUserRole = String(localStorage.getItem("loggedUserRole"))

    let token = this._authService.getToken()
    if(token){
      console.log("MENSAJE: Token existente... decodingAccessToken()")
      let tockenDecoded = this._authService.getDecodedAccessToken(token)
      console.log(tockenDecoded)
    }
    if(this._authService.loggedIn()){
      console.log("MENSAJE: Token no encontrado.")
      const userId = this._authService.getDecodedAccessToken(String(this._authService.getToken())).id
      this.getUserByIdAndPopulateStores(userId)
      this.inputSideNav.open()
      console.log("tiro el opeeeennnnn-----------------------------")
    }else{
      this.inputSideNav.close()
      localStorage.removeItem("loggedUserName");
      localStorage.removeItem("loggedUserEmail");
      localStorage.removeItem("loggedUserRole");
      localStorage.removeItem("loggedUserDB");
      localStorage.removeItem("itemMenuSeleccionadoId");
      localStorage.removeItem("itemMenuSeleccionado");
      localStorage.removeItem("defaultListaDP");
      localStorage.removeItem("loggedUserID");
    }
    
  }
  async ngAfterViewInit() 
  {
    if (this._authService.loggedIn()){
      //this.inputSideNav.open()
      console.log("tiro el opeeeennnnn")
      
    }
  }
 
   getUserByIdAndPopulateStores = async (userId:string) => {
    console.log("getUserByIdAndPopulateStores() desde el navbar    id: "+userId)
    this._userService.getUserByIdAndPopulateStores(userId)
    .subscribe({
      next: (v) => {
        console.log("viene el next con lo que meti dentro de global.loggedUser")
        console.log(v)
        this.loggedUser=v;
        
        global.loggedUser = this.loggedUser
        global.reloadNeeded = false
      },
      error: (e) => console.error(e),
      complete: () => console.info('este es el complete') 
    })
  }

}
window.onload = function () 
{
    console.log('OkkkkkkkkkkkK');
   // this.inputSideNav.toggle()
};
