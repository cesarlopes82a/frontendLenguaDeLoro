import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { global } from 'src/app/services/global';
import { Proveedor } from '../../../../../../../models/proveedor';
import { ProductService } from '../../../../../../../services/product.service';
import { SupplierService } from '../../../../../../../services/supplier.service';

@Component({
  selector: 'app-registrar-compra',
  templateUrl: './registrar-compra.component.html',
  styles: [
  ]
})
export class RegistrarCompraComponent implements OnInit {
  public branchId!: String;
  public title!: String;
  public url!: String;
  public proveedores!: any;
  public productos!: any;
  public proveedor!: Proveedor
  public productoCodigo!:String
  public productoId!:String

  constructor(
    private _route: ActivatedRoute,
    private _productService: ProductService,
    private _supplierService: SupplierService
  ) { 
    this.url = global.url,
    this.title = "S U C U E S A L:   C O M P R A S"
    this.proveedor = new Proveedor('','','','','','');
    this.getProductos();
    this.getProveedores();
  }

  ngOnInit(): void {
    this._route.params.subscribe(
      params => {
        this.branchId = params['id']
        console.log("esto es lo que me trajo el params: branchId:" + this.branchId)
      }
    )
  }
  onSubmit(form: any){

    console.log("onsubmit")
  }
  getProveedores(){
    this._supplierService.getProveedores()
    .subscribe({
      next: (v) => {
        console.log("esto es lo que me mandan de this._supplierService.getProveedores()")
        console.log(v)
        this.proveedores = v;
      },
      error: (e) => console.error(e),
      complete: () => console.info('complete') 
    })
  };
  getProductos(){
    this._productService.getProductos()
    .subscribe({
      next: (v) => {
        console.log("esto es lo que me mandan de this._productService.getProductos()")
        console.log(v)
        this.productos = v;
      },
      error: (e) => console.error(e),
      complete: () => console.info('complete') 
    })
  }
  onChangeProveedor($event: any) {
    
    console.log($event.target.value);
    
  }
  onChangeProducto($event: any) {
    console.log("desde el onChangeProducto")
    console.log($event.target.value);
    //this.proveedor.categoriaRubro=$event.target.value
    console.log(this.productos)
    console.log(this.productos.lenght)
    this.productos.forEach((product: any, index: any) => {
      console.log(`${index} : ${product.codigo}`);
      if(`${product._id}` == String($event.target.value)){
        this.productoCodigo = `${product.codigo}`
      }
    });
   
    console.log(this.productoId)
    
    //console.log("Categoria: " + this.proveedor.categoriaRubro)
    
  }

}
