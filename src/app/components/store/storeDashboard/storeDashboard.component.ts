import { Component, OnInit, Input } from '@angular/core';
import { StoreService } from '../../../services/store.service';
import { BranchService } from  '../../../services/branch.service';
import { Store } from '../../../models/store';
import { global } from '../../../services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { ComprasService } from '../../../services/compras.service';


@Component({
  selector: 'app-storeDashboard',
  templateUrl: './storeDashboard.component.html',
  styles: [
  ],
  providers: [StoreService]
})
export class StoreDashboardComponent implements OnInit {
  
  public title: string;
  public url: string = "";
  //public urlImageCompras: string = "http://localhost:4011/api/images/compras/compras.png"
  public store: any;
  public branch: any;
  public user:any;
  public storeId:any;
  public branchId:any;
  public loggedUser:any;
  public loggedUserRole: string = String(localStorage.getItem("loggedUserRole"))

  @Input() userService!: UserService;

  public ruta: string="";

  constructor(
    private _storeService: StoreService,
    private _branchService: BranchService,
    private _userService: UserService,
    private _comprasService: ComprasService,
    private _router: Router,
    private _route: ActivatedRoute     
  ) {
    this.title = "Tienda-Sucursal " 

   }
 
  ngOnInit(): void {
    console.log("OnInit desde StoreDashboardComponent.components")
 //   console.log(" global.reloadNeeded: " + global.reloadNeeded)
   
      this.url = global.url
      //obtengo la ruta desde la url para ver si estoy en tieneda o una sucursal
      this.ruta = String(this._route.snapshot.url[0])
      this.loggedUser = global.loggedUser
      this.loggedUserRole = String(localStorage.getItem("loggedUserRole"))
      
      
      //console.log(this._route.snapshot.url[0])
      if(this.ruta == "tienda"){
        this._route.params.subscribe(
          params => {
            this.storeId = params['id']
            if(global.reloadNeeded==false){
              let storeId = this.storeId
              let title = ""
              this.loggedUser.tiendas.every(function(tiendas:any) {
                console.log("este es un elementoooooooooo")
                console.log(tiendas);
                console.log("tiendas.store._id  ->" + tiendas.store._id);
                if(tiendas.store._id == storeId){
                  title = tiendas.store.storeName
                  return false
                }
                return true
              });
              this.title = title
            }else{
              this.store = this.getStoreById(this.storeId)
              this.title = this.store.storeName
            }
          }
        )
      }
      
      if(this.ruta == "sucursal"){
          this._route.params.subscribe(
            params => {
              this.branchId = params['id']
              if(global.reloadNeeded==false){
                let branchId = this.branchId
                let title = ""
                this.loggedUser.tiendas?.every(function(tiendas:any) {
                  if (title != ""){
                    return false
                  }
                  tiendas.branches.every(function(branches:any) {
                    console.log("branches._id  ->" + branches._id);
                    console.log(branches.branchName);
                    if(branches._id == branchId){
                      title = branches.branchName
                      return false
                    }
                    return true
                  });
                  return true
                });
                this.title = title
              }else {
                this.branch=this.getBranchById(this.branchId)
                this.title = this.branch.branchName
              }              
            }
          )
      }
  }
  
  getStoreById(storeId:string){
    console.log("getStoreById desde el storeDashboard.component")
    this._storeService.getStoreById(storeId)
    .subscribe({
      next: (v) => {
        console.log("viene el next")
        console.log(v)
        
        return v
      },
      error: (e) => console.error(e),
      complete: () => console.info('_storeService.getStoreById successfully completed') 
    })
  }

  getBranchById(branchId:string){
    console.log("getBranchById desde el storeDashboard.component")
    this._branchService.getBranchById(branchId)
    .subscribe({
      next: (v) => {
        console.log("viene el next")
        console.log(v)
        return v
      },
      error: (e) => console.error(e),
      complete: () => console.info('_branchService.getBranchById successfully completed') 
    })
  }

  envioStoreId(){
    console.log("ENVIO EL STOREID")
    this._comprasService.pasoStoreId.emit({storeId:this.storeId})
  }
}
