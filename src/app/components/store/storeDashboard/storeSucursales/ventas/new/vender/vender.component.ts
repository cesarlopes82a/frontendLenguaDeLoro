import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListadepreciosService } from '../../../../../../../services/listadeprecios.service';

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

  constructor(
    private _route: ActivatedRoute,
    private _listadpSevice: ListadepreciosService,

  ) { 
    this.vendedorName = String(localStorage.getItem("loggedUserName"))
    this.vendedorRole = String(localStorage.getItem("loggedUserRole"))
    this.fechaActual =  new Date().toISOString().split('T')[0];
    this.horaActual = new Date().toLocaleTimeString()
    //this.fechaActual = this.fechaActual+ " "+ this.horaActual
    

  }

  ngOnInit(): void {
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

  onSubmit(form: any){
    

    console.log("onsubmit")
  }

}
