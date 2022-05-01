import { Component, OnInit } from '@angular/core';
import { Product } from '../../../../models/product';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-store-productos',
  templateUrl: './store-productos.component.html',
  styles: [
  ]
})
export class StoreProductosComponent implements OnInit {
  public title!: string;
  public storeId!:string;
  public productos!: any;
  public quieroEliminarEsteProducto!:string;
  

  constructor(
    private _categoryService: CategoryService,
    private _productService: ProductService,
    private _route: ActivatedRoute 
  ) {
    this.title = "P   R   O   D   U   C   T   O   S"


   }
  ngOnInit(): void {
    this._route.params.subscribe(
      params => {
        this.storeId = params['id']
      })
    this.getProductos()
    
    
  }
  
  getProductos(){
    console.log("estoy dentro del getProductos()")
    this._productService.getProductos()
    .subscribe({
      next: (response) => {
        console.log(response)
        
          this.productos = response;
          console.log("despues de la asgnacion")
        console.log(this.productos)

       // window.location.reload();
      },
      error: (e) => console.error(e),
      complete: () => console.info('este es el complete despoes de traer los productos') 
      })
  }
  pidoEliminar(idProducto:string){
    this.quieroEliminarEsteProducto=idProducto;
    console.log("es este: " + this.quieroEliminarEsteProducto)
  }
  consultoEstadoEliminar(idProducto:string){
    if(idProducto==this.quieroEliminarEsteProducto) return true;
    return false;
  }
  pidoCancelarEliminar(){
    this.quieroEliminarEsteProducto="";
  }
  deletePrducto(id:string){
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
