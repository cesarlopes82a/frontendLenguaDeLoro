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
export class NuevoUsuarioGlobalComponent implements OnInit {
  public title!: string;
  public url!:string;

  nuevoUsuario={
    username:'',
    password:'',
    roles:["admin"]
  }


  constructor(
    private _userService:UserService,
    private _router: Router,
  ) {
    this.url = global.url,
    this.title = "N U E V O    U S U A R I O"

   }

  ngOnInit(): void {
  }

  onSubmit(form: any){
    
    this._userService.createNewUser(this.nuevoUsuario)
    .subscribe({
      next: (v) => {
        console.log("userService.createNewUser")
        console.log(v)
        this._router.navigate(['/usuarios']);     
      },
      error: (e) => console.error(e),
      complete: () => console.info('este es el complete') 
    })   
  }
}
