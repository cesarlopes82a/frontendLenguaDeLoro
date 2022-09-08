import { Component, OnInit,ViewChild } from '@angular/core';
import { StoreService } from 'src/app/services/store.service';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { global } from 'src/app/services/global';
import { MatSidenav } from '@angular/material/sidenav';
import { ComprasService } from 'src/app/services/compras.service';
import { SidenavService } from 'src/app/services/sidebar.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';



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
    private _sidenavService: SidenavService,
    private _storeService: StoreService,
    private router: Router
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

    this.itemMenuSeleccionadoId = itemMenuSeleccionadoId
    this.itemMenuSeleccionado = itemMenuSeleccionado

    
    localStorage.setItem("defaultListaDP", defaultListaDP)

    ///Esto es para actualiar la ldp del datasouce si mofifique alguna ldp default
    let ldpUpdated = localStorage.getItem("ldpUpdated")
    
    console.log(ldpUpdated)
    if( ldpUpdated == "true"){

      let ldpUpdatedTarget = String(String(localStorage.getItem("ldpUpdatedTarget")))     //Esta es la tienda o la sucursal seleccionada a la que se le modifico la Default ldp 
      let newLdpDefaultForTarget = String(localStorage.getItem("newLdpDefaultForTarget")) //Esto me dice cual es la ldp default que tengo que asignarle al ldpUpdatedTarget
      //recorro las tiendas y las branch para encontrar la ldp default que modifique/actualicé/asigné antes
      for (let i=0; i<this.loggedUser.tiendas.length; i++) {        

        if(String(this.loggedUser.tiendas[i]._id) == ldpUpdatedTarget){
  
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

  reload(){
    window.location.reload()
  }
 
  deleteTienda(storeId:string){
    console.log(storeId)
    Swal.fire({
      title: 'Eliminar TIENDA de forma permanente.',      
      text: "¿esta seguro? Esta accion no puede revertirse!",
      icon: 'warning',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'ELIMINAR',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {

        console.log(storeId)
            
        this._storeService.eliminarTienda(storeId).subscribe({
          next: (v) => {
            console.log("MENSAJE: eliminarTienda() - Finalizado Exitosamente!")
            console.log(v)
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Tienda eliminada exitosamente!!',
              showConfirmButton: false,
              timer: 1500
            })
            this.router.navigate(['/private'])
            setTimeout(this.reload, 200);
          },
          error: (e) => {
            console.error(e)
            if(e.status == 500){
              Swal.fire({
                icon: 'error',
                title: 'No es posible eliminar...',
                text: 'Algo salió mal al intentar eliminar la tienda - DB error!',
                //footer: '<a href="">Why do I have this issue?</a>'
              })
            }
          
          },
          complete: () => {
            
          }
        })


       // Swal.fire('Saved!', '', 'success')
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })
  }

}
