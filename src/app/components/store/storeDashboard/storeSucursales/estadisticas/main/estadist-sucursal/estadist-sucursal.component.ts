import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { VentasService } from 'src/app/services/ventas.service';

@Component({
  selector: 'app-estadist-sucursal',
  templateUrl: './estadist-sucursal.component.html',
  styleUrls: ['./estadist-sucursal.component.css']
})
export class EstadistSucursalComponent implements OnInit {
  public yearVentas!: number
  public branchId!: string;

  constructor(
    private _route: ActivatedRoute,
    private _authService:AuthService,
    private _ventasService:VentasService,
  ) { 
    var currentTime = new Date();
    this.yearVentas = currentTime.getFullYear()
    console.log(this.yearVentas);
  }

  ngOnInit(): void {
    this._route.params.subscribe(
      params => {
        this.branchId = params['id']
        if (this._authService.loggedIn()){
          console.log("MENSAJE: Decodificando access token...")
          const userId = this._authService.getDecodedAccessToken(String(this._authService.getToken())).id
          this.getVentasForStatisticsPorSucursal(userId)
        }  
      }
    )
    
  }

  updateData2(){

  }
  getVentasForStatisticsPorSucursal = async (userId:string) => {
    console.log("MENSAJE: Obteniendo VentasForStatistics para userId: " +userId + "year:" +this.yearVentas )
    this._ventasService.getVentasForStatisticsPorSucursal(userId, this.branchId, this.yearVentas)
    .subscribe({
      next: (v) => {
 

        console.log("MENSAJE: ventas obtenidas exitosamente para userId: " +userId )
        console.log(v)
       

      },
      error: (e) => console.error(e),
      complete: () => {
        console.info('este es el complete') 
       
      }
    })
  }
}
