import { Component, Input, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { AuthService } from 'src/app/services/auth.service';
import { global } from '../../services/global';


@Component({
  selector: 'app-private',
  templateUrl: './private.component.html',
  styleUrls: ['private.component.css'],
  styles: [
  ]
})
export class PrivateComponent implements OnInit {
  @Input()
  inputSideNav!: MatSidenav;
  private reload:boolean=true
  public url: string;

  constructor(
    private _authService:AuthService,

  ) {
    //window.location.reload();
    this.url = global.url
   }

  ngOnInit(): void {
    console.log("oninit")
    //this.inputSideNav.toggle()
  }
   
 
}
