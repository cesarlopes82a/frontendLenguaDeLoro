import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { global } from 'src/app/services/global';

@Component({
  selector: 'app-listar-vendedores',
  templateUrl: './listar-vendedores.component.html',
  styles: [
  ]
})
export class ListarVendedoresComponent implements OnInit {
  public title!: string;
  public usuarios!: any;
  public usuariosPopulated!: any;
  public quieroEliminarEsteUsuario!:string;
  public url!:string;
  public branchId:any;

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
        this.branchId = params['id']
        console.log("esto es lo que me trajo el params: branchId:" + this.branchId)
      }
    )

  }
  async getUsersAndPopulate(){
    this._userService.getUsersAndPopulate()
    .subscribe({
      next: (v) => {
        console.log("estos son los usuarios getUsersAndPopulate desde listar-vendedores.components.ts")
        console.log(v)
        this.usuarios =  v
        this.usuarios.forEach((usuario:any)=>{
          console.log("un usuario")
          console.log(usuario.roles[0].roleName)

          usuario.tiendas.forEach((tienda:any)=>{
            console.log("UNA TIENDA")
            console.log(tienda)

            tienda.branches.forEach((branch:any)=>{
              console.log("UNA branch")
              console.log(branch)
            })
          })
        })
        
      },
      error: (e) => console.error(e),
      complete: () => console.info('este es el complete') 
    })
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
