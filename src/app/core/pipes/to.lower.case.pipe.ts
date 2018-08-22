import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'toLowerCase'
})
export class ToLowerCasePipe implements PipeTransform {

    transform(data: string): any {
        return data.toLowerCase();
    }
}
