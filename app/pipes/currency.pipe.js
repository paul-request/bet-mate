import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'currency' })
export class CurrencyPipe implements PipeTransform {
  transform(value) {
    return parseFloat(value).toFixed(2);
  }
}
