import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'transformNulls'
})
export class TransformNullsPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
  
    if(value =="-"){
      
    }
    return value;
  }

}
