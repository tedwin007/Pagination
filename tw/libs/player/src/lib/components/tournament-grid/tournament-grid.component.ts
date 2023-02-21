import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import {GetPlayersFilters, GridFilterChangeParams, IPlayer} from "@tw/player";

@Component({
  selector: 'tw-tournament-grid',
  templateUrl: './tournament-grid.component.html',
  styleUrls: ['./tournament-grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TournamentGridComponent {
  @Output() jumpToPageChange = new EventEmitter<number>();
  @Output() itemPerPageChange = new EventEmitter<number>();
  @Output() gridFilterChange = new EventEmitter<GridFilterChangeParams>()
  @Output() currentPageChange = new EventEmitter<number>()
  @Input() suspects?: number[];
  @Input() players?: IPlayer[];
  @Input() itemsPerPage!: number;
  @Input() currentPage?: number;
  @Input() total = 0
  @Input() filters!: GetPlayersFilters | null

}
