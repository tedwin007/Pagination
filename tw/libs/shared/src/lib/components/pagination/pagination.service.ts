import {Injectable} from '@angular/core';
import {StateManger} from "../../services/state-manger-service";
import {FiltersMangerService, MAX_ITEMS_ALLOWED} from "@tw/player";

export interface PaginationState {
  currentPage: number;
  itemsPerPage: number
}

@Injectable()
export class PaginationService extends StateManger<PaginationState> {

  constructor(private filterService: FiltersMangerService) {
    super({currentPage: 1, itemsPerPage: MAX_ITEMS_ALLOWED})
  }

  setState(data: Partial<PaginationState>) {
    super.setState({...this.getValue(), ...data});
  }
}
