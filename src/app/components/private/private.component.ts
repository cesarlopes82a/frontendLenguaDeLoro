import { Component, Input, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-private',
  templateUrl: './private.component.html',
  styles: [
  ]
})
export class PrivateComponent implements OnInit {
  @Input()
  inputSideNav!: MatSidenav;
  private reload:boolean=true

  constructor(
    private _authService:AuthService,

  ) {
    //window.location.reload();
   }

  ngOnInit(): void {
    console.log("oninit")
    //this.inputSideNav.toggle()
  }
   
 
}
