import { Injectable } from '@angular/core';
import { GetPlayersFilters, GetPlayersResponse, QueryHistoryRecords } from '../models/interfaces/player-item.interface';

@Injectable()
export class CachingService {
  static queryHistory: QueryHistoryRecords = {}

  // some caching
  // there are lots of things to discuss here, such as  how important is it to have the most recent data from the server?  how often is this data changes... etc
  static getCachedPlayers(params: GetPlayersFilters): GetPlayersResponse | void {
    const key = this.generateQueryKey(params);
    return this.queryHistory[key]
  }

  static addHistoryRecord(params: Partial<GetPlayersFilters>, { total, players }: GetPlayersResponse): void {
    const queryKey = CachingService.generateQueryKey(params)
    CachingService.queryHistory[queryKey] = { total, players }
  }

  static hasQuery(key: string): boolean {
    return key in CachingService.queryHistory
  }

  private static generateQueryKey(params: Partial<GetPlayersFilters>): string {
    return `${params.start}_${params.n}_${params.level || ''}_${params.score || ''}_${params.search || ''}`
  }
}
