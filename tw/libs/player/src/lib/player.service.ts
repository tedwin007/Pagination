import {Injectable} from '@angular/core';
import {PlayerApiService} from './services/player-api.service';
import {GetPlayersFilters, PlayersState} from './models/interfaces/player-item.interface';
import {INITIAL_QUERY_PARAMS, INITIAL_STATE} from './consts';
import {FiltersMangerService} from './services/filters-manger.service';
import {StateManger} from '@tw/shared';

@Injectable()
export class PlayerService extends StateManger<PlayersState> {

  constructor(private playerApiService: PlayerApiService, private filtersMangerService: FiltersMangerService) {
    super(INITIAL_STATE);
    this.initState()
  }

  /**
   *  Fetch Players
   *  - checks if the data was already requested with the given filters
   *      - True: get the data from caching
   *      - False: make an api request with the given filters (GetPlayersFilters) + cache the results
   *  - update the state (StateManger) -> updates the UI
   * @param params
   */
  async fetchPlayers(params: Partial<GetPlayersFilters>): Promise<void> {
    const activeFilters = this.filtersMangerService.getValue();
    const {total, players} = await this.filtersMangerService.filterPlayers({...activeFilters, ...params})
    const currentState = this.getValue();
    this.setState({total, players, suspects: currentState.suspects || []});
  }

  /**
   * Init State
   *  - given that the 'suspects' are static, we can fetch that data once the user loads the app and save it  inMemory
   *  - same flow as 'fetchPlayers' method
   */
  private async initState(): Promise<void> {
    const {suspects} = await this.playerApiService.fetchSuspects().toPromise()
    await this.fetchPlayers(INITIAL_QUERY_PARAMS)
    this.setState({...this.getValue(), suspects})
  }

}
