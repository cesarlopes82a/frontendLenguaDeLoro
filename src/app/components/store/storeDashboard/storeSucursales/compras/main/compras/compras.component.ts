import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { global } from 'src/app/services/global';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styles: [
  ]
})
export class ComprasComponent implements OnInit {
  public branchId!: String;
  public title!: String;
  public url!: String;

  constructor(
    private _route: ActivatedRoute
  ) { }

  
  ngOnInit(): void {
    this._route.params.subscribe(
      params => {
        this.branchId = params['id']
        console.log("esto es lo que me trajo el params: branchId:" + this.branchId)
      }
    )
  }
  

}
