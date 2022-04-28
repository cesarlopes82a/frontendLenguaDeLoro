import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { global } from 'src/app/services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-store-usuarios',
  templateUrl: './store-usuarios.component.html',
  styles: [
  ]
})
export class StoreUsuariosComponent implements OnInit {

  public title: string;
  public usuarios!: any;
  public usuariosPopulated!: any;
  public quieroEliminarEsteUsuario!:string;
  public url!:string;
  public storeId:any;

  constructor(
    private _userService:UserService,
    private _route: ActivatedRoute
  ) {
    this.url = global.url,
    this.title = "T I E N D A:   U S U A R I O S"
  }

  ngOnInit(){
    //this.getUsers()
    this.getUsersAndPopulate()

    //obtengo el id de la tienda que estoy visitando
    this._route.params.subscribe(
      params => {
        this.storeId = params['id']
        console.log("esto es lo que me trajo el params: storeId:" + this.storeId)
      }
    )

  }

  pidoEliminar(idUsuario:string){
    this.quieroEliminarEsteUsuario=idUsuario;
    console.log("es este: " + this.quieroEliminarEsteUsuario)
  }
  consultoEstadoEliminar(idUsuario:string){
    if(idUsuario==this.quieroEliminarEsteUsuario) return true;
    return false;
  }
  pidoCancelarEliminar(){
    this.quieroEliminarEsteUsuario="";
  }
  async getUsersAndPopulate(){
    this._userService.getUsersAndPopulate()
    .subscribe({
      next: (v) => {
        console.log("estos son los usuarios getUsersAndPopulate")
        console.log(v)
        this.usuarios =  v
      },
      error: (e) => console.error(e),
      complete: () => console.info('este es el complete') 
    })
  }
  deleteUsuario(idUsuario:string){
    console.log("intento eliminar el usuario")
  }

  async getUsers(){
    this._userService.getUsers()
    .subscribe({
      next: (v) => {
        console.log("estos son los usuarios")
        console.log(v)
        this.usuarios =  v
      },
      error: (e) => console.error(e),
      complete: () => console.info('este es el complete') 
    })
  }

}
