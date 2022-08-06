import { ChangeDetectorRef,Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { VentasService } from 'src/app/services/ventas.service';
import { ActivatedRoute, Router } from '@angular/router';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {FormGroup, FormControl} from '@angular/forms';
import Swal from 'sweetalert2'


export class TableExpandableRowsExample {
  expandedElement!: VentaElement | null;
}

export interface VentaElement {
  ventaId: string;
  fecha: string;
  sucursal: string;
  vendedor: string;
  tarjeta: number;
  efectivo: number;
  saldo: number;
  TOTAL: number;
  productosVendidos: any;
  anulada: boolean;
  anuladaPor: string;
  anuladaFecha: string
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
 
  public usrsFoundEnVentas: any[]=[];
  public usuarioId!: string;
  public selectedUser: string = String(localStorage.getItem("loggedUserID"))
  public loggedUserRole: string = String(localStorage.getItem("loggedUserRole"))  
  public sucursalNombre = String(localStorage.getItem('itemMenuSeleccionado'))
  public branchId!:string;
  public ventasByBranchId: any[] = []
  public totalVentas:number = 0
  public totalVtasTarjeta:number = 0
  public totalVtasEfectivo:number =0
  public totalVtasPendienteCobro:number =0
  public fechaActual =  new Date().toISOString().slice(0, 19).replace('T', ' ')
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
        this.getVentasByBranchIdAndPopulateInfo(this.branchId)                
      }
    )
    
  }
  eliminarProducto(transaction:any){
 
    console.log("qwewq")

  }

  aplicarFiltro(){
    let startDate:string = new Date(this.startDate).toISOString().split('T')[0];
    let endDate:string = new Date(this.endDate).toISOString().split('T')[0];

    let ELEMENT_DATA: any[] = []
    for (let i=0; i<this.ventasByBranchId.length; i++) {    
      let fechaVta:string = new Date(this.ventasByBranchId[i].fechaDeVta).toISOString().split('T')[0];


      if((fechaVta >= startDate && fechaVta <= endDate) && (this.selectedUser=="Todos" || this.selectedUser == this.ventasByBranchId[i].userId._id)){
        let VentaELEMENT_DATA: VentaElement
        VentaELEMENT_DATA = {
          ventaId: this.ventasByBranchId[i]._id,
          fecha: this.ventasByBranchId[i].fechaDeVta,
          sucursal: this.ventasByBranchId[i].branchId,
          vendedor: this.ventasByBranchId[i].userId,
          tarjeta: this.ventasByBranchId[i].montoTarjeta,
          efectivo: this.ventasByBranchId[i].montoEfectivo,
          saldo: this.ventasByBranchId[i].totalVta - this.ventasByBranchId[i].montoEfectivo - this.ventasByBranchId[i].montoTarjeta,
          TOTAL: this.ventasByBranchId[i].totalVta,
          productosVendidos: this.ventasByBranchId[i].productosVendidos,
          anulada :  this.ventasByBranchId[i].anulada.anulada,
          anuladaPor : this.ventasByBranchId[i].anulada.anuladaPor,
          anuladaFecha : this.ventasByBranchId[i].anulada.anuladaFecha
        }

          /*
          anulada: false,
          anuladaPor: "",
          anuladaFecha: this.fechaActual
          }
          if(this.ventasByBranchId[i].anulada){
            VentaELEMENT_DATA.anulada =  this.ventasByBranchId[i].anulada.anulada,
            VentaELEMENT_DATA.anuladaPor = this.ventasByBranchId[i].anulada.anuladaPor,
            VentaELEMENT_DATA.anuladaFecha = this.ventasByBranchId[i].anulada.anuladaFecha
          }
          */

        ELEMENT_DATA.push(VentaELEMENT_DATA) 
      }
    }

    this.dataSource = new MatTableDataSource(ELEMENT_DATA);
    this.getTotalVentas()
    this.getTotalEfectivo()
    this.getTotalTarjeta()
    this.getTotalSaldo()    
  }

  onChangeUsuario($event: any) {
    
    
  }
  getTotalVentas() {
    this.totalVentas = 0
    for(let t = 0; t<this.dataSource.filteredData.length; t++){
      if(this.dataSource.filteredData[t].anulada !=true){
        this.totalVentas += this.dataSource.filteredData[t].TOTAL
      }
    }
    //this.totalVentas = this.dataSource.filteredData.map((t: { TOTAL: any; }) => t.TOTAL).reduce((acc: any, value: any) => acc + value, 0);  
    return this.totalVentas
  }
  getTotalEfectivo() {
    this.totalVtasEfectivo = 0
    for(let t = 0; t<this.dataSource.filteredData.length; t++){
      if(this.dataSource.filteredData[t].anulada !=true){
        this.totalVtasEfectivo += this.dataSource.filteredData[t].efectivo
      }
    }
    //this.totalVtasEfectivo = this.dataSource.filteredData.map((t: { efectivo: any; }) => t.efectivo).reduce((acc: any, value: any) => acc + value, 0);  
    return this.totalVtasEfectivo
  }
  getTotalTarjeta() {
    this.totalVtasTarjeta = 0
    for(let t = 0; t<this.dataSource.filteredData.length; t++){
      if(this.dataSource.filteredData[t].anulada !=true){
        this.totalVtasTarjeta += this.dataSource.filteredData[t].tarjeta
      }
    }
    //this.totalVtasTarjeta = this.dataSource.filteredData.map((t: { tarjeta: any; }) => t.tarjeta).reduce((acc: any, value: any) => acc + value, 0);  
    return this.totalVtasTarjeta
  }
  getTotalSaldo() {    
    this.totalVtasPendienteCobro = this.getTotalVentas()-this.getTotalEfectivo()-this.getTotalTarjeta()
    return this.totalVtasPendienteCobro
  }
  anularVenta(ventaId:string){
    Swal.fire({
      icon: 'warning',
      title: 'Anular Venta!',
      html: '<p style="color: #FF3333 !important; font-size: 2.5em;"> IMPORTANTE: Esta accion no podrá revertirse!</p>',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        console.log("MENSAJE: Iniciando proceso de anulacion de ventaId: " + ventaId + ". branchId: " + this.branchId)   
        this._ventasService.postAnularVenta(this.branchId, ventaId, "motivo")
        .subscribe({
          next: (respuesta) => {
            console.log("MENSAJE: Proceso de anulacion de ventaId: " + ventaId + ". branchId: " + this.branchId + " Completado exitosamente!")
            console.log(respuesta)
        
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Venta anulada exitosamente!!',
              showConfirmButton: false,
              timer: 1500
            })
          
          },
          error: (e) => {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong!',
              footer: '<strong>ERROR: </a>' + e
            })
            console.error(e)
          },
          complete: () => {
            console.log("MENSAJE: actualizando datos frontend...")

            let ELEMENT_DATA: any[] = []
            let ventaAnuladaEstado = false
            
            for (let i=0; i<this.ventasByBranchId.length; i++) {
              console.log(this.ventasByBranchId[i]._id + " - " + ventaId)
              if(String(this.ventasByBranchId[i]._id) == String(ventaId)){          
                this.ventasByBranchId[i].anulada.anulada = true
                this.ventasByBranchId[i].anulada.anuladaPor = localStorage.getItem("loggedUserName")                
                this.ventasByBranchId[i].anulada.anuladaFecha = this.fechaActual
                ventaAnuladaEstado = true

              }else{
                ventaAnuladaEstado = this.ventasByBranchId[i].anulada.anulada
              }
              let VentaELEMENT_DATA: VentaElement
              VentaELEMENT_DATA = {
                ventaId: this.ventasByBranchId[i]._id,
                fecha: this.ventasByBranchId[i].fechaDeVta,
                sucursal: this.ventasByBranchId[i].branchId,
                vendedor: this.ventasByBranchId[i].userId,
                tarjeta: this.ventasByBranchId[i].montoTarjeta,
                efectivo: this.ventasByBranchId[i].montoEfectivo,
                saldo: this.ventasByBranchId[i].totalVta - this.ventasByBranchId[i].montoEfectivo - this.ventasByBranchId[i].montoTarjeta,
                TOTAL: this.ventasByBranchId[i].totalVta,
                productosVendidos: this.ventasByBranchId[i].productosVendidos,
                anulada :  ventaAnuladaEstado,
                anuladaPor : this.ventasByBranchId[i].anulada.anuladaPor,
                anuladaFecha : this.ventasByBranchId[i].anulada.anuladaFecha
              }


              ELEMENT_DATA.push(VentaELEMENT_DATA)

            }
            this.dataSource = new MatTableDataSource(ELEMENT_DATA);
            this.getTotalVentas()
            this.getTotalEfectivo()
            this.getTotalTarjeta()
            this.getTotalSaldo()
            this.aplicarFiltro()
            console.log(ELEMENT_DATA)

            

          }
        })


        


      }
    })

    console.log("MENSAJE: Iniciando proceso de anulacion de venta. ventaId: "+ventaId)
  }

  
  getVentasByBranchIdAndPopulateInfo(branchId:string){
    this._ventasService.getVentasByBranchIdAndPopulateInfo(branchId)
    .subscribe({
      next: (v) => {
        console.log("MENSAJE: VENTAS recibidas con exito para branchId: " + branchId)
        
        let respuesta: any
        respuesta = v
        this.ventasByBranchId = respuesta.slice()
        console.log(this.ventasByBranchId)
     
      },
      error: (e) => console.error(e),
      complete: () => {
        console.info("MENSAJE: procesando ventas recibidas...") 

        let ELEMENT_DATA: any[] = []
        for (let i=0; i<this.ventasByBranchId.length; i++) {
          //esto es para llenar el array usuariosEncontradosEnVentas 
          var results = this.usrsFoundEnVentas.filter( (nickname: { _id: string; }) => { return nickname._id == this.ventasByBranchId[i].userId._id; });
          if(results.length <1){
            this.usrsFoundEnVentas.push(this.ventasByBranchId[i].userId)
          }
          /////////////////////////////////////////////////////////

          let VentaELEMENT_DATA: VentaElement
          VentaELEMENT_DATA = {
            ventaId: this.ventasByBranchId[i]._id,
            fecha: this.ventasByBranchId[i].fechaDeVta,
            sucursal: this.ventasByBranchId[i].branchId,
            vendedor: this.ventasByBranchId[i].userId,
            tarjeta: this.ventasByBranchId[i].montoTarjeta,
            efectivo: this.ventasByBranchId[i].montoEfectivo,
            saldo: this.ventasByBranchId[i].totalVta - this.ventasByBranchId[i].montoEfectivo - this.ventasByBranchId[i].montoTarjeta,
            TOTAL: this.ventasByBranchId[i].totalVta,
            productosVendidos: this.ventasByBranchId[i].productosVendidos,  
            anulada :  this.ventasByBranchId[i].anulada.anulada,
            anuladaPor : this.ventasByBranchId[i].anulada.anuladaPor,
            anuladaFecha : this.ventasByBranchId[i].anulada.anuladaFecha
          }

            /*
            anulada: false,
            anuladaPor: "",
            anuladaFecha: this.fechaActual
          }
          if(this.ventasByBranchId[i].anulada){
            VentaELEMENT_DATA.anulada =  this.ventasByBranchId[i].anulada.anulada,
            VentaELEMENT_DATA.anuladaPor = this.ventasByBranchId[i].anulada.anuladaPor,
            VentaELEMENT_DATA.anuladaFecha = this.ventasByBranchId[i].anulada.anuladaFecha
          }
          */

            
        
          ELEMENT_DATA.push(VentaELEMENT_DATA)        
        
        }

        
        this.dataSource = new MatTableDataSource(ELEMENT_DATA);
        
        this.getTotalVentas()
        this.getTotalEfectivo()
        this.getTotalTarjeta()
        this.getTotalSaldo()

        this.aplicarFiltro()

      }
    })
  }

}
