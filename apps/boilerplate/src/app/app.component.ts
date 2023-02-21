import {Component, OnInit} from '@angular/core';
import {FiltersMangerService, GetPlayersFilters, INITIAL_QUERY_PARAMS, PlayerService} from "@tw/player";
import {PaginationService} from "@tw/shared";
import {Observable} from "rxjs";


@Component({
  selector: 'tw-root',
  template: `
    <div class="container">
      <header>
        <button primary-btn (click)="clearFilters()">Clear Filters</button>
        <h2>Tournament 101 - Final Results</h2>
        <shared-searchbar [value]="(filtersState$ | async)?.search"
                          (searchChange)="onSearchChange($event)">
        </shared-searchbar>
      </header>

      <router-outlet></router-outlet>
      <footer><a href="https://www.linkedin.com/in/tidharw/"> ©Tidhar Wienreb</a></footer>
    </div>
  `,
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  filtersState$!: Observable<GetPlayersFilters>

  constructor(private playerService: PlayerService,
              private paginationService: PaginationService,
              private filterService: FiltersMangerService) {
  }

  ngOnInit(): void {
    this.filtersState$ = this.filterService.getState()
  }

  onSearchChange(term: string): void {
    const {itemsPerPage} = this.paginationService.getValue()
    this.playerService.fetchPlayers({
      start: 0,
      n: itemsPerPage,
      search: term.toLowerCase()
    })
    this.paginationService.setState({currentPage: 1})
  }

  async clearFilters(): Promise<void> {
    const {itemsPerPage} = this.paginationService.getValue()
    this.filterService.updateCurrentFilters({...INITIAL_QUERY_PARAMS})
    await this.playerService.fetchPlayers(INITIAL_QUERY_PARAMS)
    this.paginationService.setState({currentPage: 1, itemsPerPage});
  }
}
