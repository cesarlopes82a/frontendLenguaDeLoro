import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SupplierService } from 'src/app/services/supplier.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Proveedor } from 'src/app/models/proveedor';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-editar-supplier',
  templateUrl: './editar-supplier.component.html',
  styles: [
  ]
})
export class EditarSupplierComponent implements OnInit {
  public proceedorRecibido!:any
  public proveedor!: Proveedor;
  public categoriasRubros!: any;
  public proveedorId!: string;
  constructor(
    private _supplierService: SupplierService,
    private _categoryService: CategoryService,
    private _router: Router,
    private _route: ActivatedRoute,
  ) { 
    this.getCategories()
    this.proveedor = new Proveedor('','','','','','');
  }

  ngOnInit(): void {
    this._route.params.subscribe(
      params => {
        this.proveedorId = params['id']                
        this.obtenerDatosDelProveedorQueQuieroEditar(this.proveedorId)
    })       
  }
  getCategories(){
    this._categoryService.getCategories()
    .subscribe({
      next: (v) => {
        console.log("las cateeeeeeeeee------")
        console.log(v)
        this.categoriasRubros = v;
      },
      error: (e) => console.error(e),
      complete: () => console.info('complete') 
    })
  }
  onChangeCategoria($event: any) {
    this.proveedor.categoriaRubro=$event.target.value    
  }

  onSubmit(form: any){
    this._supplierService.postUpdateProveedor(this.proveedor).subscribe({
      next: (v) => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Proveedor actualizado exitosamente!!',
          showConfirmButton: false,
          timer: 1500
        })
      },
      error: (e) => {
        
        Swal.fire({
          icon: 'error',
          title: 'Hubo un problema al intentar actualizar el proveedor!',
          text: e.error,
          //footer: '<a href="">Why do I have this issue?</a>'
        })        
        console.error(e)
      },
      complete: () => {
        console.info('complete') 
        this._router.navigate(['/proveedores'])
      }
    })
  }

  obtenerDatosDelProveedorQueQuieroEditar(proveedorId:string){
    this._supplierService.getProveedorById(proveedorId).subscribe({
      next: (v) => {
        console.log("--------traigoooo")
        console.log(v)
        
        this.proveedor._id = v._id
        this.proveedor.proveedorName = v.proveedorName
        this.proveedor.nroContacto = v.nroContacto
        this.proveedor.emailContacto = v.emailContacto
        this.proveedor.descripProovedor = v.descripProovedor
        this.proveedor.categoriaRubro = v.categoriaRubro._id

      },
      error: (e) => {
        
        console.error(e)
      },
      
      complete: () => console.info('complete') 
    })
  }
}
