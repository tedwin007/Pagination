import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'split'
})
export class SplitPipe implements PipeTransform {

  transform(text: string, by: string) {
    return text.split(by); // split text by "by" parameter
  }
}
