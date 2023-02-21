import {Player} from "../classes/player.class";
import {PlayerLevel} from "../enums/player-level.enum";

export type SuspectedPlayer = Player & { isSuspected?: boolean };

export interface GetPlayersResponse {
  players: Player[];
  total: number;
}

export interface GetPlayersFilters extends BaseGetPlayerRequest {
  level?: string;
  score?: number;
  search?: string;
}

export interface BaseGetPlayerRequest {
  start: number;
  n: number;
}

export interface PlayersState {
  players: Player[];
  total: number;
  suspects: number[];
}

export interface QueryHistoryRecords {
  [k: string]: GetPlayersResponse;
}

export type withOptions<T> = T & { options: string[] }

export interface GridFilterChangeParams {
  level: PlayerLevel
}
