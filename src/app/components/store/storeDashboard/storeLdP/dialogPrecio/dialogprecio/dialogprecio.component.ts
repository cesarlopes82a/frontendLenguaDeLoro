import { Component, OnInit, Inject } from '@angular/core';
import { ListadepreciosService } from 'src/app/services/listadeprecios.service';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';


@Component({
  selector: 'app-dialogprecio',
  templateUrl: './dialogprecio.component.html',
  styleUrls: ['./dialogprecio.component.css']
})
export class DialogprecioComponent implements OnInit {
  public metodoSeleccionado:string = "montofijo"
  public diferenciaMontos!:number;
  public precioCompra!:number;
  public precioVenta!:number;
  public montoFijo!:number;
  public montoPorcentaje!:number;
  public precioPorPorcentajeHabilitado:boolean=true;
  public productName!:string 
  

  constructor(
    private _listadeprecioService: ListadepreciosService,
    @Inject(MAT_DIALOG_DATA) public data: any   //aca recibo la info que me mandan al abrirl el dialog
  ) { 
    
  }

  ngOnInit(): void {

    this.productName = this.data.productName
    console.log("el prodproductName")
    console.log(this.data.productName)
    if(this.data.precioCompra == "-"){
      this.precioPorPorcentajeHabilitado = false
    }else{
      this.precioCompra = this.data.precioCompra
    }

  }
  calcularPrecio(){

    console.log("el metododo seleccionado: " +this.metodoSeleccionado)
    
    if(this.metodoSeleccionado=="porcentaje" && this.montoPorcentaje){
      this.precioVenta=(this.montoPorcentaje*this.precioCompra/100)+this.precioCompra
    }else{
      if(this.metodoSeleccionado=="montofijo"){
        this.precioVenta=this.montoFijo
      }
    }
    if(this.precioVenta && this.precioCompra ){
      this.diferenciaMontos= Number(parseFloat(String(this.precioVenta-this.precioCompra)).toFixed(2))
    }    
  }
 

}
