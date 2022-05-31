import { Component, OnInit, Inject,AfterViewInit, ViewChild } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {VentasService} from '../../../../../../../services/ventas.service';



@Component({
  selector: 'app-dialogventa',
  templateUrl: './dialogventa.component.html',
  styleUrls: ['./dialogventa.component.css']
})
export class DialogventaComponent implements OnInit {


  public listasdeprecios!:any;    //esta es la lista de precios completa con toda la info. la recibo en el oninit
  public producIdSeleccionado!:string
  public cantProductos!:number //es la cantidad de unidades de un producto seleccionado. por defecto es 1. se puede modificar al momento de leer el cod de barras
  public filtroProd:any = ""
  public coincidenciaCompletaCodigo: string = ""

  constructor(
    public dialogRef: MatDialogRef<DialogventaComponent>,
    public _ventasService:VentasService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    
  ) { }

  ngOnInit(): void {
    this._ventasService.enviarProductoSeleccionado.subscribe( data => {
      console.log("DIALOGCENTAaaaa.COMPONENTE RECIBO EL PRODUCTO.................-------------")
      console.log(data)
      Promise.resolve().then(() =>{
        this.limpiar()
      })
      
    //  this.dialogRef.close("salgoooooooooo")     
    })
    this.listasdeprecios = this.data.listaSeleccionada

  }
  clickFila(codigo:string){
    console.log("click acaaaa")
    console.log(codigo)
  }
  onChangeInputCantidad($event:any){    
    this._ventasService.enviarCantProductoSeleccionado.emit({
      data: this.cantProductos
    })  
  }
  
  limpiar(){
    console.log("tengo que limpiar")
    this.filtroProd = ""
    this.cantProductos = 1
  }
  

 

 

}
