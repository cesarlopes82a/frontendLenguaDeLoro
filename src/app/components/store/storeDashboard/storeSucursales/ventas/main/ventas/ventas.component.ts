import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styles: [
  ]
})
export class VentasComponent implements OnInit {
  public branchId!: string;
  public title:string;
  constructor(
    private _route: ActivatedRoute,
  ) {
    this.title = "V  E  N  T  A  S"
   }

  ngOnInit(): void {
    this._route.params.subscribe(
      params => {
        this.branchId = params['id']
      }
    )
  }

}
