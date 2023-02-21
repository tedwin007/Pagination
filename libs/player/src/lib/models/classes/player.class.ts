import { BaseGetPlayerRequest, GetPlayersFilters } from "../interfaces/player-item.interface";
import { PlayerLevel } from "../enums/player-level.enum";

export interface SuspectedPlayer {
  id: number;
  name: string;
  level: PlayerLevel;
  score: number;
  isSuspected?: boolean
}
export class Player implements SuspectedPlayer {
  public id = 0
  public name = ''
  public level = PlayerLevel.Rookie
  public score = 0

  constructor(data: SuspectedPlayer) {
    Object.assign(this, data);
  }

  static toRequestData(data: BaseGetPlayerRequest): GetPlayersFilters {
    return {
      ...data
    }
  }
}
