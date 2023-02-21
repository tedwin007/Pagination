import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'tw-tournament-grid-info',
  templateUrl: './tournament-grid-info.component.html',
  styleUrls: ['./tournament-grid-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TournamentGridInfoComponent {
  @Output() itemPerPageChange = new EventEmitter<number>();
  @Output() jumpToPageChanged = new EventEmitter<number>()
  @Input() currentPage?: number;
  @Input() itemsPerPage?: number;
  @Input() total?: number;

  getTotalPages(): number {
    return this.itemsPerPage && !!this.total ?
      Math.ceil(this.total / this.itemsPerPage) : 0;
  }

  jumpToPage(value: string) {
    const page = Number(value);
    const totalPages = this.getTotalPages()
    if (totalPages && page > 0) {
      if (totalPages >= page)
        this.jumpToPageChanged.emit(page)
      else
        this.jumpToPageChanged.emit(totalPages)
    }
  }
}
