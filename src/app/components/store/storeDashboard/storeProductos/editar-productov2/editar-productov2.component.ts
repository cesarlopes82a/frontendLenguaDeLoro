import { Component, Injectable, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { Product } from '../../../../../models/product';
import Swal from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-editar-productov2',
  templateUrl: './editar-productov2.component.html',
  styles: [
  ]
})
export class EditarProductov2Component implements OnInit {
  public originalDataProduct! : any
  public productId!: string
  public storeId!: string
  public producto!: Product;
  public product!:any
  public habilitarGuardar: boolean = false
  public categoriasRubros: any;  

  constructor(
    private _route: ActivatedRoute,
    private router: Router,
    private _productService: ProductService,
    private _categoryService: CategoryService,
  ) {
    this.getCategories()
    this.producto = new Product('','','','','');
  }

  setHabilitarGuardar(){
    this.habilitarGuardar=true
  }

  onChangeCategoria($event: any) {
  this.producto.categoria=$event.target.value
  this.habilitarGuardar = true

  }
  onChangeUnidadMedida($event: any) {
  this.producto.unidadMedida=$event.target.value
  this.habilitarGuardar=true
  }

  ngOnInit() {
    this._route.params.subscribe(
      params => {
        this.productId = params['id']
        this.storeId = params['sid']

    })

    this.obtenerDatosDelProductoQueQuieroEditar(this.productId)

    this._productService.enviarDatosProductoQueQuieroEditar.subscribe( data => {
      this.originalDataProduct = data.data      
    })

  }
  showData(){

  }

  getCategories(){
    this._categoryService.getCategories()
    .subscribe({
      next: (v) => {
        this.categoriasRubros = v;

      },
      error: (e) => console.error(e),
      complete: () => console.info('complete') 
    })
  }
  
  obtenerDatosDelProductoQueQuieroEditar(productId:string){
    this._productService.getProductById(productId).subscribe({
      next: (v) => {

        this.product = v
        this.producto.productName = this.product.productName
        this.producto.codigo = this.product.codigo
        this.producto._id = this.product._id
        this.producto.unidadMedida = this.product.unidadMedida
        this.producto.categoria = this.product.categoriaRubro.categoryName

      },
      error: (e) => {
        
        console.error(e)
      },
      
      complete: () => console.info('complete') 
    })
  }

  onSubmit(form: any){
    this.producto.categoria = this.product.categoriaRubro._id
    this._productService.postUpdateProducto(this.producto).subscribe({
      next: (v) => {
        console.log("despues del saveProducto")
        console.log(v)

        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Producto actualizado exitosamente!!',
          showConfirmButton: false,
          timer: 1500
        })
        
        this.router.navigate(['/tienda', this.storeId,'productos'])
      },
      error: (e) => {
        
        Swal.fire({
          icon: 'error',
          title: 'Hubo un problema al intentar actualizar el producto!',
          text: e.error,
          //footer: '<a href="">Why do I have this issue?</a>'
        })
        
        console.error(e)
      },
      
      complete: () => console.info('complete') 
    })
    
}


}
