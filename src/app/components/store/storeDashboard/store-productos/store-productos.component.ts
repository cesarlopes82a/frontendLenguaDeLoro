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
  


  displayedColumns: string[] = ['codigo', 'productName', 'unidadMedida', 'categoryName', 'menu'];
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
    if(this.dataSource){
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  updatePaginatorAndSort(){
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
  cambiarEstadoProducto(productId: string){
    this._productService.postChangeStatusProductById(productId)
    .subscribe({
      next: (response) => {
        console.log(response)
        for(let i = 0; i<this.productos.length; i++){
          console.log(this.productos[i]._id + "  -  " + productId)
          if(String(this.productos[i]._id) == productId){
            console.log("asigno... " +response.estado)
            this.productos[i].desactivado.estado = response.estado
            this.productos[i].desactivado.desactivadoPor = response.desactivadoPor
            this.productos[i].desactivado.desactivadoFecha = response.desactivadoFecha
            break
          }
        }
        this.dataSource = new MatTableDataSource(this.productos);
        this.updatePaginatorAndSort()         
      },
      error: (e) => console.error(e),
      complete: () => {
        console.info('este es el complete despoes de traer los productos') 
      
      }
    })
  }
  editarProducto(fila:any){
    this._productService.enviarDatosProductoQueQuieroEditar.emit({
      data: fila
    })
  }
  
  deletePrducto(id:string){
    console.log("intento eliminar el producto")
 
  }

}
