import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isCurrentPage',
})
export class IsCurrentPagePipe implements PipeTransform {
  transform(page: number, currentPage: number): boolean {
    return currentPage === page;
  }
}
