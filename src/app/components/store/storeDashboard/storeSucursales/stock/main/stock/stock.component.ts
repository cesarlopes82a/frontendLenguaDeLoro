import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { BranchService } from 'src/app/services/branch.service';
import { ProductService } from 'src/app/services/product.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { DialogajusteComponent } from '../dialogajuste/dialogajuste.component';
import Swal from 'sweetalert2'


export interface StockElement {
  prodId:string;
  codigo: string;
  productName: string;
  categoryName: string;
  fechaUltimaCompra: string;
  precioUnitUltCompra: string;
  cantidad: string;
  menu:any
  ajustes: any
}


@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['table-expandable-rows.css'],
  styles: [
  ],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class StockComponent implements OnInit {
  public tiendaNombre:string = String(localStorage.getItem('itemMenuSeleccionado'))
  public branchId!:string;
  public branchFullInfo!: any;
  columnsToDisplay: string[] = ['Producto',	'Ultima Compra',	'$Costo Unitario',	'Codigo Producto',	'Categoria',	'Stock',' '];
  dataSource!: MatTableDataSource<any>;
  expandedElement!: StockElement | null;

  constructor(
    private _branchService: BranchService,
    private _route: ActivatedRoute,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this._route.params.subscribe(
      params => {
        this.branchId = params['id']      
        console.log("esto es lo que me trajo el params: storeId:" + this.branchId)
        this.getStockByBranchId()        
      }
    )
  }
  getStockByBranchId(){
    console.log("estoy dentro del getStockByBranchId()")
    this._branchService.getStockByBranchId(this.branchId)
    .subscribe({
      next: (response) => {
        console.log("MENSAJE: getStockByBranchId() Successfully completed")
        this.branchFullInfo = response;
        console.log("despues de la asgnacion this.products")
        console.log(this.branchFullInfo)

       // window.location.reload();
      },
      error: (e) => console.error(e),
      complete: () => {
        let ELEMENT_DATA: any[] = []
        for (let i=0; i<this.branchFullInfo.stock.length; i++) {
          console.log("--------------------------------------------")
            let StockELEMENT_DATA: StockElement          
            StockELEMENT_DATA = {
              prodId: this.branchFullInfo.stock[i].product._id,
              codigo: this.branchFullInfo.stock[i].product.codigo,
              fechaUltimaCompra: this.branchFullInfo.stock[i].fechaUltimaCompra,
              precioUnitUltCompra: this.branchFullInfo.stock[i].precioUnitUltCompra,
              categoryName: this.branchFullInfo.stock[i].product.categoriaRubro.categoryName,
              productName: this.branchFullInfo.stock[i].product.productName,
              cantidad: this.branchFullInfo.stock[i].cantidad,
              menu: "",
              ajustes: this.branchFullInfo.stock[i].ajustes
            }
            ELEMENT_DATA.push(StockELEMENT_DATA)
          }
          console.log(ELEMENT_DATA)
          
          this.dataSource = new MatTableDataSource(ELEMENT_DATA);
          console.log(this.dataSource)

        

      }
      })
  }

  ajustarStock(transaction:any){
    console.log("quiero editar este item: ")
    console.log(transaction)
    
      const dialogRef = this.dialog.open(DialogajusteComponent,{
        width:'50%',
        height:'50%',
        data:{
          'prodSeleccionado':transaction,
          'branchId':this.branchId
        }  
      }); 
     
      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
        if(`${result}` != "close"){
          let ELEMENT_DATA: any[] = []
          for (let i=0; i<this.branchFullInfo.stock.length; i++) {
            
            console.log("--------------------------------------------")
              let StockELEMENT_DATA: StockElement          
              StockELEMENT_DATA = {
                prodId: this.branchFullInfo.stock[i].product._id,
                codigo: this.branchFullInfo.stock[i].product.codigo,
                fechaUltimaCompra: this.branchFullInfo.stock[i].fechaUltimaCompra,
                precioUnitUltCompra: this.branchFullInfo.stock[i].precioUnitUltCompra,
                categoryName: this.branchFullInfo.stock[i].product.categoriaRubro.categoryName,
                productName: this.branchFullInfo.stock[i].product.productName,
                cantidad: this.branchFullInfo.stock[i].cantidad,
                menu: "",
                ajustes: this.branchFullInfo.stock[i].ajustes
              }
              if(transaction.prodId == this.branchFullInfo.stock[i].product._id){
                let objAjuste = {
                  //fechaAjuste: new Date().toLocaleDateString().slice(0, 19).replace('T', ' '),
                  fechaAjuste: new Date().toISOString().slice(0, 19).replace('T', ' '),
                  accion: "Se ajusta stock de mercaderias - Valor: " + this.branchFullInfo.stock[i].cantidad + " - NuevoValor: " + `${result}` ,
                  userName: localStorage.getItem("loggedUserName"),
                  userRole: localStorage.getItem("loggedUserRole")               
                }
                this.branchFullInfo.stock[i].ajustes.push(objAjuste)
                StockELEMENT_DATA.ajustes =  this.branchFullInfo.stock[i].ajustes
                StockELEMENT_DATA.cantidad = `${result}`
                
              }
              ELEMENT_DATA.push(StockELEMENT_DATA)
            }
            console.log(ELEMENT_DATA)
            
            this.dataSource = new MatTableDataSource(ELEMENT_DATA);
            console.log(this.dataSource)


            //////////////
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Ajuste registrado con exito!!!',
              showConfirmButton: false,
              timer: 1500
            })
          
        }
        
      });
    
    
  }
}
