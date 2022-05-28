import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListadepreciosService } from '../../../../../../../services/listadeprecios.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogventaComponent } from '../dialogventa/dialogventa.component';
import { VentasService } from 'src/app/services/ventas.service';

@Component({
  selector: 'app-vender',
  templateUrl: './vender.component.html',
  styles: [
  ]
})
export class VenderComponent implements OnInit {
  public vendedorName!: string;
  public vendedorRole!: string;
  public sucursalName!: string;
  public fechaActual!: string; 
  public horaActual!:string;
  public storeId!:string;
  public listasdeprecios!:any
  public listadpIdSeleccionada!: string
  public listadpSeleccionadaFull!:any
  public listadpDescripcion!:string
  public listaProdSeleccionados: any = [
    {item: 'Beach ball', cost: 4},
    {item: 'Towel', cost: 5},
    {item: 'Frisbee', cost: 2},
    {item: 'Sunscreen', cost: 4},
    {item: 'Cooler', cost: 25},
    {item: 'Swim suit', cost: 15},
  ]

  displayedColumns = ['item', 'cost'];
    

  constructor(
    private _route: ActivatedRoute,
    private _listadpSevice: ListadepreciosService,
    public _ventasService:VentasService,
    private dialog: MatDialog,
    

  ) { 
    this.vendedorName = String(localStorage.getItem("loggedUserName"))
    this.vendedorRole = String(localStorage.getItem("loggedUserRole"))
    this.fechaActual =  new Date().toISOString().split('T')[0];
    this.horaActual = new Date().toLocaleTimeString()
    //this.fechaActual = this.fechaActual+ " "+ this.horaActual
    

  }

  ngOnInit(): void {

    

  /** Gets the total cost of all transactions. */
 
    this._ventasService.enviarProductoSeleccionado.subscribe( data => {
      console.log("VENDER<--COMPONENTE RECIBO EL PRODUCTO.................-------------")
      console.log(data.data)
      this.agregarProducto(data.data)
    //  this.dialogRef.close("salgoooooooooo")     
    })

    this._route.params.subscribe(
      params => {
        this.storeId = params['id']
        console.log("esto es lo que me trajo el params: storeId:" + this.storeId)
        this.getListasdpByStoreIdAndPopulateInfo(this.storeId)        
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
  getListasdpByStoreIdAndPopulateInfo(storeId: string){
    this._listadpSevice.getListasdpByStoreIdAndPopulateInfo(storeId)
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
    console.log("agrego este producto")
    console.log(producto)
  }

  getTotalCost() {
    return this.listaProdSeleccionados.map((t: { cost: any; }) => t.cost).reduce((acc: any, value: any) => acc + value, 0);
  }

  onSubmit(form: any){
    

    console.log("onsubmit")
  }

}
