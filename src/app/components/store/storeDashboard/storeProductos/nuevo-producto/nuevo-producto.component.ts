import { Component, OnInit } from '@angular/core';
import { Product } from '../../../../../models/product';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import Swal from 'sweetalert2'
 
@Component({
  selector: 'app-nuevo-producto',
  templateUrl: './nuevo-producto.component.html',
  styles: [
  ]
})
export class NuevoProductoComponent implements OnInit {
  public title!: string;
  public producto!: Product;
  public productoGuardado!:Product;
  public status:string=""; 
  public nombreProd:string="";
  public codigoProd:string="";
  public categoriasRubros: any;
  public storeId!:string;
  public categoriaseleccionada: boolean = false
  
  
  
  constructor(
    private _categoryService: CategoryService,
    private _productService: ProductService,
    private _router: Router,
    private _route: ActivatedRoute 
    
  ) {
    this.title = "Agregar nuevo producto"
    this.producto = new Product('','','','','');
    this.producto.unidadMedida="Unidades"
       
    
    console.log("###################3####################################")
    
    
   // console.log("esto va despues del getCategorias")
   // console.log(this.categoriasRubros)
   }

   onChangeCategoria($event: any) {
    console.log($event.target.value);
    this.producto.categoria=$event.target.value
    console.log("Categoria: " + this.producto.categoria)
    this.categoriaseleccionada = true

   }
   onChangeUnidadMedida($event: any) {
    console.log($event.target.value);
    this.producto.unidadMedida=$event.target.value
    console.log("Unidad de Medida: " + this.producto.unidadMedida)
   }

  ngOnInit(): void {
    this._route.params.subscribe(
      params => {
        this.storeId = params['id']
        this.getCategories()
      })
      
  }
  onSubmit(form: any){

      this._productService.saveProducto(this.producto,this.storeId).subscribe({
        next: (v) => {
          console.log("despues del saveProducto")
          console.log(v)

          this._router.navigate(['/tienda', this.storeId,'productos']);   
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Producto registrado exitosamente!!',
            showConfirmButton: false,
            timer: 1500
          })  
        },
        error: (e) => {
          if(e.status == 403){
            Swal.fire({
              icon: 'error',
              title: 'El producto ya existe dentro de la DB de productos!',
              text: e.error,
              //footer: '<a href="">Why do I have this issue?</a>'
            })
            
          }
          console.error(e)
        },
        
        complete: () => console.info('complete') 
      })
  }
    

  
  getCategories(){
    console.log("esta esssssssssssssssssssssssssss")
    console.log(this.storeId)
    this._categoryService.getCategoriasByStoreId(this.storeId)
    .subscribe({
      next: (v) => {
        console.log("esto es lo que me mandan de categorias")
        console.log(v)
        this.categoriasRubros = v;
        console.log("ahora lo cargo en this.categofsafsa")
        console.log(this.categoriasRubros)
      },
      error: (e) => console.error(e),
      complete: () => console.info('complete') 
    })
  }


  saveProduct(newProduct:Product){

  }



}
