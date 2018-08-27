import { Pipe, PipeTransform } from '@angular/core';

/** Pipe com objetivo principal de fazer um membro enum ser um objeto com key e value */
@Pipe({ name: 'keys' })
export class KeysPipe implements PipeTransform {
  transform(value, args: string[]): any {
    const keys = [];
    for (const enumMember in value) {
      if (!isNaN(parseInt(enumMember, 10))) {
        keys.push({ key: enumMember, value: value[enumMember] });
        // console.log("enum member: ", value[enumMember]);
      }
    }
    return keys;
  }
}
