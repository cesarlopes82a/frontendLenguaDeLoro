import { Component, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { SidebarService } from './services/sidebar.service'
import { MatSidenav } from '@angular/material/sidenav';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  
  constructor(
    private authService:AuthService,
    ){ }
    
  
  title = 'frontendLenguaDeLoro';

  
}

