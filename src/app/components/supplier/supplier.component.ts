import { Component, OnInit,ViewChild } from '@angular/core';
import { Proveedor } from '../../models/proveedor'
import { CategoryService } from 'src/app/services/category.service';
import { SupplierService } from 'src/app/services/supplier.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

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

  displayedColumns: string[] = ['id', 'Nombre', 'Contacto', 'Email', 'Categoria/Rubro','menu'];
  public dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;  

  constructor(
    private _supplierService: SupplierService,
    private _router: Router,
  ) { 
    this.title = "P   R   O   V   E   D   O   R   E   S"
  }

  ngOnInit(): void {
    this.getProveedores()
  }
  ngAfterViewInit() {
    if(this.dataSource){
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  updatePaginatorAndSort(){
    if(this.dataSource){
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
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
      complete: () => {
        console.info('este es el complete despoes de traer los productos') 
        this.dataSource = new MatTableDataSource(this.proveedores);
        this.updatePaginatorAndSort()
      }
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
  editarItem(proveedor: any){
    console.log(proveedor)
    this._supplierService.enviarProveedorSeleccionado.emit({
      data:proveedor
    })
    this._router.navigate(['/proveedores/editarProveedor',proveedor._id])

  }
  eliminarItem(){
    
  }

}
