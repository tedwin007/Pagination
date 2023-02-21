import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChange,
} from '@angular/core';
import { HasNextPagePipe } from './pipes/has-next-page.pipe';
import {PaginationService} from "./pagination.service";

@Component({
  selector: 'shared-pagination',
  templateUrl: `./pagination.component.html`,
  styleUrls: ['./pagination.component.scss'],
  providers: [HasNextPagePipe]
})
export class PaginationComponent implements OnChanges {
  constructor(private paginationService:PaginationService,private hasNextPagePipe: HasNextPagePipe) {
  }
  get itemsPerPage(): number {
    return this._itemsPerPage;
  }

  @Input() set itemsPerPage(value: number) {
    this._itemsPerPage = value;
  }
  private _itemsPerPage!: number;


  totalPages = 1;
  @Output() pageChange = new EventEmitter<number>();

  private _currentPage = 0

  @Input() set currentPage(value) {
    this._currentPage = value;
  }

  get currentPage(): number {
    return this._currentPage;
  }

  private _totalItems = 0;

  @Input() set totalItems(itemsCount: number) {
    // handles a case where totalItems has invalid input such as 0 | (like infinity | negative | string )
    if (!Number.isNaN(+itemsCount)) {
      this._totalItems = itemsCount;
      this.setTotalPages();
    } else {
      this._totalItems = 0
    }
  }

  get totalItems(): number {
    return this._totalItems;
  }


  ngOnChanges(changes: { [key: string]: SimpleChange }): void {
    if ('totalItems' in changes && 'itemsPerPage' in changes) {
      if (this.currentPage > this.totalPages) this.totalPages = 0;
    }
    else this.totalPages = 0;
    this.setTotalPages();
  }

  setTotalPages(): void {
    if (this._itemsPerPage) {
      this.totalPages = Math.ceil(this.totalItems / this._itemsPerPage);
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.setCurrentPage(this.currentPage - 1)
    }
  }

  nextPage(): void {
    if (this.hasNextPagePipe.transform(this.currentPage, this.totalPages)) {
      this.setCurrentPage(this.currentPage + 1)
    }
  }

  setCurrentPage(page: number): void {
    this.currentPage = page;
    this.paginationService.setState({itemsPerPage:this.itemsPerPage,currentPage:page})
    this.pageChange.emit(page);
  }


}
