import { Pipe, PipeTransform} from '@angular/core';
import Swal from 'sweetalert2';
import {VentasService} from '../../../../../../../../services/ventas.service';

@Pipe({
  name: 'filtroproductos'
})


export class FiltroproductosPipe implements PipeTransform {
  productoSeleecionado!: string;
  
  constructor(
    public _ventasService:VentasService,
    
  ) { 
    this._ventasService.setEstadoCoinicidenciaFullCod(false)
  }

  transform(value: any, arg: any): any {
    let resultProducts: any[]=[];    
    for(const product of value){
      
      if ((product.product.codigo.indexOf(arg) > -1) || (product.product.productName.toLowerCase().indexOf(arg.toLowerCase()) > -1) ){
     //   console.log(product.product)
        if(product.product.codigo == arg ){

            this._ventasService.setEstadoCoinicidenciaFullCod(true)
            this._ventasService.enviarProductoSeleccionado.emit({
              data: product
            })                  
         
        }
        resultProducts.push(product)

      }
      
    }
    
    return resultProducts
    
  }

}
