import { Component, OnInit } from '@angular/core';
import { global } from 'src/app/services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: [
  ]
})
export class UsersComponent implements OnInit {
  public title: string;
  public usuarios!: any;
  public quieroEliminarEsteUsuario!:string;
  public url!:string;

  constructor(
    private _userService:UserService,
  ) {
    this.url = global.url,
    this.title = "U S U A R I O S"
  }

  ngOnInit(): void {
    this.getUsers()
    console.log("ya cargue los usuarios")
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
  getUsers(){
    this._userService.getUsers()
    .subscribe({
      next: (v) => {
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

}
