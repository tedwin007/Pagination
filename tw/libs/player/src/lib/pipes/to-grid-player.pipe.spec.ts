import { ToGridPlayerPipe } from './to-grid-player.pipe';
import {  SuspectedPlayer } from '../models/classes/player.class';
import { PlayerLevel } from '../models/enums/player-level.enum';

describe('ToGridPlayerPipe', () => {
  let pipe: ToGridPlayerPipe;

  beforeEach(() => {
    pipe = new ToGridPlayerPipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should transform data to SuspectedPlayer', () => {
    const data = [
      { id: 1, name: 'John Doe',level:PlayerLevel.Rookie,score:80},
      { id: 2, name: 'Jane Doe',level:PlayerLevel.Rookie,score:80},
      { id: 3, name: 'Bob Smith',level:PlayerLevel.Rookie,score:80},
    ];

    const result: SuspectedPlayer[] = pipe.transform(data, [2]);

    expect(result.length).toEqual(3);
    expect(result[0].id).toEqual(1);
    expect(result[0].isSuspected).toEqual(false);
    expect(result[1].id).toEqual(2);
    expect(result[1].isSuspected).toEqual(true);
    expect(result[2].id).toEqual(3);
    expect(result[2].isSuspected).toEqual(false);
  });
});
