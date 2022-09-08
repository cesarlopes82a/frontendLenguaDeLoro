import { Component, OnInit } from '@angular/core';
import { Store } from '../../../models/store'
import { StoreService } from 'src/app/services/store.service';
import { global } from 'src/app/services/global';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { SidenavService } from 'src/app/services/sidebar.service';

@Component({
  selector: 'app-create-store',
  templateUrl: './create-store.component.html',
  styles: [
  ],
  providers: [StoreService]
})
export class CreateStoreComponent implements OnInit {

    public title: string;
    public store: Store;
    
    constructor(
      private _storeService: StoreService,
      private _sidenavService: SidenavService,
      private router:Router
    ) {
      this.title = "Crear nueva tienda"
      this.store = new Store('','',[]);
      
     }
  
    ngOnInit(): void {

    }

    reload(){
      window.location.reload()
    }
  
    onSubmit(form: any){
      console.log(localStorage.getItem('loggedUserRole'))
      this._storeService.saveStore(this.store)
      .subscribe({
        next: (v) => {
          console.log(v)
          this.router.navigate(['/tienda/',v._id])
          
          setTimeout(this.reload, 200);

         // window.location.reload();

        },
        error: (e) => {
          
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Algo salió mal al intentar crear la nueva tienda!',
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
