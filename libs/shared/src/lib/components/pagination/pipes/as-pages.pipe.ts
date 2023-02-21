import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'asPages',
})
export class AsPagesPipe implements PipeTransform {
  transform(totalPages: number, currentPage: number, maxVisiblePages = 11): number[] {
    const countToFinalPage = totalPages - currentPage;
    const pages = new Array(totalPages).fill(' ').map((item, index) => index + 1);

    if (countToFinalPage <= maxVisiblePages) {
      if (pages.length - maxVisiblePages < 0) return pages
      return pages.splice(pages.length - maxVisiblePages-1, pages.length)
    }

    return pages.splice(currentPage - 1, maxVisiblePages);
  }
}
