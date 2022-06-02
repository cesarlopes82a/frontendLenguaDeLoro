import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ListadepreciosService } from '../../../../../../../services/listadeprecios.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogventaComponent } from '../dialogventa/dialogventa.component';
import { VentasService } from 'src/app/services/ventas.service';
import {MatTableDataSource} from '@angular/material/table';

export interface prodSeleccionadoVta {
  nroOrden: number
  nombre: string;
  codigo: string;
  rubro: string;
  cantidad: number;
  precio: number;
  total: number;
}

@Component({
  selector: 'app-vender',
  templateUrl: './vender.component.html',
  styles: [
  ]
})
export class VenderComponent implements OnInit {
  public sucursalNombre = String(localStorage.getItem('itemMenuSeleccionado'))
  public vendedorName!: string;
  public vendedorRole!: string;
  public vendedorId!: string;
  public sucursalName!: string;
  public fechaActual!: string; 
  public horaActual!:string;
  public branchId!:string;
  public listasdeprecios!:any         //esto es lo que me llega del backen
  public listadpIdSeleccionada!: string
  public listadpSeleccionadaFull!:any
  public listadpDescripcion!:string
  public listaProdSeleccionados: prodSeleccionadoVta[] = []
  public cantProdSeleccionado:number = 1
  public nroOrden:number = 0
  public totalVenta:number = 0
  public saldoPendiente:number = 0
  public montoEfectivo!:number
  public montoTarjeta!:number
  public comentarioVenta!:string
  public montoNada!:number
  dataSource!: MatTableDataSource<any>;   // es el datasource de la tabla de prod seleccionados que se muestra en la interfaz

  displayedColumns = ['nombre', 'codigo', 'rubro', 'cantidad','precio', 'total','action'];
    
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _listadpSevice: ListadepreciosService,
    public _ventasService:VentasService,
    private dialog: MatDialog,
    private cd:ChangeDetectorRef
  ) { 
    this.vendedorName = String(localStorage.getItem("loggedUserName"))
    this.vendedorRole = String(localStorage.getItem("loggedUserRole"))
    this.vendedorId = String(localStorage.getItem("loggedUserID"))

    this.fechaActual =  new Date().toISOString().split('T')[0];

  }

  ngOnInit(): void {
    this._ventasService.enviarProductoSeleccionado.subscribe( data => {
      console.log("VENDER<--COMPONENTE RECIBO EL PRODUCTO.................-------------")
      console.log(data.data)
      this.agregarProducto(data.data)
    })
    this._ventasService.enviarCantProductoSeleccionado.subscribe( data => {
      console.log("enviarCantProductoSeleccionado<--COMPONENTE RECIBO cantidad.................-------------")
      console.log(data.data)
      this.cantProdSeleccionado=data.data      
    })
    

    this._route.params.subscribe(
      params => {
        this.branchId = params['id']
        console.log("esto es lo que me trajo el params: storeId:" + this.branchId)
        this.getListasdpByStoreIdAndPopulateInfo(this.branchId)        
      }
    )
    
  }
  onChangeLDP($event: any) {
    console.log("cambioooooo")
    for (let lista of this.listasdeprecios) {
      if(lista._id == $event.target.value){
        this.listadpDescripcion=lista.descripcion
      }
    }
  }
  getListasdpByStoreIdAndPopulateInfo(branchId: string){
    this._listadpSevice.getListasdpByStoreIdAndPopulateInfo(branchId)
    .subscribe({
      next: (v) => {
        console.log("estos son las listas de precios de la store ")
        console.log(v)
        this.listasdeprecios = v

      },
      error: (e) => console.error(e),
      complete: () => console.info('este es el complete') 
    })
  }

  openDialogVenta(){
    if(this.listadpIdSeleccionada && this.listasdeprecios){
      for (let [index, lista] of this.listasdeprecios.entries()) {
        if(this.listadpIdSeleccionada == lista._id){
          console.log(this.listadpIdSeleccionada + " - " + lista._id)
          console.log(index)
          console.log(lista)
          this.listadpSeleccionadaFull = lista
        }        
      }
    }
    const dialogRef = this.dialog.open(DialogventaComponent,{
      width:'70%',
      height:'70%',
      data:{
        'listaSeleccionada':this.listadpSeleccionadaFull,
      }  
    }); 
   
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if(`${result}` == "agregar"){
        this.openDialogVenta()
      }
      
    });
  }
  agregarProducto(producto:any) {
    
    let newProducto: prodSeleccionadoVta
    this.nroOrden = this.nroOrden + 1
    newProducto = {
      nroOrden: this.nroOrden,
      nombre: producto.product.productName,
      codigo: producto.product.codigo,
      rubro: producto.product.categoriaRubro,
      cantidad: this.cantProdSeleccionado,
      precio: producto.precioVenta,
      total: producto.precioVenta*this.cantProdSeleccionado
    }
    
    
    this.listaProdSeleccionados.push(newProducto)
    this.cantProdSeleccionado = 1
  
    this.dataSource = new MatTableDataSource(this.listaProdSeleccionados);
    this.cd.detectChanges()   //esto es importante para que salga el error "ng0100 expression has changed after it was checked"
  }

  eliminarProducto(transaction:any){
 
    this.listaProdSeleccionados = this.listaProdSeleccionados.filter((item) => item.nroOrden !== transaction.nroOrden);
    console.log("cantidad: " + this.listaProdSeleccionados.length)

    this.dataSource = new MatTableDataSource(this.listaProdSeleccionados);
    this.cd.detectChanges()   //esto es importante para que salga el error "ng0100 expression has changed after it was checked"

  }
  getTotalCost() {
    this.totalVenta = this.listaProdSeleccionados.map((t: { total: any; }) => t.total).reduce((acc: any, value: any) => acc + value, 0);
    this.calcularSaldoPendiente()
  //this.saldoPendiente = this.totalVenta
    return this.totalVenta
  }

  calcularSaldoPendiente(){
    setTimeout(()=>{
      this.saldoPendiente = this.totalVenta
      let montoEfectivoAUX = 0
      let montoTarjetaAUX = 0
      if(this.montoEfectivo) montoEfectivoAUX=this.montoEfectivo
      if(this.montoTarjeta) montoTarjetaAUX=this.montoTarjeta

      this.saldoPendiente = this.totalVenta - montoEfectivoAUX - montoTarjetaAUX
    },1)    
  }
 

  onSubmit(form: any){
    console.log("los prodddddddddddddddddddddddd")
    console.log(this.listaProdSeleccionados)
    console.log(this.listaProdSeleccionados.length)
    for (let [index, lista] of this.listaProdSeleccionados.entries()) {
      console.log(lista)
  

    console.log("onsubmitttttttttt")
    }
  }
  solicitarRegistrarCompra(){
    this._ventasService.registrarVenta(this.listaProdSeleccionados, this.totalVenta, this.montoEfectivo, this.montoTarjeta, this.comentarioVenta, this.branchId, this.vendedorId).subscribe({
      next: (v) => {
        console.log("MENSAJE: Respuesta exitosa desde el backend")
        console.log(v)
        
        //limpio todo para dejar listo para la procima venta
        this.listaProdSeleccionados.splice(0, this.listaProdSeleccionados.length);
        this.dataSource = new MatTableDataSource(this.listaProdSeleccionados);
        console.log(this.listaProdSeleccionados)
        this.montoEfectivo = this.montoNada
        this.montoTarjeta = this.montoNada
        this.comentarioVenta=""
        //--------------------------------------------
        
           
      },
      error: (e) => console.error(e),
      complete: () => console.info('complete') 
    })
  }

}
