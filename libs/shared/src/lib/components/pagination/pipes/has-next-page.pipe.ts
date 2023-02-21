import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hasNextPage',
})
export class HasNextPagePipe implements PipeTransform {
  transform(currentPage: number, totalPages: number): boolean {
    return currentPage < totalPages;
  }
}
