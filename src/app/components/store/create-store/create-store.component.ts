import { Component, OnInit } from '@angular/core';
import { Store } from '../../../models/store'
import { StoreService } from 'src/app/services/store.service';
import { global } from 'src/app/services/global';

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
      private _storeService: StoreService
    ) {
      this.title = "Crear nueva tienda"
      this.store = new Store('','',[]);
      
     }
  
    ngOnInit(): void {

    }
  
    onSubmit(form: any){
      console.log(localStorage.getItem('loggedUserRole'))
      this._storeService.saveStore(this.store)
      .subscribe({
        next: (v) => {
          console.log(v)
          window.location.reload();
        },
        error: (e) => console.error(e),
        complete: () => console.info('este es el complete despoes de agregar una tienda') 
      })
      
    }
  
  }
