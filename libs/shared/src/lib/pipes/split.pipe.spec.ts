import { SplitPipe } from './split.pipe';

describe('SplitPipe', () => {
  let pipe: SplitPipe;

  beforeEach(() => {
    pipe = new SplitPipe();
  });

  it('should return an empty array if the input text is empty', () => {
    const input = '';
    const result = pipe.transform(input, ',');
    expect(result).toEqual([]);
  });

  it('should split the input text by the specified separator', () => {
    const input = 'apple,banana,cherry';
    const result = pipe.transform(input, ',');
    expect(result).toEqual(['apple', 'banana', 'cherry']);
  });

  it('should return an array with one item if the input text does not contain the separator', () => {
    const input = 'apple';
    const result = pipe.transform(input, ',');
    expect(result).toEqual(['apple']);
  });

  it('should ignore leading and trailing spaces around the separator', () => {
    const input = 'apple , banana, cherry';
    const result = pipe.transform(input, ',');
    expect(result).toEqual(['apple', 'banana', 'cherry']);
  });
});
