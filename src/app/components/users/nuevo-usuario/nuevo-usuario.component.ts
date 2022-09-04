import { Component, OnInit } from '@angular/core';
import { global } from 'src/app/services/global';
import { UserService } from 'src/app/services/user.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nuevo-usuario',
  templateUrl: './nuevo-usuario.component.html',
  styles: [
  ]
})
export class NuevoUsuarioGlobalComponent implements OnInit {
  public title!: string;
  public url!:string;
  public storeId!:string;

  nuevoUsuario={
    username:'',
    password:''
  }

  constructor(
    private _userService:UserService,
    private _router: Router,
    private _route:ActivatedRoute
  ) {
    this.url = global.url,
    this.title = "N U E V O    U S U A R I O     adminGlobal"

   }

  ngOnInit(): void {
  }

  onSubmit(form: any){
    //obtengo el id de la tienda que estoy visitando
    console.log("INTENTANDO CREAR USUARIO adminGlobal")
    this._route.params.subscribe(
      params => {
        this.storeId = params['id']
        this._userService.createNewUser(this.nuevoUsuario)
        .subscribe({
          next: (v) => {
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Administrador global creado exitosamente!!',
              showConfirmButton: false,
              timer: 1500
            })
          },
          error: (e) => {
            if(e.status==400){
              Swal.fire({
                icon: 'error',
                title: 'Usuario existente!',
                text: 'El usuario que intenta crear ya existe en la DB!',
                footer: '<strong>ERROR: </a>' + e.error.message
              })
            }else{
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'algo salió mal!',
                footer: '<strong>ERROR: </a>' + e.error.message
              })
            }
            console.error(e)
          },
          complete: () => {
            this._router.navigate(['/usuarios']);
          }
        })   
      }
    )    
  }
}
