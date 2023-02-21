import {Component, OnInit, ViewChild} from '@angular/core';
import {PaginationState, SearchbarComponent} from "@tw/shared";
import {Observable} from "rxjs";
import {
  FiltersMangerService,
  GetPlayersFilters,
  GridFilterChangeParams,
  MAX_ITEMS_ALLOWED,
  PlayerService,
  PlayersState
} from "./../";
import {PaginationService} from "@tw/shared";

@Component({
  selector: 'tw-player',
  styles: [`
    :host {
      height: 100%;
      width: 100%;
    }`],
  template: `
    <ng-container *ngIf="state$ | async as state">
      <ng-container *ngIf="filters$ |async as filters">
        <tw-tournament-grid [players]="state.players"
                            [total]="state.total"
                            [suspects]="state.suspects"
                            [filters]="filters"
                            [currentPage]="(pagination$|async)?.currentPage"
                            [itemsPerPage]="itemsPerPage"
                            (jumpToPageChange)="pageChange($event)"
                            (itemPerPageChange)="itemPerPageChange($event)"
                            (currentPageChange)="pageChange($event)"
                            (gridFilterChange)="gridFilterChange($event)">
        </tw-tournament-grid>
      </ng-container>
    </ng-container>`,
})
export class PlayerComponent implements OnInit {
  @ViewChild(SearchbarComponent) searchbarComponent?: SearchbarComponent
  state$?: Observable<PlayersState>
  itemsPerPage = MAX_ITEMS_ALLOWED;
  filters$!: Observable<GetPlayersFilters>;
  pagination$!: Observable<{ currentPage: number }>;

  constructor(private playerService: PlayerService,
              private filtersService: FiltersMangerService,
              private paginationService: PaginationService) {
 
  }

  ngOnInit(): void {
    this.state$ = this.playerService.getState();
    this.filters$ = this.filtersService.getState()
    this.pagination$ = this.paginationService.getState()
  }

  itemPerPageChange(value: number): void {
    if (value <= MAX_ITEMS_ALLOWED && value > 0) {
      this.playerService.fetchPlayers({
        n: value,
        start: 0,
      })
      this.itemsPerPage = value;
      this.updatePagination({currentPage: 1, itemsPerPage: value})
     }
    }

    gridFilterChange(filterBy: GridFilterChangeParams) {
      this.playerService.fetchPlayers({
        n: this.itemsPerPage,
        start: 0,
        ...filterBy
      })
      this.updatePagination({currentPage: 1})
    }

    pageChange(currentPage:number) : void {
      this.playerService.fetchPlayers({
        n: this.itemsPerPage,
        start: (currentPage - 1) * this.itemsPerPage,
      })
      this.updatePagination({currentPage})
    }

    updatePagination(params: Partial<PaginationState>): void {
      this.paginationService.setState(params)
    }
  }
