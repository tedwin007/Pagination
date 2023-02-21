import { Pipe, PipeTransform } from '@angular/core';
import { Player, SuspectedPlayer } from '../models/classes/player.class';

@Pipe({
  name: 'toGridPlayer'
})
export class ToGridPlayerPipe implements PipeTransform {

  transform(data: Player[], suspects: number[]): SuspectedPlayer[] {
    return data.map((playerItem) => {
      return new Player({ ...playerItem, isSuspected: suspects.indexOf(playerItem.id) !== -1 });
    })
  }
}
