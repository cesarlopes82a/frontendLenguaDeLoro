import { Component, OnInit, ViewChild, Inject} from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NuevorubroComponent } from '../../dialogs/nuevorubro/nuevorubro.component';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-rubros',
  templateUrl: './rubros.component.html',
  styles: [
  ]
})
export class RubrosComponent implements OnInit {
  public title!: string;
  public storeId!:string;
  public categorias!: any;

  displayedColumns: string[] = ['_id', 'categoryName', 'createdAt', 'updatedAt', 'menu'];
  public dataSource!: MatTableDataSource<any>;
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;  

  constructor(
    private _categoryService: CategoryService,
    private _route: ActivatedRoute,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this._route.params.subscribe(
      params => {
        this.storeId = params['id']
    })
    this.getCategoriasByStoreId()
  }
  getCategoriasByStoreId(){
    this._categoryService.getCategoriasByStoreId(this.storeId)
        .subscribe({
          next: (v) => {
            console.log("despues del getCategoriasByStoreId")
            console.log(v)
            this.categorias = v        
          },
          error: (e) => {
 
              Swal.fire({
                icon: 'error',
                title: 'Opps.. algo salió mal!',
                text: e.error,
                //footer: '<a href="">Why do I have this issue?</a>'
              })
        
          },
          
          complete: () => {
            console.info('complete')
            this.dataSource = new MatTableDataSource(this.categorias);
            this.updatePaginatorAndSort()
          } 
        })
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

  openDialogNuevaCategoria(){    
    
    const dialogRef = this.dialog.open(NuevorubroComponent,{

      width:'40%',
      data:{
  
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(`${result}` != "close"){
        console.log(`${result}`)
        this._categoryService.createNewCategory(this.storeId, String(`${result}`))
        .subscribe({
          next: (v) => {
            console.log("despues del saveProducto")
            console.log(v)
  
          //  this._router.navigate(['/tienda', this.storeId,'productos']);   
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Categoria registrada exitosamente!!',
              showConfirmButton: false,
              timer: 1500
            })  
          },
          error: (e) => {
            if(e.status == 400){
              Swal.fire({
                icon: 'error',
                title: 'La categoria '+  String(`${result}`) + ' ya existe dentro de la DB de categorias!',
                text: e.error,
                //footer: '<a href="">Why do I have this issue?</a>'
              })
              
            }
            console.error(e)
          },
          
          complete: () => {
            console.info('complete')
            this.getCategoriasByStoreId()
          } 
        })
      }
    })

    
  }

  editarCategoria(fila:any){

  }
  eliminarCategoria(categoriaId:string){
    this._categoryService.deleteCategoria(this.storeId, categoriaId)
        .subscribe({
          next: (v) => {

          //  this._router.navigate(['/tienda', this.storeId,'productos']);   
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Categoria eliminada con exito!!',
              showConfirmButton: false,
              timer: 1500
            })
          },
          error: (e) => {
            if(e.status == 403){
              Swal.fire({
                icon: 'error',
                title: 'La categoria '+  categoriaId + ' no puede ser eliminada!',
                text: e.error,
                //footer: '<a href="">Why do I have this issue?</a>'
              })
              
            }
            console.error(e)
          },
          
          complete: () => {
            console.info('complete') 
            this.getCategoriasByStoreId()
            /*
            const filteredCategorias = this.categorias.filter((item: string) => item !== categoriaId)
            this.categorias = filteredCategorias.slice()
            console.log(this.categorias)
            this.dataSource = new MatTableDataSource(this.categorias);
            this.updatePaginatorAndSort()
            */
          }
        })
  }

}
