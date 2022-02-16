import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styles: [
  ]
})
export class AboutComponent implements OnInit {
  public title:string;
  public email:string;

  constructor() {
    this.title="Mi portal de tiendas"
    this.email="cesarlopez82a@gmail.com"
  }

  ngOnInit(): void {
  }

}
