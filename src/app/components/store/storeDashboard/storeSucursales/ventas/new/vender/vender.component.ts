import { Component, OnInit } from '@angular/core';

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

  constructor() { 
    this.vendedorName = String(localStorage.getItem("loggedUserName"))
    this.vendedorRole = String(localStorage.getItem("loggedUserRole"))
    this.fechaActual =  new Date().toISOString().split('T')[0];

  }

  ngOnInit(): void {
    
  }
  onSubmit(form: any){
    

    console.log("onsubmit")
  }

}
