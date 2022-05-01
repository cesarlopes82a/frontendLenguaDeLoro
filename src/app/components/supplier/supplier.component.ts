import { Component, OnInit } from '@angular/core';
import { Proveedor } from '../../models/proveedor'
import { CategoryService } from 'src/app/services/category.service';
import { SupplierService } from 'src/app/services/supplier.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styles: [
  ]
})
export class SupplierComponent implements OnInit {
  public title!: string;
  public proveedores!: any;
  public quieroEliminarEsteProveedor!:string;

  constructor(
    private _supplierService: SupplierService,
  ) { 
    this.title = "P   R   O   V   E   D   O   R   E   S"
  }

  ngOnInit(): void {
    this.getProveedores()
  }
  getProveedores(){
    console.log("estoy dentro del getProductos()")
    this._supplierService.getProveedores()
    .subscribe({
      next: (response) => {
        console.log(response)
        
          this.proveedores = response;
          console.log("despues de la asgnacion")
          console.log(this.proveedores)

       // window.location.reload();
      },
      error: (e) => console.error(e),
      complete: () => console.info('este es el complete despoes de traer los productos') 
      })
  }
  pidoEliminar(idProducto:string){
    this.quieroEliminarEsteProveedor=idProducto;
    console.log("es este: " + this.quieroEliminarEsteProveedor)
  }
  consultoEstadoEliminar(idProducto:string){
    if(idProducto==this.quieroEliminarEsteProveedor) return true;
    return false;
  }
  pidoCancelarEliminar(){
    this.quieroEliminarEsteProveedor="";
  }
  deleteProveedor(id:string){
    console.log("intento eliminar el producto")
    /*
    this._productService.deleteProducto(id).subscribe(
      response => {
        if(response.producto){
          this._router.navigate(['/productos/listar'])
        }
      },
      error => {
        console.log(<any>error);
      }
    )
    location.reload(true);
    */
  }

}
