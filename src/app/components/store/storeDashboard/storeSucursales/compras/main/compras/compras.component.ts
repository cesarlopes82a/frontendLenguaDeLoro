import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { ComprasService } from 'src/app/services/compras.service';
import { SidenavService } from 'src/app/services/sidebar.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {FormGroup, FormControl} from '@angular/forms';
import { global } from 'src/app/services/global';

export class TableExpandableRowsExample {
  expandedElement!: CompraElement | null;
}
export interface CompraElement {
  _id: string;
  fechaDeCompra: string;
  fechaDeVencimiento: string;
  productName: string;
  userName: string;
  proveedorName: string;
  branchName: string;
  cantidad: number
  precioCompraUnitario: number
  comentario: string
  total:number
  menu:any
}

@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
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
  providers:[SidenavService]
})

export class ComprasComponent implements OnInit {
  public proveedorSelected: string = "Todos"
  public proveedoresFoundEnCompras: any[]=[];
  columnsToDisplay: string[] = ['CompraId',	'Usuario',	'Proveedor',	'Fecha',	'Producto',	'Cantidad',	'$ Unitario',	'Total','menu'];
  dataSource!: MatTableDataSource<any>;
  expandedElement!: CompraElement | null;
  

  public branchId!: string;
  public storeId!: string;
  public title!: string;
  public url!: string;
  public comprasByBranchAndPopulatedInfo!: any
  public quieroEliminarEsteRegistro!:string;
  public sucursalNombre!: string
  public totalCompras!: number

  public startDate:string = new Date().toISOString().split('T')[0];
  public endDate:string = new Date().toISOString().split('T')[0];
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });
  public filtroFechaVtas:any = ""   //utilizo esto para filtrar las compras por fecha


  constructor(
    private _route: ActivatedRoute,
    private _comprasService: ComprasService,

  ) {}

  ngOnInit(): void {
    this.sucursalNombre = String(localStorage.getItem('itemMenuSeleccionado'))
    this._route.params.subscribe(
      params => {
        this.branchId = params['id']
        console.log("esto es lo que me trajo el params: branchId:" + this.branchId)
      }
    )

    this.getComprasByBranchAndPopulateInfo(this.branchId)
  }

  async getComprasByBranchAndPopulateInfo(branchId:string){
    this._comprasService.getComprasByBranchAndPopulateInfo(branchId)
    .subscribe({
      next: (v) => {
        console.log("estas son las compras de la sucursal populated")
        console.log(v)
        this.comprasByBranchAndPopulatedInfo =  v
        if(this.comprasByBranchAndPopulatedInfo.lenght>0) this.sucursalNombre = this.comprasByBranchAndPopulatedInfo[0].branchId.branchName

      },
      error: (e) => console.error(e),
      complete: () => {
        console.info('este es el complete') 
        let ELEMENT_DATA: any[] = []
        for (let i=0; i<this.comprasByBranchAndPopulatedInfo.length; i++) {

          //esto es para llenar el array proveedoresFoundEnCompras 
          var results = this.proveedoresFoundEnCompras.filter( (nickname: { _id: string; }) => { return nickname._id == this.comprasByBranchAndPopulatedInfo[i].proveedorId._id; });
          if(results.length <1){
            this.proveedoresFoundEnCompras.push(this.comprasByBranchAndPopulatedInfo[i].proveedorId)
          }
          /////////////////////////////////////////////////////////


          let CompraELEMENT_DATA: CompraElement
          
          CompraELEMENT_DATA = {
            _id: this.comprasByBranchAndPopulatedInfo[i]._id,
            fechaDeCompra: this.comprasByBranchAndPopulatedInfo[i].fechaDeCompra,
            fechaDeVencimiento: this.comprasByBranchAndPopulatedInfo[i].fechaDeVencimiento,
            productName: this.comprasByBranchAndPopulatedInfo[i].productId.productName,
            userName: this.comprasByBranchAndPopulatedInfo[i].userId.username,
            proveedorName: this.comprasByBranchAndPopulatedInfo[i].proveedorId.proveedorName,
            branchName: this.comprasByBranchAndPopulatedInfo[i].branchId.branchName,
            cantidad: this.comprasByBranchAndPopulatedInfo[i].cantidad,
            precioCompraUnitario: this.comprasByBranchAndPopulatedInfo[i].precioCompraUnitario,
            comentario: this.comprasByBranchAndPopulatedInfo[i].comentario,
            total: this.comprasByBranchAndPopulatedInfo[i].precioCompraUnitario * this.comprasByBranchAndPopulatedInfo[i].cantidad,
            menu:""
          }

          ELEMENT_DATA.push(CompraELEMENT_DATA)        
        
        }

        this.dataSource = new MatTableDataSource(ELEMENT_DATA);
        this.getTotalCompras()

      }
    })
  }
  pidoEliminar(idCompra:string){
    this.quieroEliminarEsteRegistro=idCompra;
    console.log("es este: " + this.quieroEliminarEsteRegistro)
  }
  consultoEstadoEliminar(idCompra:string){
    if(idCompra==this.quieroEliminarEsteRegistro) return true;
    return false;
  }
  pidoCancelarEliminar(){
    this.quieroEliminarEsteRegistro="";
  }
  deleteUsuario(idCompra:string){
    console.log("intento eliminar el usuario")
  }
  getTotalCompras() {
    this.totalCompras = this.dataSource.filteredData.map((t: { total: any; }) => t.total).reduce((acc: any, value: any) => acc + value, 0);  
    return this.totalCompras
  }
  aplicarFiltro(){

    let startDate:string = new Date(this.startDate).toISOString().split('T')[0];
    let endDate:string = new Date(this.endDate).toISOString().split('T')[0];

    let ELEMENT_DATA: any[] = []
    for (let i=0; i<this.comprasByBranchAndPopulatedInfo.length; i++) {
      let fechaVta:string = new Date(this.comprasByBranchAndPopulatedInfo[i].fechaDeCompra).toISOString().split('T')[0];

      if((fechaVta >= startDate && fechaVta <= endDate) && (this.proveedorSelected=="Todos" || this.proveedorSelected == this.comprasByBranchAndPopulatedInfo[i].proveedorId._id)){

        let CompraELEMENT_DATA: CompraElement
        CompraELEMENT_DATA = {
          _id: this.comprasByBranchAndPopulatedInfo[i]._id,
          fechaDeCompra: this.comprasByBranchAndPopulatedInfo[i].fechaDeCompra,
          fechaDeVencimiento: this.comprasByBranchAndPopulatedInfo[i].fechaDeVencimiento,
          productName: this.comprasByBranchAndPopulatedInfo[i].productId.productName,
          userName: this.comprasByBranchAndPopulatedInfo[i].userId.username,
          proveedorName: this.comprasByBranchAndPopulatedInfo[i].proveedorId.proveedorName,
          branchName: this.comprasByBranchAndPopulatedInfo[i].branchId.branchName,
          cantidad: this.comprasByBranchAndPopulatedInfo[i].cantidad,
          precioCompraUnitario: this.comprasByBranchAndPopulatedInfo[i].precioCompraUnitario,
          comentario: this.comprasByBranchAndPopulatedInfo[i].comentario,
          total: this.comprasByBranchAndPopulatedInfo[i].precioCompraUnitario * this.comprasByBranchAndPopulatedInfo[i].cantidad,
          menu:""
        }
        ELEMENT_DATA.push(CompraELEMENT_DATA) 
      }             
    }

    this.dataSource = new MatTableDataSource(ELEMENT_DATA);
    console.log(this.dataSource.filteredData)
    this.getTotalCompras()
    
  }
 
  eliminarItem(transactionId:string){
    console.log("quiero eliminar este item: " + transactionId)
    
  }
  editarItem(transactionId:string){
    console.log("quiero editar este item: " + transactionId)
    
  }
  
  

}
