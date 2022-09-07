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
  public itemMenuSeleccionadoId!:string
  public itemMenuSeleccionado!:string
  

  constructor(
    private _userService:UserService,
    private _authService:AuthService,
  ) { 
    if (this._authService.loggedIn()){
      console.log("ESTOY LOGUEADOOOOOOOOO SIDEBARRRRRRRRR")
      const userId = this._authService.getDecodedAccessToken(String(this._authService.getToken())).id
      
      this.getUserByIdAndPopulateStores(userId)

    }
  }

  async ngOnInit(): Promise<void> {
    this.loggedUserRole = String(localStorage.getItem("loggedUserRole"))    
  }

  emitirItemMenuSeleccionado(itemMenuSeleccionado: string, itemMenuSeleccionadoId:string, defaultListaDP:any){
    console.log("esta es la lista defaultttttt------------")
    console.log(defaultListaDP)
    this.itemMenuSeleccionadoId = itemMenuSeleccionadoId
    this.itemMenuSeleccionado = itemMenuSeleccionado
    console.log("el itemMenuSeleccionado")
    console.log(this.itemMenuSeleccionado)
    
    localStorage.setItem("defaultListaDP", defaultListaDP)

    ///Esto es para actualiar la ldp del datasouce si mofifique alguna ldp default
    let ldpUpdated = localStorage.getItem("ldpUpdated")
    
    console.log(ldpUpdated)
    if( ldpUpdated == "true"){
      console.log("hay que actualizaaaarrr!!!!!!!!!!!!!!!!!!!!!!!!!! ")
      let ldpUpdatedTarget = String(String(localStorage.getItem("ldpUpdatedTarget")))     //Esta es la tienda o la sucursal seleccionada a la que se le modifico la Default ldp 
      let newLdpDefaultForTarget = String(localStorage.getItem("newLdpDefaultForTarget")) //Esto me dice cual es la ldp default que tengo que asignarle al ldpUpdatedTarget
      //recorro las tiendas y las branch para encontrar la ldp default que modifique/actualicé/asigné antes
      for (let i=0; i<this.loggedUser.tiendas.length; i++) {        
        console.log("-target: " + ldpUpdatedTarget)
        console.log("t: " + this.loggedUser.tiendas[i]._id)
        if(String(this.loggedUser.tiendas[i]._id) == ldpUpdatedTarget){
          console.log("igualessssss-----------")
          this.loggedUser.tiendas[i].defaultListaDP = newLdpDefaultForTarget          
          localStorage.setItem("ldpUpdated", "false")
          if(itemMenuSeleccionadoId==this.loggedUser.tiendas[i]._id){
            localStorage.setItem("defaultListaDP", newLdpDefaultForTarget)
          }
          break
        }else{
          for (let x=0; x < this.loggedUser.tiendas[i].branches.length; x++) {
            console.log("B: " + this.loggedUser.tiendas[i].branches[x]._id)
            if(String(this.loggedUser.tiendas[i].branches[x]._id) == ldpUpdatedTarget){
              console.log("igualessssss-----------")
              this.loggedUser.tiendas[i].branches[x].defaultListaDP = newLdpDefaultForTarget
              localStorage.setItem("ldpUpdated", "false")
              if(itemMenuSeleccionadoId==this.loggedUser.tiendas[i].branches[x]._id){
                localStorage.setItem("defaultListaDP", newLdpDefaultForTarget)
              }
            }
          }
        }
      }
    }
    
    localStorage.setItem("itemMenuSeleccionado", itemMenuSeleccionado)
    localStorage.setItem("itemMenuSeleccionadoId", itemMenuSeleccionadoId)
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
