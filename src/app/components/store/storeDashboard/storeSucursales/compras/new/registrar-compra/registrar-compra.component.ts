import { Component, OnInit } from '@angular/core';
import { Params ,Router, ActivatedRoute } from '@angular/router';
import { global } from 'src/app/services/global';
import { Compra } from '../../../../../../../models/compra';
import { ProductService } from '../../../../../../../services/product.service';
import { SupplierService } from '../../../../../../../services/supplier.service';
import { ComprasService } from '../../../../../../../services/compras.service';
import Swal from 'sweetalert2'



@Component({
  selector: 'app-registrar-compra',
  templateUrl: './registrar-compra.component.html',
  styles: [
  ]
})
export class RegistrarCompraComponent implements OnInit {
  public branchId!: string;
  public storeId!: string;
  public title!: string;
  public url!: string;
  public proveedores!: any;
  public productos!: any;
  public productoCodigo!:string
  public productoId!:string
  public proveedorId!:string
  public fechaDeCompra!: string
  public fechaDeVencimiento!: string
  public tieneVencimiento = false
  public habilitoEscaneearCod = false
  public precioUnitario!: number
  public cantidad!: number
  public comentario!:string

  public proveedorSeleccionado:boolean = false  //uso esto para poder validar el formulario
  public productoSeleccionado:boolean = false   //uso esto para poder validar el formulario
  public compra: Compra

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _productService: ProductService,
    private _supplierService: SupplierService,
    private _comprasService: ComprasService
    
  ) { 
    this.url = global.url,
    this.title = "S U C U E S A L:   C O M P R A S"
    
    
    this.getProveedores();
    this.compra = new Compra('','','','',0,0,'','','');
    this.compra.userId = String(localStorage.getItem("loggedUserID"))
  }

  ngOnInit(): void {

    this._route.params.subscribe(
      params => {
        this.branchId = params['id']
        this.getProductosByStoreId(this.branchId);
      }
    )

    this.fechaDeCompra = new Date().toISOString().split('T')[0];
    this.fechaDeVencimiento = new Date().toISOString().split('T')[0];
    
    
  }
  
  onSubmit(form: any){

    this.compra.productId = this.productoId
    this.compra.proveedorId = this.proveedorId
    this.compra.branchId = this.branchId
    this.compra.cantidad = this.cantidad
    this.compra.precioCompraUnitario = this.precioUnitario
    this.compra.fechaCompra = this.fechaDeCompra
    if(this.tieneVencimiento == true){
      this.compra.fechaVencimiento = this.fechaDeVencimiento
    }else{
      this.compra.fechaVencimiento = "2999/01/01"
    }
    this.compra.comentario = this.comentario
    
    console.log(this.compra)

    
    this._comprasService.registrarCompra(this.compra).subscribe({
      next: (v) => {
        console.log("MENSAJE: registrarCompra() - finalizado exitosamente!")
        console.log(v)
        
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Compra registrada con exito!!!',
          showConfirmButton: false,
          timer: 1500
        })
        
        this.compra = new Compra('','','','',0,0,'','','');
        this.compra.userId = String(localStorage.getItem("loggedUserID"))
        let number!:number
        this.productoId = ""
        this.productoCodigo = ""
        this.precioUnitario = number
        this.cantidad = number
       // this._router.navigate(['/sucursal', this.branchId,'compras']);     
      },
      error: (e) => console.error(e),
      complete: () => console.info('complete') 
    })
  

    console.log("onsubmit")
  }

  actualizarComboProd(){
    for(let i=0;i<this.productos.length;i++){
      if(String(this.productos[i].codigo) == String(this.productoCodigo)){
        this.productoId = this.productos[i]._id
      }
    }
  }
  getProveedores(){
    this._supplierService.getProveedores()
    .subscribe({
      next: (v) => {
        console.log("MENSAJE: getProveedores() - finalizado exitosamente!")
        console.log(v)
        this.proveedores = v;
      },
      error: (e) => console.error(e),
      complete: () => console.info('complete') 
    })
  };
  getProductosByStoreId(branchId: string){
    this._productService.getProductosByStoreId(branchId)
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
    this.proveedorSeleccionado = true
    console.log($event.target.value);
    console.log("cambio de proveedor")
    console.log(this.proveedorId)
    
  }
  onChangeProducto($event: any) {
    this.productoSeleccionado=true
    console.log("desde el onChangeProducto")
    console.log($event.target.value);
    console.log("cambio de producto")
    console.log(this.productoId)
    //this.proveedor.categoriaRubro=$event.target.value

    this.productos.forEach((product: any, index: any) => {
      console.log(`${index} : ${product.codigo}`);
      if(`${product._id}` == String($event.target.value)){
        this.productoCodigo = `${product.codigo}`
      }
    });    
  }

}
