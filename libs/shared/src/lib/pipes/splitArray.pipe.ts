import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'splitArray'
})
export class SplitArrayPipe implements PipeTransform {

  transform<T = any>(arr: T[], fromIndex: number, tilIndex: number,): T[] {
    const gap = tilIndex - fromIndex;
    return arr.length - fromIndex < gap ?
      arr.splice(arr.length - gap, arr.length ) :
      arr.splice(fromIndex, tilIndex);
  }
}
