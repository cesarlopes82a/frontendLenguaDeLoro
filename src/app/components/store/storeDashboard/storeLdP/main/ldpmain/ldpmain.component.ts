import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ComprasService } from '../../../../../../services/compras.service';
import { ListadepreciosService } from '../../../../../../services/listadeprecios.service';
import { global } from '../../../../../../services/global';

@Component({
  selector: 'app-ldpmain',
  templateUrl: './ldpmain.component.html',
  styles: [
  ]
})
export class LDPmainComponent implements OnInit {
  public storeId!:string
  public quieroEliminarEsteRegistro!: string
  public listasdeprecios!: any
  public defaultListaDP!: string

  constructor(
    private _route: ActivatedRoute,
    private _listadpSevice: ListadepreciosService
  ) { }

  ngOnInit(): void {
    this._route.params.subscribe(
      params => {
        this.storeId = params['id']
        console.log("esto es lo que me trajo el params: storeId:" + this.storeId)
        this.getListasdpByStoreIdAndPopulateInfo(this.storeId)        
      }
    )
  }

  getListasdpByStoreIdAndPopulateInfo(storeId: string){
    this._listadpSevice.getListasdpByStoreIdAndPopulateInfo(storeId)
    .subscribe({
      next: (v) => {
        console.log("estos son las listas de precios de la store ")
        console.log(v)
        this.listasdeprecios = v
        //this.defaultListaDP = 

      },
      error: (e) => console.error(e),
      complete: () => console.info('este es el complete') 
    })
  }

  pidoEliminar(listaId:string){
    this.quieroEliminarEsteRegistro=listaId;
    console.log("es este: " + this.quieroEliminarEsteRegistro)
  }
  consultoEstadoEliminar(listaId:string){
    if(listaId==this.quieroEliminarEsteRegistro) return true;
    return false;
  }
  pidoCancelarEliminar(){
    this.quieroEliminarEsteRegistro="";
  }
  deleteLista(listaId:string){
    console.log("intento eliminar el usuario")
  }

  pidoClonar(listaId:string){
    console.log("la listaId")
    console.log(listaId)
    this._listadpSevice.enviarListId.emit({
      data:listaId
    })

  }
}
