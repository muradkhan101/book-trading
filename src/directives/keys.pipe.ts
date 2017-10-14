import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'keys'})

export class KeysPipe implements PipeTransform {
  transform(values) {
    let keyArr = Object.keys(values);
    return keyArr.map( e => values[e]);
  }
}
