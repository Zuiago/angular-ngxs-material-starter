import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toUpperCase'
})
export class ToUpperCasePipe implements PipeTransform {
  transform(data: string): any {
    return data.toUpperCase();
  }
}
