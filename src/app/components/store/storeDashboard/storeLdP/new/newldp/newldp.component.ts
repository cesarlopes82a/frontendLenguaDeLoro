import { Component, Injectable, Pipe, OnInit } from '@angular/core';
import { ProductService } from '../../../../../../../app/services/product.service';
import { Params ,Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { DialogprecioComponent } from '../../dialogPrecio/dialogprecio/dialogprecio.component';

@Component({
  selector: 'app-newldp',
  templateUrl: './newldp.component.html',
  styles: [
  ]
})


export class NewldpComponent implements OnInit {
  public branchId!: string;
  public ldpNombre!: string;
  public ldpDescripcion!: string;
  public fechaDeCreacion!: string
  public products!:any
  public productstest!:any

  constructor(
    private _productService: ProductService,
    private _route: ActivatedRoute,
    private dialog: MatDialog
    
  ) {
    this.fechaDeCreacion = new Date().toISOString().split('T')[0];
   

   }

  ngOnInit(): void {
    this._route.params.subscribe(
      params => {
        this.branchId = params['id']
        this.getProductosByStoreIdAndPopulate(this.branchId);
      }
    )
  }
  onSubmit(form: any){

  }
  
  getProductosByStoreIdAndPopulate(branchId:string){
     this._productService.getProductosByStoreIdAndPopulate(branchId)
    .subscribe({
      next: (productos) => {
        this.productstest = productos
        let arrayProductos = []

        for (let producto of productos) {
          if(producto.ultimoRegCompra === null){
            let regCompra = {
              fechaDeCompra:"-",
              precioCompraUnitario: "-"
            }
            producto.ultimoRegCompra = regCompra
          }
          arrayProductos.push(producto)
        }
        this.products = arrayProductos
        console.log("this.products---------------")
        console.log(this.products)
        
      },
      error: (e) => console.error(e),
      complete: () => console.info('complete') 
    })
     

  }
  
  buscarUltimosRegistrosCompras(products:any){
    

  }
  openDialogPrecio() {
    const dialogRef = this.dialog.open(DialogprecioComponent,{
      width:'50%'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }



  

}
