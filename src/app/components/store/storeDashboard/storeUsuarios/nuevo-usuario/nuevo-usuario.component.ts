import { Component, OnInit } from '@angular/core';
import { global } from 'src/app/services/global';
import { UserService } from 'src/app/services/user.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-nuevo-usuario',
  templateUrl: './nuevo-usuario.component.html',
  styles: [
  ]
})
export class NuevoUsuarioComponent implements OnInit {
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
    this.title = "N U E V O    U S U A R I O   a d m i n T i e n d a"

   }

  ngOnInit(): void {
  }
  onSubmit(form: any){
    //obtengo el id de la tienda que estoy visitando
    console.log("INTENTANDO CREAR USUARIO DESDE LA TIENDA")
    this._route.params.subscribe(
      params => {
        this.storeId = params['id']
        console.log("esto es lo que me trajo el params: storeId:" + this.storeId)
        this._userService.createNewAdminTiendaUser(this.storeId, this.nuevoUsuario)
        .subscribe({
          next: (v) => {
            console.log("userService.createNewAdminTiendaUser")
            console.log(v)
            this._router.navigate(['/usuarios']);     
          },
          error: (e) => console.error(e),
          complete: () => console.info('este es el complete') 
        })   
      }
    )
    
    
  }

}
