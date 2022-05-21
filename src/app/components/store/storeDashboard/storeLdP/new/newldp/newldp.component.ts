import { Component, Injectable, Pipe, OnInit } from '@angular/core';
import { ProductService } from '../../../../../../../app/services/product.service';
import { ListadepreciosService } from 'src/app/services/listadeprecios.service';
import { Params ,Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { DialogprecioComponent } from '../../dialogPrecio/dialogprecio/dialogprecio.component';
import { RangeValueAccessor, ReactiveFormsModule } from '@angular/forms';
import { productOfLDP } from 'src/app/models/productOfLDP';
import { global } from 'src/app/services/global';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-newldp',
  templateUrl: './newldp.component.html',
  styles: [
  ]
})

export class NewldpComponent implements OnInit {
  _productsList: productOfLDP[] = []
  public storeId!: string;
  public ldpNombre!: string;
  public ldpDescripcion!: string;
  public fechaDeCreacion!: string
  public products!:any
  public productstest!:any
  public loggedUser!:any
  public userDataFromUserService!: any

  constructor(
    private _productService: ProductService,
    private _listadeprecioService: ListadepreciosService,
    private _userService: UserService,
    private _route: ActivatedRoute,
    private dialog: MatDialog
    
  ) {
    this.fechaDeCreacion = new Date().toISOString().split('T')[0];
   }

  ngOnInit(): void {
    this._route.params.subscribe(
      params => {
        this.storeId = params['id']
        this.getProductosByStoreIdAndPopulate(this.storeId);
      }
    )
      

  }
  onSubmit(form: any){
    console.log("soy el onsubmit--------------------------")
    this._listadeprecioService.registrarNuevaLDP(this._productsList,this.ldpNombre,this.ldpDescripcion,this.fechaDeCreacion,this.storeId)
    .subscribe({
      next: (v) => {
        console.log("MENSAJE: despues del registrarNuevaLDP")
        console.log(v)
       // this._router.navigate(['/tienda', this.storeId,'productos']);     
      },
      error: (e) => {
        console.log(e.error)
      },
      complete: () => console.info('complete') 
    })
  }

  
  getProductosByStoreIdAndPopulate(branchId:string){
     this._productService.getProductosByStoreIdAndPopulate(branchId)
    .subscribe({
      next: (productos) => {
        console.log("---------------------------los productos")
        console.log(productos)
        console.log("----------------------------------")
        
        let arrayProductos = []

        for (let producto of productos) {
          if(producto.ultimoRegCompra === null){
            let regCompra = {
              fechaDeCompra:"-",
              precioCompraUnitario: "-"
            }
            producto.ultimoRegCompra = regCompra
            
          }
          producto.precioVenta = null
          arrayProductos.push(producto)

          let productOfLDPnew = new productOfLDP(
            producto._id,
            producto.productName,
            producto.categoriaRubro.categoryName,
            producto.codigo,
            producto.stock,
            producto.ultimoRegCompra.fechaDeCompra,
            producto.ultimoRegCompra.precioCompraUnitario,
            producto.precioVenta
          )
          this._productsList.push(productOfLDPnew)
          this._listadeprecioService.addProductTothelist(productOfLDPnew)
        }
        this.products = arrayProductos
        console.log("this.products---------------")
        console.log(this.products)
        console.log("usando el servicio de lista de precios")
        console.log(this._listadeprecioService.getAllProductsOfthelist())
        
      },
      error: (e) => console.error(e),
      complete: () => console.info('complete') 
    })
     

  }
  
  buscarUltimosRegistrosCompras(products:any){
    

  }
  openDialogPrecio(precioCompra:number, productName:string, index:number){
    const dialogRef = this.dialog.open(DialogprecioComponent,{
      width:'50%',
      data:{'precioCompra':precioCompra,
            'productName': productName,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this._productsList[index].precioVenta = Number(`${result}`)
    });
    
  }




  

}
