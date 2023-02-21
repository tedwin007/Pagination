import {Injectable} from '@angular/core';
import {INITIAL_QUERY_PARAMS} from '../consts';
import {GetPlayersFilters, GetPlayersResponse} from '../models/interfaces/player-item.interface';
import {PlayerApiService} from './player-api.service';
import {Location} from '@angular/common';
import {StateManger} from "@tw/shared";

@Injectable({
  providedIn: 'root'
})
export class FiltersMangerService extends StateManger<GetPlayersFilters> {

  constructor(private playerApiService: PlayerApiService, private location: Location) {
    super({...INITIAL_QUERY_PARAMS})
  }

  //Error handling can be found in the api service
  async filterPlayers(params: GetPlayersFilters): Promise<GetPlayersResponse> {
    this.updateCurrentFilters(params);
    const currentFilters = this.getValue()
    const response = await this.playerApiService.getPlayers(currentFilters).toPromise();
    return {total: response.total || 0, players: response.players}
  }

  /**
   * Update Current Filters
   * Each time the user filters the data, we want to add the filter's changes to the current filters
   * so the user will be able to apply multiple filters at once
   * @param params
   */
  updateCurrentFilters(params: GetPlayersFilters): void {
    const currentState = {...this.getValue()};
    if (!params.search) delete currentState.search
    if (!params.score && params.score !== 0) delete currentState.score
    if (!params.level) delete currentState.level
    this.setState({...currentState, ...params})
    this.setURLFilters({...currentState, ...params})
  }

  private setURLFilters(value: GetPlayersFilters & { [k: string]: any }): void {
    const queryParams = new URLSearchParams();
    for (const valueKey in value) {
      const valueElement = value[valueKey];
      queryParams.set(valueKey, valueElement);
      this.location.replaceState('/', queryParams.toString());
    }
  }

  getFilterQueryData(key: keyof GetPlayersFilters) {
    const queryParams = new URLSearchParams(this.location.path());
    return queryParams.get(key) || ''
  }
}

