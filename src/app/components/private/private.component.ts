import { Component, Input, OnInit } from '@angular/core';
import { StoreService } from 'src/app/services/store.service';
import { MatSidenav } from '@angular/material/sidenav';
import { SidebarService } from '../../services/sidebar.service';


@Component({
  selector: 'app-private',
  templateUrl: './private.component.html',
  styles: [
  ]
})
export class PrivateComponent implements OnInit {
  @Input()
  inputSideNav!: MatSidenav;

  stores = []

  constructor(
    private storeService:StoreService,
    private sidenav: SidebarService
    ) { }

 

  ngOnInit(): void {
    console.log("oninit")
  }
  

}
