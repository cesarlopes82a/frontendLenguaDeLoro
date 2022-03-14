import { Component, OnInit } from '@angular/core';
import { global } from 'src/app/services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: [
  ],
})
export class UsersComponent implements OnInit {
  public title: string;
  public usuarios!: any;
  public usuariosPopulated!: any;
  public quieroEliminarEsteUsuario!:string;
  public url!:string;

  constructor(
    private _userService:UserService,
  ) {
    this.url = global.url,
    this.title = "U S U A R I O S"
  }

  ngOnInit(){
    //this.getUsers()
    this.getUsersAndPopulate()

    console.log("ya cargue los usuarios")
    console.log(this.usuarios)
  }

  testClick(){
    console.log("hice click en el boton")
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
        this.usuarios.forEach((usuario: any) => {
          console.log("el rol")
          usuario.roles.forEach((role: any) => {
            console.log(role.roleName)  
          });
          
        });
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
