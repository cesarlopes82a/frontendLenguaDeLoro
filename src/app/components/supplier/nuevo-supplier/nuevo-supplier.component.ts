import { Component, OnInit } from '@angular/core';
import { Proveedor } from '../../../models/proveedor'
import { CategoryService } from 'src/app/services/category.service';
import { SupplierService } from 'src/app/services/supplier.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

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
        console.log("despues del saveProveedor")
        console.log(v)
       // this._router.navigate(['/tienda', this.storeId,'productos']);     
      },
      error: (e) => console.error(e),
      complete: () => console.info('complete') 
    })
  }
  onChangeCategoria($event: any) {
    
    console.log($event.target.value);
    this.proveedor.categoriaRubro=$event.target.value
    console.log("Categoria: " + this.proveedor.categoriaRubro)
  }


}
