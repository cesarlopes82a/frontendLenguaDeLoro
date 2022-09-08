import { EventEmitter, Injectable, Output } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

import { Observable, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })

export class SidenavService {
 // @Output() enviarNuevaTiendaCreada: EventEmitter<any> = new EventEmitter();
     
  private sidenav!: MatSidenav;

  constructor(){
   
  }


  public setSidenav(sidenav: MatSidenav) {
      this.sidenav = sidenav;
  }

  public open() {
      return this.sidenav.open();
  }


  public close() {
      return this.sidenav.close();
  }

  public toggle(): void {
  this.sidenav.toggle();
  }

  
  
}