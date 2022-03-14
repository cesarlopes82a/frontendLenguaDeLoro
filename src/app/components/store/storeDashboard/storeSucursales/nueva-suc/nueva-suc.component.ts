import { Component, OnInit } from '@angular/core';
import { BranchService } from 'src/app/services/branch.service';
import { global } from 'src/app/services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';

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
    private _route: ActivatedRoute
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
  onSubmit(form: any){
    console.log(this.sucursal)
    this._branchService.saveBranch(this.sucursal).subscribe(
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
