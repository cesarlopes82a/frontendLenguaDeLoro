import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { ComprasService } from 'src/app/services/compras.service';
import { SidenavService } from 'src/app/services/sidebar.service';
import { global } from 'src/app/services/global';


export interface UserData {
  id: string;
  name: string;
  progress: string;
  fruit: string;
}

@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styles: [
  ],
  providers:[SidenavService]
})

export class ComprasComponent implements OnInit {
  public branchId!: string;
  public storeId!: string;
  public title!: string;
  public url!: string;
  public comprasByBranch!: any
  public comprasByBranchAndPopulatedInfo!: any
  public quieroEliminarEsteRegistro!:string;
  public sucursalNombre!: string

  constructor(
    private _route: ActivatedRoute,
    private _comprasService: ComprasService,
    private _sidenavService: SidenavService
  ) {

  }

  ngAfterViewInit() {

  }



  
  
  ngOnInit(): void {
    
    this.sucursalNombre = String(localStorage.getItem('itemMenuSeleccionado'))
        
    this._route.params.subscribe(
      params => {
        this.branchId = params['id']
        console.log("esto es lo que me trajo el params: branchId:" + this.branchId)
      }
    )
    this.getComprasByBranch(this.branchId)
    this.getComprasByBranchAndPopulateInfo(this.branchId)
  }
  async getComprasByBranch(branchId:string){
    this._comprasService.getComprasByBranch(branchId)
    .subscribe({
      next: (v) => {
        console.log("estos son las compras de la sucursal ")
        console.log(v)
        this.comprasByBranch =  v

      },
      error: (e) => console.error(e),
      complete: () => console.info('este es el complete') 
    })
  }
  async getComprasByBranchAndPopulateInfo(branchId:string){
    this._comprasService.getComprasByBranchAndPopulateInfo(branchId)
    .subscribe({
      next: (v) => {
        console.log("estas son las compras de la sucursal populated")
        console.log(v)
        this.comprasByBranchAndPopulatedInfo =  v
        if(this.comprasByBranchAndPopulatedInfo.lenght>0) this.sucursalNombre = this.comprasByBranchAndPopulatedInfo[0].branchId.branchName

      },
      error: (e) => console.error(e),
      complete: () => console.info('este es el complete') 
    })
  }
  pidoEliminar(idCompra:string){
    this.quieroEliminarEsteRegistro=idCompra;
    console.log("es este: " + this.quieroEliminarEsteRegistro)
  }
  consultoEstadoEliminar(idCompra:string){
    if(idCompra==this.quieroEliminarEsteRegistro) return true;
    return false;
  }
  pidoCancelarEliminar(){
    this.quieroEliminarEsteRegistro="";
  }
  deleteUsuario(idCompra:string){
    console.log("intento eliminar el usuario")
  }

  
  

}
