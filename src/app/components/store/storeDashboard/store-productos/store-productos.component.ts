import { Component, OnInit, ViewChild, Inject} from '@angular/core';
import { Product } from '../../../../models/product';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

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


  displayedColumns: string[] = ['codigo', 'productName', 'unidadMedida', 'categoryName'];
  public dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;  

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
    this.getProductosByStoreId()    
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  updatePaginatorAndSort(){
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  
  getProductosByStoreId(){
    console.log("estoy dentro del getProductos()")
    this._productService.getProductosByStoreId(this.storeId)
    .subscribe({
      next: (response) => {
        console.log(response)
        
          this.productos = response;
          console.log("despues de la asgnacion")
        console.log(this.productos)

       // window.location.reload();
      },
      error: (e) => console.error(e),
      complete: () => {
        console.info('este es el complete despoes de traer los productos') 
        this.dataSource = new MatTableDataSource(this.productos);
        this.updatePaginatorAndSort()
      }
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
