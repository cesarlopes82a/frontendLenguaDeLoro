import { Component,  OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { single } from './data';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styles: [
  ]
})

 
export class EstadisticasGlobalComponent implements OnInit {
  public loggedUser:any = null;

  single: any[] = [] ;


  view: [number, number] = [700, 400];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Country';
  showYAxisLabel = true;
  yAxisLabel = 'Population';

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  constructor(
    private _authService:AuthService,
    private _userService:UserService,
  ) {
    if (this._authService.loggedIn()){
      console.log("ESTOY LOGUEADOOOOOOOOO SIDEBARRRRRRRRR")
      const userId = this._authService.getDecodedAccessToken(String(this._authService.getToken())).id
      
      this.getUserByIdAndPopulateStores(userId)

    }


    Object.assign(this, { single })
  }

  onSelect(event: any) {
    console.log(event);
  }
 

  ngOnInit(): void {
    
  }

  getUserByIdAndPopulateStores = async (userId:string) => {
    console.log("le estoy pasando el if desde el sidebar a getUserByIdAndPopulateStores() " +userId )
    this._userService.getUserByIdAndPopulateStores(userId)
    .subscribe({
      next: (v) => {
        
        console.log("viene el next con lo que meti dentro de global.loggedUser")
        console.log(v)
        this.loggedUser=v;
        
        

      },
      error: (e) => console.error(e),
      complete: () => console.info('este es el complete') 
    })
  }
}
