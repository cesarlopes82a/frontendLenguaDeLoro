import { Component, OnInit } from '@angular/core';
import { Proveedor } from '../../../models/proveedor'
import { CategoryService } from 'src/app/services/category.service';
import { SupplierService } from 'src/app/services/supplier.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nuevo-supplier',
  templateUrl: './nuevo-supplier.component.html',
  styles: [
  ]
})
export class NuevoSupplierComponent implements OnInit {
  public proveedor!: Proveedor;
  public categoriasRubros: any;


  constructor(
    private _supplierService: SupplierService,
    private _categoryService: CategoryService,
    private _router:Router
  ) {
    this.getCategories()
    this.proveedor = new Proveedor('','','','','','');
   }

  ngOnInit(): void {
  }
  getCategories(){
    this._categoryService.getCategories()
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
  onSubmit(form: any){

    this._supplierService.saveProveedor(this.proveedor).subscribe({
      next: (v) => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Producto actualizado exitosamente!!',
          showConfirmButton: false,
          timer: 1500
        })
        
        
      },
      error: (e) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'algo salió mal!',
          footer: '<strong>ERROR: </a>' + e
        })
        console.error(e)
      },
      complete: () => {
        this._router.navigate(['/proveedores']);
      }
    })
  }
  onChangeCategoria($event: any) {
    
    console.log($event.target.value);
    this.proveedor.categoriaRubro=$event.target.value
    console.log("Categoria: " + this.proveedor.categoriaRubro)
  }


}
