import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { ComprasService } from 'src/app/services/compras.service';
import { ListadepreciosService } from '../../../../../../../services/listadeprecios.service';
import { SidenavService } from 'src/app/services/sidebar.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {FormGroup, FormControl} from '@angular/forms';
import { global } from 'src/app/services/global';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-branch-ldpmain',
  templateUrl: './branch-ldpmain.component.html',
  styles: [
  ]
})
export class BranchLDPmainComponent implements OnInit {
  public branchId!: string;
  public sucursalNombre!: string;
  public listasdeprecios!: any

  constructor(
    private _route: ActivatedRoute,
    private _listadpSevice: ListadepreciosService
  ) { }

  ngOnInit(): void {
    this.sucursalNombre = String(localStorage.getItem('itemMenuSeleccionado'))
    this._route.params.subscribe(
      params => {
        this.branchId = params['id']
        this.getListasdpByStoreIdAndPopulateInfo(this.branchId)
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

}
