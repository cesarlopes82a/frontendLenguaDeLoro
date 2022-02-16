import { Component, OnInit } from '@angular/core';
import { Store } from '../../../models/store'
import { StoreService } from 'src/app/services/store.service';

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
      console.log(this.store)
      this._storeService.saveStore(this.store).subscribe(
        res => {
          console.log(res)
          window.location.reload();
        },
        err => {
          console.log(<any>err)
        }
      )
    }
  
  }
