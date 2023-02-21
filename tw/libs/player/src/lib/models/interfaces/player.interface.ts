import { PlayerLevel } from '../enums/player-level.enum';
export interface IPlayer {
    id: number;
    name: string;
    level: PlayerLevel;
    score: number;
}
