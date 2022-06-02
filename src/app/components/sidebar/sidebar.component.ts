import { Component, OnInit,ViewChild } from '@angular/core';
import { StoreService } from 'src/app/services/store.service';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { global } from 'src/app/services/global';
import { MatSidenav } from '@angular/material/sidenav';
import { ComprasService } from 'src/app/services/compras.service';
import { SidenavService } from 'src/app/services/sidebar.service';



@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ],
  providers:[StoreService, UserService, SidenavService]
})

export class SidebarComponent implements OnInit {

  @ViewChild('sidenav', {static: false}) sidenav!: MatSidenav;
  public stores:any;
  public users:any;
  public loggedUser:any = null;
  public loggedUserRole!: String;
  public storeId!: string
  

  constructor(
    private _userService:UserService,
    private _authService:AuthService,
    private _comprasService:ComprasService,
    private _sidenavService:SidenavService
  ) { 
    if (this._authService.loggedIn()){
      console.log("ESTOY LOGUEADOOOOOOOOO SIDEBARRRRRRRRR")
      const userId = this._authService.getDecodedAccessToken(String(this._authService.getToken())).id
      
      this.getUserByIdAndPopulateStores(userId)

    }
  }

  async ngOnInit(): Promise<void> {
    this.loggedUserRole = String(localStorage.getItem("loggedUserRole"))
    /*
    if (this._authService.loggedIn()){
      const userId = this._authService.getDecodedAccessToken(String(this._authService.getToken())).id
      console.log("cargo el sidebar")
      await this.getUserByIdAndPopulateStores(userId)
    }
    */
  }

  emitirItemMenuSeleccionado(itemMenuSeleccionado: string){
    
    localStorage.setItem("itemMenuSeleccionado", itemMenuSeleccionado)

  }
 
  getUserByIdAndPopulateStores = async (userId:string) => {
    console.log("le estoy pasando el if desde el sidebar a getUserByIdAndPopulateStores() " +userId )
    this._userService.getUserByIdAndPopulateStores(userId)
    .subscribe({
      next: (v) => {
        
        console.log("viene el next con lo que meti dentro de global.loggedUser")
        console.log(v)
        this.loggedUser=v;
        
        global.loggedUser = this.loggedUser
        global.reloadNeeded = false
        global.loggedUserDB = v.adminMasterDBuser 
        global.loggedUserID = v._id 
        global.loggedUserRole = v.roles[0].roleName
        global.loggedUserName = v.username 
        global.loggedUserEmail = v.email
        this.loggedUserRole = v.roles[0].roleName

      },
      error: (e) => console.error(e),
      complete: () => console.info('este es el complete') 
    })
  }
 

}
