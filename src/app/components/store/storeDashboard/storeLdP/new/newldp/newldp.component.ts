import { Component, Injectable, Pipe, OnInit,Inject, ViewChild } from '@angular/core';
import { ProductService } from '../../../../../../../app/services/product.service';
import { ListadepreciosService } from '../../../../../../services/listadeprecios.service';
import { Params ,Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { DialogprecioComponent } from '../../dialogPrecio/dialogprecio/dialogprecio.component';
import { RangeValueAccessor, ReactiveFormsModule } from '@angular/forms';
import { productOfLDP } from '../../../../../../models/productOfLDP';
import { global } from '../../../../../../services/global';
import { UserService } from '../../../../../../services/user.service';
import { BranchService } from 'src/app/services/branch.service';
import { DialogpreciomasivoComponent } from '../../dialogPrecioMasivo/dialogpreciomasivo/dialogpreciomasivo.component';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-newldp',
  templateUrl: './newldp.component.html',
  styles: [
  ]
})

export class NewldpComponent implements OnInit {
  _productsList: productOfLDP[] = []    //contiene todos los productos de la lista de precios tal cual como se van a almacenar en la DB
  public storeId!: string;
  public ldpNombre!: string;
  public ldpDescripcion!: string;
  public fechaDeCreacion!: string
  public products!:any                  //son todos los productos que tiene la tienda. losrecibo del backend y le cambie los nulls. los reemplace por -
  public productstest!:any
  public loggedUser!:any
  public userDataFromUserService!: any
  public listaOrigenIdparaClonar:string = ""  //Es el id de la lista que quiero clonar.
  public listadpOriginal!:any                 // es la lista de precios original traida desde el backend
  public referenciaCostosStock:string = ""
  public branchesByStore!: any
  public selectedFileIds!:any
  public valorDeReferencia!: string  // con esta variable determino si estoy haciendo un ajuste de precios en funcion del costo del produco o del precio de ventas existente

  displayedColumns: string[] = ['codigo', 'productName', 'rubro', 'fechaUltimaCompra', 'costoUnitario', 'precioVenta', 'Diff', 'stock','edit'];
  public dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _productService: ProductService,
    private _branchService: BranchService,
    private _listadeprecioService: ListadepreciosService,
    private _userService: UserService,
    private _route: ActivatedRoute,
    private _router: Router,
    private dialog: MatDialog

    
  ) {
    this.fechaDeCreacion = new Date().toISOString().split('T')[0];
   }

  async ngOnInit(): Promise<void>{
    // PASO 1: VERIFICO si esto es una copia de una lista o es una lista nueva 100%
    this._listadeprecioService.enviarListId.subscribe(data =>{   
      this._listadeprecioService.setListaId(data.data)
      this.dataSource = new MatTableDataSource(this._productsList);
      
      this.updatePaginatorAndSort()
    })
    this._listadeprecioService.outputAjusteMasivoDePrecios.subscribe(data =>{   
      console.log("####desde el evento que envia el outpuuuuttttttt")
      console.log(data.data)
      console.log(data.ajusteTipo)
      console.log(data.montoPorcentaje)
      this.actualizarPreciosEnMasa(data.data, data.ajusteTipo, data.montoPorcentaje)
      //this.dataSource = new MatTableDataSource(this._productsList);
      
      //this.updatePaginatorAndSort()
    })

    //Lo primero que tengo que hacer es obtener el storeId
    this._route.params.subscribe(
      params => {
        this.storeId = params['id']
        //una vez que tengo el storeId puedo traerme la lista de productos de esta storeId
        this.getBranchesByStoreId(this.storeId)      
        this.getProductosByStoreIdAndPopulate(this.storeId);        
      }
    )

  }

  onSubmit(ldpForm:any){

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

  registrarListaDePrecios(){
    
    this._listadeprecioService.registrarNuevaLDP(this._productsList,this.ldpNombre,this.ldpDescripcion,this.fechaDeCreacion,this.storeId)
    .subscribe({
      next: (v) => {
        console.log("MENSAJE: despues del registrarNuevaLDP")
        console.log(v)
        this._router.navigate(['/tienda', this.storeId,'ldp']);    
        
      },
      error: (e) => {
        console.log(e.error)
      },
      complete: () => console.info('complete') 
    })

  }

  getBranchesByStoreId(storeId:string){
    this._branchService.getBranchesByStoreId(storeId)
    .subscribe({
      next: (branches) => {        
        console.log("estas son las branches que encontré")
        console.log(branches)
        this.branchesByStore = branches.slice()
        if(this.branchesByStore.length == 0){
          this._branchService.getBranchesByBranchId(storeId)
          .subscribe({
            next: (branches) => {        
              console.log("estas son las branches que encontré")
              console.log(branches)
              this.branchesByStore.push(branches)
            },
            error: (e) => console.error(e),
            complete: async () => {}
          })
        }

           
      },
      error: (e) => console.error(e),
      complete: async () => {}
        
    })  
    
  }
  getProductosByStoreIdAndPopulate(storeId:string){
     this._productService.getProductosByStoreIdAndPopulate(storeId)
    .subscribe({
      next: (productos) => {        
        let arrayProductos = []  // es una variable auxiliar. contiene lo mismo que el array de productos pero con los datos bien formateados. una vez formateado correctamete se pisa el array de productos.

        //tengo que agarrar la lista de productos que recibí del backend y formatearla para poder usarla aca
        // voy a reemplazar por un (-) lo valores que pueden ser null
        //paso todos los productos a un nuevo array arrayProductos con los datos bien formateados(sin null)
        for (let producto of productos) {

          if(producto.desactivado.estado == false){
            //no tengo mas la clave ultimoRegCompra. hago esto para que siga funcionando. ningun producto va a tener un ultimo reg de compra de esta lista
            /*
            if(producto.ultimoRegCompra === null){
              let regCompra = {
                fechaDeCompra:"-",
                precioCompraUnitario: "-"
              }
              producto.ultimoRegCompra = regCompra          
            }
            */
            //producto.ultimoRegCompra.fechaDeCompra="-";             ///agrego esto para salvar
            //producto.ultimoRegCompra.precioCompraUnitario = "-"     ///agrego esto para salvar

            producto.precioVenta = null
            arrayProductos.push(producto)

            //creo los elementos que voy a almacenar dentro de la lista de precios 
            //defino la estructura del elemento que voy a guardar en la lista de productos
            let productOfLDPnew = new productOfLDP(
              producto._id,
              producto.productName,
              producto.categoriaRubro.categoryName,
              producto.codigo,
              0,
              "-",   //producto.ultimoRegCompra.fechaDeCompra,
              0,  //producto.ultimoRegCompra.precioCompraUnitario,
              producto.precioVenta,
              producto.desactivado.estado
            )
            //guardo todos estos elementos en un array (_productList)
            
            this._productsList.push(productOfLDPnew)
            this.dataSource = new MatTableDataSource(this._productsList);
            this.updatePaginatorAndSort()
            //this._listadeprecioService.addProductTothelist(productOfLDPnew)
          }

          
        }
        this.products = arrayProductos
        console.log("this.products---------------son todos los productos que tiene la tienda. lo recibo del backend")
        console.log(this.products)        
      },
      error: (e) => console.error(e),
      complete: async () => {
        //despues de traer la lista completa de productos de la tienda VOY A VER SI TENGO QUE CLONAR O CREAR UNA LISTA NUEVA
        let listaDpQueQuieroClonar = await this._listadeprecioService.getListaId()
        if(listaDpQueQuieroClonar != ""){ //si esta variable es distinta de "" es porque ESTOY INTENTANDO CLONAR UNA LISTA DE PRECIOS
          console.log("MENSAJE: Intentando clonar lista de precios listaId: " + listaDpQueQuieroClonar )
          this.listaOrigenIdparaClonar = listaDpQueQuieroClonar
          //LIMPIO LA variable para evitar problemas
          this._listadeprecioService.clearListaId()
        }
        console.log("compleeeeeeeeeeeeeeeeeeeeeeeeeete")
        console.log("listaOrigenIdparaClonar")
        console.log(this.listaOrigenIdparaClonar)
        console.log("lista completa de productos de la tienda")
        console.log(this._productsList)
        if(this.listaOrigenIdparaClonar && this._productsList){
          console.log("MENSAJE: Copia de Lista de precios. obteniendo informacion de lista de precios ID: " + this.listaOrigenIdparaClonar)
          this.getListaDpByIdAndPopulateProducts(this.listaOrigenIdparaClonar)
        }
       }
    })  
    
  }
  
  getListaDpByIdAndPopulateProducts(listaId:string){
    this._listadeprecioService.getListaDpByIdAndPopulateProducts(listaId)
    .subscribe({
      next: (listaFound) => {
        console.log("MENSAJE: Lista de precios id: " + listaId + " recibida exitosamente.")
        console.log(listaFound)
        //no podia leer la listaFoun asi que hago esto y ahora anda
        this.listadpOriginal = JSON.stringify(listaFound)
        this.listadpOriginal = JSON.parse(this.listadpOriginal)
        //---------------------------------------      
        for (let [index, producto] of this._productsList.entries()) {

          const localizarTodasLasInstancias = (propiedad: string, valor: string) => {
            return this.listadpOriginal.ldpProducts.filter( (element: { [x: string]: any; }) => {
                return element[propiedad] === valor;
            })
          }
          
          let productoEncontrado = localizarTodasLasInstancias( 'product', producto._id)
          
          if(productoEncontrado.length > 0){          
            this._productsList[index].precioVenta = productoEncontrado[0].precioVenta
            this.dataSource = new MatTableDataSource(this._productsList);
            console.log("#########################################")
            console.log(this.dataSource)
            this.updatePaginatorAndSort()
            //this._productsList[index].precioVenta = productoEncontrado[0].

          }
        }        

      },
      error: (e) => {
        console.error(e.error.message)
      },
      complete: () => {
        console.log("el complte de obtener la listaaaa")
       }
    })   
    
  }


  actualizarRefCostosStock(event: { isUserInput: any; source: { value: any; selected: any; }; }){
    if(event.isUserInput) {
      console.log("event.source.value, event.source.selected")
      console.log(event.source.value, event.source.selected);      
      if(event.source.value==""){
        for (let [i, producto] of this._productsList.entries()) {
          this._productsList[i].fechaUltimaCompra = "-"
          this._productsList[i].costoUnitario = 0
          this._productsList[i].stock = 0
          this.dataSource = new MatTableDataSource(this._productsList);
          this.updatePaginatorAndSort()
        }
      }else{
        const index = this.branchesByStore.findIndex((object: { _id: any; }) => {
          return object._id == event.source.value;
        });
        if(index >=0){
          for (let [i, producto] of this._productsList.entries()) {
            const indexProd = this.branchesByStore[index].stock.findIndex((object: { product: string; }) => {
              return object.product == producto._id;
            });
            if(indexProd>=0){
              this._productsList[i].fechaUltimaCompra = this.branchesByStore[index].stock[indexProd].fechaUltimaCompra
              this._productsList[i].costoUnitario = this.branchesByStore[index].stock[indexProd].precioUnitUltCompra
              this._productsList[i].stock = this.branchesByStore[index].stock[indexProd].cantidad
            }else{
              this._productsList[i].fechaUltimaCompra = "-"
              this._productsList[i].costoUnitario = 0
              this._productsList[i].stock = 0
            }
          }
          this.dataSource = new MatTableDataSource(this._productsList);
          this.updatePaginatorAndSort()
        }
      }   
    }
  }

  openDialogPrecio(precioCompra:number, productName:string, precioVenta:number, index:string){
    const dialogRef = this.dialog.open(DialogprecioComponent,{
      width:'50%',
      data:{'precioCompra':precioCompra,
            'productName': productName,
            'precioVenta': precioVenta
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if(`${result}` != "close"){
      //  this._productsList[index].precioVenta = Number(`${result}`)
        for(let i=0; i<this._productsList.length; i++){
          if(this._productsList[i].codigo == index){
            this._productsList[i].precioVenta = Number(`${result}`)
          }
        }
        this.dataSource = new MatTableDataSource(this._productsList);
        this.updatePaginatorAndSort()
      }
      
    });
    
  }
  openDialogAjusteMasivoPreios(_productsList:productOfLDP[],valorDeReferencia:string){
    this.valorDeReferencia=valorDeReferencia
    let selectedFileIds: string[]=[]
    const dialogRefAMP = this.dialog.open(DialogpreciomasivoComponent,{

      width:'80%',
      data:{
        '_productsList': _productsList,
        'selectedFileIds': selectedFileIds,
        'valorDeReferencia': valorDeReferencia
      }
    });

    dialogRefAMP.afterClosed().subscribe(result => {
      if(`${result}` != "close"){
        
      }
    })
      /*
    dialogRefAMP.afterClosed().subscribe(result => {
      console.log(`Dialog result Masivooo: ${result}`);
      console.log(`${result}`);
      this.selectedFileIds = `${result}`
      //this.selectedFileIds.splice(0, this.selectedFileIds.length);
      for (let item of this.selectedFileIds) {
        console.log(item);
        //this.selectedFileIds.push(item);
      }
      
      console.log("selectedFileIds")
      console.log(this.selectedFileIds)
      
      if(`${result}` != "close"){
      //  this._productsList[index].precioVenta = Number(`${result}`)
      }
      
    });*/
    
  }
  actualizarPreciosEnMasa(selectedItems: any, ajusteTipo:number, montoPorcentaje:number){
    //ajusteTipo  1=aumento  2=descuento
    
    for(let p=0; p<this._productsList.length; p++){
      for(let s=0; s<selectedItems.length; s++){
        if(String(this._productsList[p].codigo) == String(selectedItems[s].codigo)){
          console.log("actualizaaaaarrr precio " + selectedItems[s].productName)
          if(ajusteTipo==1){ //AUMENTO
            console.log("aumento")
            console.log(this.valorDeReferencia)
            if(this.valorDeReferencia == "precioVenta"){
              this._productsList[p].precioVenta += selectedItems[s].precioVenta * montoPorcentaje / 100
            }else if(this.valorDeReferencia == "costo"){
              this._productsList[p].precioVenta = selectedItems[s].costoUnitario + selectedItems[s].costoUnitario * montoPorcentaje / 100
            }
          }else if(ajusteTipo==2){ //DESCUENTO
            console.log("descuento")
            console.log(this.valorDeReferencia)
            if(this.valorDeReferencia == "precioVenta"){
              this._productsList[p].precioVenta -= selectedItems[s].costoUnitario * montoPorcentaje / 100
            }else if(this.valorDeReferencia == "costo"){
              this._productsList[p].precioVenta = selectedItems[s].costoUnitario - selectedItems[s].costoUnitario * montoPorcentaje / 100
            }
          }          
          break
        }
      }
    }
    this.dataSource = new MatTableDataSource(this._productsList);
    this.updatePaginatorAndSort()
  }





  

}
