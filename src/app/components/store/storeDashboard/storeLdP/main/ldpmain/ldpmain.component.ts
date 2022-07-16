import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { ComprasService } from '../../../../../../services/compras.service';
import { ListadepreciosService } from '../../../../../../services/listadeprecios.service';
import { SidenavService } from 'src/app/services/sidebar.service';
import { global } from '../../../../../../services/global';
import { MatTableDataSource } from '@angular/material/table';
import {animate, state, style, transition, trigger} from '@angular/animations';
import Swal from 'sweetalert2'



export class TableExpandableRowsExample {
  expandedElement!: ldpElement | null;
}
export interface ldpElement {
  _id:string;
  listaNombre: string;
  creador: string;
  createdAt: string;
  descripcion: string;
  ldpProducts: any[];
  defaultLdp:boolean;
}

@Component({
  selector: 'app-ldpmain',
  templateUrl: './ldpmain.component.html',
  styleUrls: ['./table-expandable-rows.css'],
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
export class LDPmainComponent implements OnInit {
  public tiendaNombre:string = String(localStorage.getItem('itemMenuSeleccionado'))
  public storeId!:string
  public quieroEliminarEsteRegistro!: string
  public listasdeprecios!: any
  public defaultLdp!:string
  public defaultListaDP!: string
  public ldpUpdated:string = "false"  //creo esta variable para saber si tengo que actualizar el datasouce en el sidenav. si esta en tru actualizo el datasource

  columnsToDisplay: string[] = ['Def','Nombre',	'Creada por...',	'Fecha Creacion', 'menu'];
  dataSource!: MatTableDataSource<any>;
  expandedElement!: ldpElement | null;
  

  constructor(
    private _route: ActivatedRoute,
    private _listadpSevice: ListadepreciosService,
    private _sidenavService: SidenavService
    
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

  editarItem(){
    console.log("editarItem")
  }
  eliminarItem(){
    console.log("editarItem")
  }
  getListasdpByStoreIdAndPopulateInfo(storeId: string){
    this._listadpSevice.getListasdpByStoreIdAndPopulateInfo(storeId)
    .subscribe({
      next: (v) => {
        console.log("estos son las listas de precios de la store ")
        console.log(v)
     
        this.listasdeprecios = v
     
        //////////////////////////////////////////////
        let ELEMENT_DATA: any[] = []
        for (let i=0; i<this.listasdeprecios.length; i++) {
          
          let ldpELEMENT_DATA: ldpElement
          let defaultLdp = false
          if(String(localStorage.getItem('defaultListaDP')) == String(this.listasdeprecios[i]._id)){
            defaultLdp = true
            this.defaultLdp = this.listasdeprecios[i]._id
          }else{
            defaultLdp = false
          }

          ldpELEMENT_DATA = {
            _id: this.listasdeprecios[i]._id,
            listaNombre: this.listasdeprecios[i].listaNombre,
            creador: this.listasdeprecios[i].creadapor.username,
            createdAt: this.listasdeprecios[i].createdAt,
            descripcion:this.listasdeprecios[i].descripcion,
            ldpProducts:this.listasdeprecios[i].ldpProducts,
            defaultLdp: defaultLdp
          }
          ELEMENT_DATA.push(ldpELEMENT_DATA)
        }

        console.log("veooooooooooooooooooooooooooooooo")
        console.log(ELEMENT_DATA)
        this.dataSource = new MatTableDataSource(ELEMENT_DATA);
        
        //////////////////////////////////////////////

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
  
  setDefaultStoreLDP(listaId:string, listaNombre:string){
    
    console.log("SET default")
    console.log(listaId)
    Swal.fire({
      title: 'Lista de Precios: <strong>' + listaNombre + '</strong>',
      text: "Se establecerá esta lista de precios como lista de precios por defecto",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar!'
    }).then((result) => {      
      if (result.isConfirmed) {
        let itemMenuSeleccionadoId = String(localStorage.getItem('itemMenuSeleccionadoId'))
        this._listadpSevice.setDefaultStoreLDP(itemMenuSeleccionadoId, listaId)        
        .subscribe({
          next: (v) => {
            console.log("respuesta ")
            console.log(v)  
            this.defaultLdp = v.defaultListaDP
            this.ldpUpdated = "true"

            localStorage.setItem("ldpUpdatedTarget", itemMenuSeleccionadoId)  //Esta es la tienda o la sucursal seleccionada a la que se le modifico la Default ldp 
            localStorage.setItem("newLdpDefaultForTarget", this.defaultLdp)   //Esto me dice cual es la ldp default que tengo que asignarle al ldpUpdatedTarget
            localStorage.setItem("defaultListaDP", this.defaultLdp) //esta es la lista de precios por default seleccionada para la tienda seleccionada
            console.log("seeeeetttt defaultListaDP!!!----------")
            console.log(this.defaultLdp)
            localStorage.setItem("ldpUpdated", this.ldpUpdated)   //esto es un indicador de que la ldp por defecto fue modificada. lo necesito para actualizar el datasource en el sidebar

            Swal.fire(
              'Confirmado!',
              'Se ha establecido la lista de precios principal de la TIENDA!',
              'success'
            )
    
          },
          error: (e) => {
            console.error(e)
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Algo salió mal al intentar setear la lista por defecto!',
              //footer: '<a href="">Why do I have this issue?</a>'
            })
          },
          complete: () => console.info('este es el complete') 
        })
        



        
      }
    })
  }
 

  
}
