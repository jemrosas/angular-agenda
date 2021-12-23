import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalize'
})
export class CapitalizePipe implements PipeTransform {

  transform(value: string) :string {
    value = value.toLocaleLowerCase()
    let words = value.split(' ')
    words = words.map( word => word[0].toLocaleUpperCase() + word.substring(1))
    return words.join(' ')
  }

}
