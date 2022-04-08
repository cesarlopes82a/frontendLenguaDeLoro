import { Component, OnInit,ViewChild } from '@angular/core';
import { StoreService } from 'src/app/services/store.service';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { global } from 'src/app/services/global';
import { MatSidenav } from '@angular/material/sidenav';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ],
  providers:[StoreService, UserService]
})

export class SidebarComponent implements OnInit {

  @ViewChild('sidenav', {static: false}) sidenav!: MatSidenav;
  public stores:any;
  public users:any;
  public user:any = null;

  constructor(
    private _userService:UserService,
    private _authService:AuthService,
  ) { }

  async ngOnInit(): Promise<void> {
    if (this._authService.loggedIn()){
      const userId = this._authService.getDecodedAccessToken(String(this._authService.getToken())).id
      console.log("cargo el sidebar")
      await this.getUserByIdAndPopulateStores(userId)
      
    }
  }

 
  getUserByIdAndPopulateStores = async (userId:string) => {
    this._userService.getUserByIdAndPopulateStores(userId)
    .subscribe({
      next: (v) => {
        global.loggedUser = v
        global.reloadNeeded = false
        console.log("viene el next con lo que meti dentro de global.loggedUser")
        console.log(v)
        this.user=v;
        console.log("este es el objeto user desde el metodo")
        console.log(this.user)
      },
      error: (e) => console.error(e),
      complete: () => console.info('este es el complete') 
    })
  }

}
