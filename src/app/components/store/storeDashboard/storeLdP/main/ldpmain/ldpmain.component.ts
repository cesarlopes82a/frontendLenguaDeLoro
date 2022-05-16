import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ComprasService } from 'src/app/services/compras.service';
import { global } from 'src/app/services/global';

@Component({
  selector: 'app-ldpmain',
  templateUrl: './ldpmain.component.html',
  styles: [
  ]
})
export class LDPmainComponent implements OnInit {
  public storeId!:string

  constructor(
    private _route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this._route.params.subscribe(
      params => {
        this.storeId = params['id']
        console.log("esto es lo que me trajo el params: storeId:" + this.storeId)
      }
    )
  }

}
