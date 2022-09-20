import { Component, Inject, OnInit } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';


@Component({
  selector: 'app-dialographvtas',
  templateUrl: './dialographvtas.component.html',
  styleUrls: ['./dialographvtas.component.css']
})
export class DialographvtasComponent implements OnInit {
  public categorias: any[]=[]
  public selectedCategoria: string = "Todas"
  public selectedDataType: string = "Unidades"
  public graphDataTodas:any[]=[]
  public graphDataByCategoria:any[]=[]
  public indexFecha!:number


  view: [number, number] = [800, 350];
  // options
  showXAxis = true;
  showYAxis = true;
  gradient = true;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Tiendas';
  showYAxisLabel = true;
  yAxisLabel = 'Ventas $';
  yAxisLabel1 = 'Transacciones';
  showDataLabels = true
  legendTitle="Referencia"

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };


  constructor(    
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    console.log("recibo esto..........")
    console.log(this.data)
    console.log(this.data.listaSeleccionada.filteredData)
    this.obtenerCategoriasRubros()
  }
  ngAfterViewInit():void{
    
  }

  updateData(){

    console.log("MENSAJE: actualizando chart ventas...")
    this.graphDataTodas = [...this.graphDataTodas]

    this.graphDataByCategoria = [...this.graphDataByCategoria]
  }

  obtenerCategoriasRubros(){
    console.log("obtenerCategoriasRubros()")
    for (let i=0; i<this.data.listaSeleccionada.filteredData.length; i++){
      for (let p=0; p<this.data.listaSeleccionada.filteredData[i].productosVendidos.length; p++){
        let existeCategoriaRubro = this.categorias.find(element => element == this.data.listaSeleccionada.filteredData[i].productosVendidos[p].rubro.categoryName);
        if(!existeCategoriaRubro){
          this.categorias.push(this.data.listaSeleccionada.filteredData[i].productosVendidos[p].rubro.categoryName)
        }
      }
    }
    this.selectedCategoria="Todas"
    console.log(this.categorias)
    this.graficarVentas(this.selectedCategoria)
    
    
  }


  graficarVentas(selectedCategoria:string){
    console.log("MENSAJE: Graficando ventas...")

    if(this.graphDataTodas){
      this.graphDataTodas.splice(0, this.graphDataTodas.length);
    }
    if(this.graphDataByCategoria){
      this.graphDataByCategoria.splice(0, this.graphDataByCategoria.length)
    }
    
    if(!selectedCategoria){
      selectedCategoria="Todas"
    }
    console.log(selectedCategoria)
    if(selectedCategoria=="Todas"){
      for (let c=0; c<this.categorias.length; c++){
        let objGraph = {
          "name":this.categorias[c],
          "value":0
        }

        for (let i=0; i<this.data.listaSeleccionada.filteredData.length; i++){
          for (let p=0; p<this.data.listaSeleccionada.filteredData[i].productosVendidos.length; p++){
            if(this.data.listaSeleccionada.filteredData[i].productosVendidos[p].rubro.categoryName == this.categorias[c]){
              if(this.selectedDataType == "Unidades"){
                objGraph.value += this.data.listaSeleccionada.filteredData[i].productosVendidos[p].cantidad
              }
              if(this.selectedDataType == "Monto"){
                objGraph.value += this.data.listaSeleccionada.filteredData[i].productosVendidos[p].total
              }              
            };
            
          }
        }
        this.graphDataTodas.push(objGraph)
      }      
    } else{
      for (let i=0; i<this.data.listaSeleccionada.filteredData.length; i++){        
        let fechaVta:string = new Date(this.data.listaSeleccionada.filteredData[i].fecha).toLocaleDateString().split('T')[0];
        let fechaEncontrada = false

        for (let f=0; f<this.graphDataByCategoria.length; f++){
          if(String(this.graphDataByCategoria[f].name) == String(fechaVta)){
            this.indexFecha = f
            fechaEncontrada = true
            break
          }
        }
        if (fechaEncontrada == false){
          let objGraph = {
            "name":fechaVta,
            "value":0
          }
          this.graphDataByCategoria.push(objGraph)
          this.indexFecha = this.graphDataByCategoria.length -1
        }
        
        
        for (let p=0; p<this.data.listaSeleccionada.filteredData[i].productosVendidos.length; p++){
          if(selectedCategoria == this.data.listaSeleccionada.filteredData[i].productosVendidos[p].rubro.categoryName){ 
            if(this.selectedDataType == "Unidades"){
              this.graphDataByCategoria[this.indexFecha].value += this.data.listaSeleccionada.filteredData[i].productosVendidos[p].cantidad
            }
            if(this.selectedDataType == "Monto"){
              this.graphDataByCategoria[this.indexFecha].value += this.data.listaSeleccionada.filteredData[i].productosVendidos[p].total
            }
          }
        }            
      }
  
      this.graphDataTodas = this.graphDataByCategoria.slice()
    }
      
    console.log(this.graphDataTodas)
    console.log(this.graphDataByCategoria)
    
    this.updateData()
  }

  onSelect(event: any) {
    console.log(event);    
  }

  

}
