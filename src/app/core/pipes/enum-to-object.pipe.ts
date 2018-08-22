import {Pipe, PipeTransform} from '@angular/core';
import {isNumeric} from 'rxjs/internal/util/isNumeric';
import {isObject} from 'rxjs/internal/util/isObject';

@Pipe({
    name: 'enumToObject'
})
export class EnumToObjectPipe implements PipeTransform {

    transform(data: any, args: boolean = false): EnumObjectoConverted[] {
        const result: EnumObjectoConverted[] = [];
        for (const i in data) {
            if (!isNumeric(i)) {
                if (isObject(data[i]) && !this.isString(data[i])) {
                    result.push(new EnumObjectoConverted(i, data[i]));
                } else {
                    if (!this.isString(data[i])) {
                        result.push(new EnumObjectoConverted(i, data[i]));
                    }
                }
            }
        }
        return result;
    }

    private isString(t: any) {
        return t != null && typeof t === 'string';
    }

}

export class EnumObjectoConverted {
    constructor(public name: string, public value: any = null) {
    }
}
