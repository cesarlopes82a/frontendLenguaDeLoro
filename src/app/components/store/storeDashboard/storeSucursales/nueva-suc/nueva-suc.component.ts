import { Component, OnInit } from '@angular/core';
import { BranchService } from 'src/app/services/branch.service';
import { global } from 'src/app/services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nueva-suc',
  templateUrl: './nueva-suc.component.html',
  styles: [
  ]
})
export class NuevaSucComponent implements OnInit {
  public url: string = "";
  public loggedUser:any;
 

  sucursal={
    storeId:'',
    branchName:'',
    address:''
  }

  constructor(
    private _branchService: BranchService,
    private _route: ActivatedRoute,
    private router:Router
  ) {   }

  ngOnInit(): void {
    console.log("OnInit desde NuevaSucComponent.components")
 //   console.log(" global.reloadNeeded: " + global.reloadNeeded)
   
    this.url = global.url
    
    this.loggedUser = global.loggedUser
    
    //obtengo el id de la tienda que estoy visitando
    this._route.params.subscribe(
      params => {
        this.sucursal.storeId = params['id']
      }
    )
  }
  reload(){
    window.location.reload()
  }
  onSubmit(form: any){
     
    this._branchService.saveBranch(this.sucursal)
      .subscribe({
        next: (v) => {
          console.log(v)
          this.router.navigate(['/sucursal/',v._id])          
          setTimeout(this.reload, 200);
         // window.location.reload();

        },
        error: (e) => {
          
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Algo salió mal al intentar crear la nueva sucursal!',
              footer: '<strong>ERROR: </a>' + e.error.message
              //footer: '<a href="">Why do I have this issue?</a>'
            })
          

          console.error(e)
        },
        complete: () => {
          console.info('este es el complete despoes de agregar una tienda')
          
        }
      })
  }

  

}
