import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {AbstractDomainApi} from '@tw/shared';
import {Observable, of} from 'rxjs';
import {catchError, switchMap} from 'rxjs/operators';
import {GetPlayersFilters, GetPlayersResponse} from '../models/interfaces/player-item.interface';


@Injectable()
export class PlayerApiService extends AbstractDomainApi {

  constructor(private httpClient: HttpClient) {
    super(httpClient, '/api/v1/players');
  }

  /**
   * Get Players
   * Path: /players
   * Method: get
   * Params:
   *  start: integer - description: ,
   *  n: number: ,
   *  level: string : ,
   *  score: integer
   *  search: string
   */
  getPlayers(params: GetPlayersFilters): Observable<GetPlayersResponse> {
    return this.httpClient.get<GetPlayersResponse>(this.baseUrl, {
      params: new HttpParams({fromObject: {...params}}),
      observe: 'response'
    }).pipe(
      switchMap((response) => of({
        players: response.body || [],
        total: Number(response.headers.get('x-total'))
      })),
      catchError(this.onError<any>('fetchPlayers', {total: 0, players: []})),
    );
  }

  /**
   * Fetch Suspects
   * GET /api/v1/players/suspects
   */
  fetchSuspects(): Observable<{ suspects: number[] }> {
    return this.httpClient.get<number[]>(this.baseUrl + '/suspects').pipe(
      catchError(this.onError('fetchSuspects', [])),
      switchMap((suspects: number[]) => of({suspects: suspects})),
    );
  }

  private onError<T = any>(origin: string, fallbackVal: T): (error: any) => Observable<T> {
    return (err) => {
      console.error('error in executing method ' + origin);
      console.error(err);
      return of(fallbackVal as T);
    };
  }

}
