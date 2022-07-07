import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { BranchService } from 'src/app/services/branch.service';
import { ProductService } from 'src/app/services/product.service';
import { MatTableDataSource } from '@angular/material/table';
import {FormGroup, FormControl} from '@angular/forms';
import {animate, state, style, transition, trigger} from '@angular/animations';

export interface StockElement {
  codigo: string;
  productName: string;
  categoryName: string;
  fechaUltimaCompra: string;
  precioUnitUltCompra: string;
  cantidad: string;
  menu:any
}
export class TableExpandableRowsExample {
  expandedElement!: StockElement | null;
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
    private _route: ActivatedRoute 
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
        /*
        ajustes:[{
          fechaAjuste: String,
          justificacion: String,
          accion: String,
          cantidad: Number
        }]
        */
            let StockELEMENT_DATA: StockElement          
            StockELEMENT_DATA = {
              codigo: this.branchFullInfo.stock[i].product.codigo,
              fechaUltimaCompra: this.branchFullInfo.stock[i].fechaUltimaCompra,
              precioUnitUltCompra: this.branchFullInfo.stock[i].precioUnitUltCompra,
              categoryName: this.branchFullInfo.stock[i].product.categoriaRubro.categoryName,
              productName: this.branchFullInfo.stock[i].product.productName,
              cantidad: this.branchFullInfo.stock[i].cantidad,
              menu: ""
            }
            ELEMENT_DATA.push(StockELEMENT_DATA)
          }
          console.log(ELEMENT_DATA)
          
          this.dataSource = new MatTableDataSource(ELEMENT_DATA);
          console.log(this.dataSource)
      }
      })
  }
  ajustarStock(transactionId:string){
    console.log("quiero editar este item: " + transactionId)
    
  }
}
