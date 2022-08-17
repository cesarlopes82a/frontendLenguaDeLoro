import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nuevorubro',
  templateUrl: './nuevorubro.component.html',
  styleUrls: ['./nuevorubro.component.css']
})
export class NuevorubroComponent implements OnInit {
  public title: string = "Nueva categoria de productos."
  public categoriaNombre!: string
  constructor() { }

  ngOnInit(): void {
  }

  enviarNombre(){

  }

}
