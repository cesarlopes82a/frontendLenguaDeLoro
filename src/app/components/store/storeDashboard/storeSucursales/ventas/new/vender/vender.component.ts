import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ListadepreciosService } from '../../../../../../../services/listadeprecios.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogventaComponent } from '../dialogventa/dialogventa.component';
import { VentasService } from 'src/app/services/ventas.service';
import {MatTableDataSource} from '@angular/material/table';
import Swal from 'sweetalert2'



export interface prodSeleccionadoVta {
  nroOrden: number;
  productId:string;
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
  public defaultListaDP!: string;
  public sucursalName!: string;
  public fechaActual!: string; 
  public horaActual!:string;
  public branchId!:string;
  public listasdeprecios!:any         //esto es lo que me llega del backen
  public listadpIdSeleccionada: string = String(localStorage.getItem("defaultListaDP"))
  public listadpSeleccionadaFull!:any
  public listadpDescripcion!:string
  public listaProdSeleccionados: prodSeleccionadoVta[] = []
  public cantProdSeleccionado:number = 1
  public nroOrden:number = 0
  public totalVenta:number = 0
  public saldoPendiente:number = 0
  public montoEfectivo!:number
  public montoTarjeta!:number
  public vuelto!:number
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
    this.defaultListaDP = String(localStorage.getItem("defaultListaDP"))

    this.fechaActual =  new Date().toISOString().split('T')[0];

  }

  mensajeProdDesactivado(){
    Swal.fire(
      'Mensaje!',
      'El producto NO se encuentra desactivado. No esta habilitado para la venta',
      'warning'
    )    
  }
  mensajePrecioNoValido(){
    Swal.fire(
      'Mensaje!',
      'El producto tiene asignado un precio no valido!.',
      'error'
    )   
  }
  ngOnInit(): void {
    this._ventasService.enviarProductoSeleccionado.subscribe( data => {
      console.log("VENDER<--COMPONENTE RECIBO EL PRODUCTO.................-------------")
      console.log(data.data)
      console.log(data.data.product.desactivado.estado)
      console.log(data.data.precioVenta)
      if(data.data.product.unidadMedida == "Unidades" && Number.isInteger(this.cantProdSeleccionado) == false){
        Swal.fire(
          'Mensaje!',
          'El producto NO se comercializa en fracciones.',
          'warning'
        ) 
        this.cantProdSeleccionado = 1          
      } else if(data.data.product.desactivado.estado == true){
        console.log("prod desactivado")          
        setTimeout(this.mensajeProdDesactivado, 100);
      } else if(data.data.precioVenta <= 0){
        console.log("precio incorrecto")
        setTimeout(this.mensajePrecioNoValido, 100);
         
      } else {
        this.agregarProducto(data.data)
      }

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
        //this.selectDefaultLDP()       
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
  actualizarDescripcionLDP(){
    for (let lista of this.listasdeprecios) {
      if(lista._id == this.listadpIdSeleccionada){
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
      complete: () => {
        this.actualizarDescripcionLDP()
      }
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
      if(`${result}` == "prodDesactivado"){
        console.log("desaccccccs")
      }
      
      
    });
  }
  agregarProducto(producto:any) {
    
    let newProducto: prodSeleccionadoVta
    this.nroOrden = this.nroOrden + 1
    newProducto = {
      nroOrden: this.nroOrden,
      productId: producto.product._id,
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
    this.totalVenta = this.listaProdSeleccionados.map((t: { total: any; }) => t.total).reduce((acc: any, value: any) => acc + value, 0);
    this.montoEfectivo = this.totalVenta
    this.cd.detectChanges()   //esto es importante para que salga el error "ng0100 expression has changed after it was checked"
  }

  eliminarProducto(transaction:any){
 
    this.listaProdSeleccionados = this.listaProdSeleccionados.filter((item) => item.nroOrden !== transaction.nroOrden);
    console.log("cantidad: " + this.listaProdSeleccionados.length)

    this.dataSource = new MatTableDataSource(this.listaProdSeleccionados);
    this.totalVenta = this.listaProdSeleccionados.map((t: { total: any; }) => t.total).reduce((acc: any, value: any) => acc + value, 0);
    this.montoEfectivo = this.totalVenta
    this.montoTarjeta = 0
    this.cd.detectChanges()   //esto es importante para que salga el error "ng0100 expression has changed after it was checked"
    this.getTotalCost()

  }
  getTotalCost() {
    this.totalVenta = this.listaProdSeleccionados.map((t: { total: any; }) => t.total).reduce((acc: any, value: any) => acc + value, 0);
    this.calcularSaldoPendiente()
  //this.saldoPendiente = this.totalVenta
    return this.totalVenta
  }

  calcularSaldoPendiente(){
    console.log("-----------******-------------")
    
    setTimeout(()=>{
      this.saldoPendiente = this.totalVenta
      let montoEfectivoAUX = 0
      let montoTarjetaAUX = 0
      if(this.montoEfectivo) montoEfectivoAUX=this.montoEfectivo
      if(this.montoTarjeta) montoTarjetaAUX=this.montoTarjeta
      if(this.totalVenta - montoEfectivoAUX - montoTarjetaAUX>=0){
        this.saldoPendiente = this.totalVenta - montoEfectivoAUX - montoTarjetaAUX
      }else{
        this.saldoPendiente=0
      }

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

    if(!this.montoTarjeta) this.montoTarjeta = 0
    if(!this.vuelto) this.vuelto = 0

    if(this.totalVenta<=(this.montoEfectivo + this.montoTarjeta)){
      this.vuelto = (this.montoEfectivo+ this.montoTarjeta)-this.totalVenta
      
    }

    if(this.montoTarjeta>this.totalVenta){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
        footer: '<a href="">Why do I have this issue?</a>'
      })
    }else{
      Swal.fire({
        icon: 'warning',
        title: 'Registrar Venta',
        html: '<p style="background-color: #B9B9B9 !important;"> Total venta: ' + this.totalVenta + '</p>'+
        '<br />  Efectivo: ' + this.montoEfectivo + 
        '<br />  Tarjeta: ' + this.montoTarjeta + 
        '<br /><strong style="color:red;">  VUELTO:  </strong>' + this.vuelto,
        
        
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Confirmar',
        denyButtonText: `Cancelar`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          this.montoEfectivo = this.totalVenta - this.montoTarjeta
          console.log("/////////////////")
          console.log(this.listaProdSeleccionados)
          this._ventasService.registrarVenta(this.listaProdSeleccionados, this.totalVenta, this.montoEfectivo, this.montoTarjeta, this.comentarioVenta, this.branchId, this.vendedorId).subscribe({
            next: (v) => {
              console.log("MENSAJE: Respuesta exitosa desde el backend")
              console.log(v)

              //Swal.fire('Saved!', '', 'success')
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Venta registrada exitosamente!!',
                showConfirmButton: false,
                timer: 1500
              }) 

              //limpio todo para dejar listo para la procima venta
              this.listaProdSeleccionados.splice(0, this.listaProdSeleccionados.length);
              this.dataSource = new MatTableDataSource(this.listaProdSeleccionados);
              console.log(this.listaProdSeleccionados)
              this.montoEfectivo = this.montoNada
              this.montoTarjeta = this.montoNada
              this.totalVenta = this.montoNada
              this.comentarioVenta=""
      
              //--------------------------------------------
              
                      
            },
            error: (e) => console.error(e),
            complete: () => console.info('complete') 
          })
          
        } else if (result.isDenied) {
          Swal.fire('Venta no registrada!', '', 'info')
        }
      })
      
    }
  }

}
