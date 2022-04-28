import { Component, OnInit } from '@angular/core';
import { global } from 'src/app/services/global';
import { UserService } from 'src/app/services/user.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-nuevo-vendedor',
  templateUrl: './nuevo-vendedor.component.html',
  styles: [
  ]
})
export class NuevoVendedorComponent implements OnInit {
  public title!: string;
  public url!:string;
  public branchId!:string;
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
    this.title = "N U E V O    V E N D E D O R"
  }

  ngOnInit(): void {
  }
  onSubmit(form: any){
    //obtengo el id de la tienda que estoy visitando
    console.log("INTENTANDO CREAR USUARIO DESDE LA TIENDA")
    this._route.params.subscribe(
      params => {
        this.branchId = params['id']
        console.log("esto es lo que me trajo el params: branchId:" + this.branchId)
        this._userService.createNewVendedorUser(this.branchId, this.nuevoUsuario)
        .subscribe({
          next: (v) => {
            console.log("userService.createNewVendedorUser")
            console.log(v)
            this._router.navigate(['/sucursal', this.branchId,'usuarios']);     
          },
          error: (e) => console.error(e),
          complete: () => console.info('este es el complete') 
        })   
      }
    )
    
    
  }

}
