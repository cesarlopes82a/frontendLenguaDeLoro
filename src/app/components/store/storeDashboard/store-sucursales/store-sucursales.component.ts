import { Component, OnInit } from '@angular/core';
import { global } from 'src/app/services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-store-sucursales',
  templateUrl: './store-sucursales.component.html',
  styles: [
  ]
})
export class StoreSucursalesComponent implements OnInit {
  public url: string = "";
  public loggedUser:any;
  public storeId:any;

  constructor(
    private _route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    console.log("OnInit desde StoreSucursalesComponent.components")
 //   console.log(" global.reloadNeeded: " + global.reloadNeeded)
   
    this.url = global.url
    
    this.loggedUser = global.loggedUser
    
    //obtengo el id de la tienda que estoy visitando
    this._route.params.subscribe(
      params => {
        this.storeId = params['id']
      }
    )
    

  }

}
