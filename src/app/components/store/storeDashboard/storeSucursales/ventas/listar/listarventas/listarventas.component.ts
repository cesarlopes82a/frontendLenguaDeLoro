import { ChangeDetectorRef,Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { VentasService } from 'src/app/services/ventas.service';
import { ActivatedRoute, Router } from '@angular/router';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {FormGroup, FormControl} from '@angular/forms';


export class TableExpandableRowsExample {
  expandedElement!: VentaElement | null;
}

export interface VentaElement {
  fecha: string;
  sucursal: string;
  vendedor: string;
  tarjeta: number;
  efectivo: number;
  saldo: number;
  TOTAL: number;
  productosVendidos: any
}

@Component({
  selector: 'app-listarventas',
  templateUrl: './listarventas.component.html',
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



export class ListarventasComponent implements OnInit {
 
  public sucursalNombre = String(localStorage.getItem('itemMenuSeleccionado'))
  public branchId!:string;
  public ventasByBranchId: any[] = []
  public totalVentas:number = 0
  public totalVtasTarjeta:number = 0
  public totalVtasEfectivo:number =0
  public totalVtasPendienteCobro:number =0
  
  dataSource!: MatTableDataSource<any>;
  public startDate:string = new Date().toISOString().split('T')[0];
  public endDate:string = new Date().toISOString().split('T')[0];
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });
  public filtroFechaVtas:any = ""   //utilizo esto para filtrar las ventas por fecha

  //dataSource = ELEMENT_DATA;
  columnsToDisplay = ['fecha', 'sucursal', 'vendedor', 'tarjeta', 'efectivo', 'saldo', 'TOTAL'];
  expandedElement!: VentaElement | null;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    public _ventasService:VentasService,
    private cd:ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this._route.params.subscribe(
      params => {
        this.branchId = params['id']
        console.log("esto es lo que me trajo el params: branchId:" + this.branchId)
        this.getVentasByBranchIdAndPopulateInfo(this.branchId)        
      }
    )
    
  }
  eliminarProducto(transaction:any){
 
    console.log("qwewq")

  }

  cambioFechas(){
    
    console.log("cambiaron las")
    console.log(this.startDate)
    console.log(this.endDate)
    let startDate:string = new Date(this.startDate).toISOString().split('T')[0];
    let endDate:string = new Date(this.endDate).toISOString().split('T')[0];
    console.log(startDate)

    let ELEMENT_DATA: any[] = []
    for (let i=0; i<this.ventasByBranchId.length; i++) {
      let fechaVta:string = new Date(this.ventasByBranchId[i].fechaDeVta).toISOString().split('T')[0];

      if(fechaVta >= startDate && fechaVta <= endDate){
        let VentaELEMENT_DATA: VentaElement
        VentaELEMENT_DATA = {
          fecha: this.ventasByBranchId[i].fechaDeVta,
          sucursal: this.ventasByBranchId[i].branchId,
          vendedor: this.ventasByBranchId[i].userId,
          tarjeta: this.ventasByBranchId[i].montoTarjeta,
          efectivo: this.ventasByBranchId[i].montoEfectivo,
          saldo: this.ventasByBranchId[i].totalVta - this.ventasByBranchId[i].montoEfectivo - this.ventasByBranchId[i].montoTarjeta,
          TOTAL: this.ventasByBranchId[i].totalVta,
          productosVendidos: this.ventasByBranchId[i].productosVendidos
        }
        console.log("pusssssshhhh")
        ELEMENT_DATA.push(VentaELEMENT_DATA) 
      }
             
    
    }

    this.dataSource = new MatTableDataSource(ELEMENT_DATA);
    this.getTotalVentas()
    this.getTotalEfectivo()
    this.getTotalTarjeta()
    this.getTotalSaldo()
    console.log(this.dataSource.filteredData)
    
  }

  getTotalVentas() {
    this.totalVentas = this.dataSource.filteredData.map((t: { TOTAL: any; }) => t.TOTAL).reduce((acc: any, value: any) => acc + value, 0);  
    return this.totalVentas
  }
  getTotalEfectivo() {
    this.totalVtasEfectivo = this.dataSource.filteredData.map((t: { efectivo: any; }) => t.efectivo).reduce((acc: any, value: any) => acc + value, 0);  
    return this.totalVtasEfectivo
  }
  getTotalTarjeta() {
    this.totalVtasTarjeta = this.dataSource.filteredData.map((t: { tarjeta: any; }) => t.tarjeta).reduce((acc: any, value: any) => acc + value, 0);  
    return this.totalVtasTarjeta
  }
  getTotalSaldo() {
    this.totalVtasPendienteCobro = this.getTotalVentas()-this.getTotalEfectivo()-this.getTotalTarjeta()
    return this.totalVtasPendienteCobro
  }


  getVentasByBranchIdAndPopulateInfo(branchId:string){
    this._ventasService.getVentasByBranchIdAndPopulateInfo(branchId)
    .subscribe({
      next: (v) => {
        console.log("MENSAJE: VENTAS recibidas con exito para branchId: " + branchId)
        console.log(v)
        let respuesta: any
        respuesta = v
        this.ventasByBranchId = respuesta.slice()

      },
      error: (e) => console.error(e),
      complete: () => {
        console.info('este es el complete') 

        let ELEMENT_DATA: any[] = []
        for (let i=0; i<this.ventasByBranchId.length; i++) {
          console.log(this.ventasByBranchId[i])
          console.log("fechaaaaaaa: " + this.ventasByBranchId[i].fechaDeVta)
          let VentaELEMENT_DATA: VentaElement
          
          VentaELEMENT_DATA = {
            fecha: this.ventasByBranchId[i].fechaDeVta,
            sucursal: this.ventasByBranchId[i].branchId,
            vendedor: this.ventasByBranchId[i].userId,
            tarjeta: this.ventasByBranchId[i].montoTarjeta,
            efectivo: this.ventasByBranchId[i].montoEfectivo,
            saldo: this.ventasByBranchId[i].totalVta - this.ventasByBranchId[i].montoEfectivo - this.ventasByBranchId[i].montoTarjeta,
            TOTAL: this.ventasByBranchId[i].totalVta,
            productosVendidos: this.ventasByBranchId[i].productosVendidos
          }
          console.log("pusssssshhhh")
          ELEMENT_DATA.push(VentaELEMENT_DATA)        
        
        }

        this.dataSource = new MatTableDataSource(ELEMENT_DATA);
        this.getTotalVentas()
        this.getTotalEfectivo()
        this.getTotalTarjeta()
        this.getTotalSaldo()

      }
    })
  }

}
