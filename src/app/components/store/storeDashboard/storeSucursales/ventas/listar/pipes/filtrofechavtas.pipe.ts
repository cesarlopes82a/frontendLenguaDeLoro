import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtrofechavtas'
})
export class FiltrofechavtasPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
