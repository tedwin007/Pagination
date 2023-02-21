import { SplitArrayPipe } from "./splitArray.pipe";

describe('SplitArrayPipe', () => {
  let pipe: SplitArrayPipe;

  beforeEach(() => {
    pipe = new SplitArrayPipe();
  });

  it('should return an empty array if the input array is empty', () => {
    const input: any[] = [];
    const result = pipe.transform(input, 0, 0);
    expect(result).toEqual([]);
  });

  it('should return a copy of the input array if fromIndex is 0 and tilIndex is the length of the array', () => {
    const input = [1, 2, 3];
    const result = pipe.transform(input, 0, input.length);
    expect(result).toEqual(input);
    expect(result).not.toBe(input); // Make sure the pipe returns a new array instance
  });

  it('should return a copy of the input array from the specified range', () => {
    const input = [1, 2, 3, 4, 5];
    const result = pipe.transform(input, 1, 4);
    expect(result).toEqual([2, 3, 4]);
    expect(result).not.toBe(input); // Make sure the pipe returns a new array instance
  });

  it('should return the remaining elements if the specified range is too large', () => {
    const input = [1, 2, 3, 4, 5];
    const result = pipe.transform(input, 2, 10);
    expect(result).toEqual([3, 4, 5]);
    expect(result).not.toBe(input); // Make sure the pipe returns a new array instance
  });

  it('should return an empty array if fromIndex is greater than or equal to the length of the array', () => {
    const input = [1, 2, 3];
    const result = pipe.transform(input, 3, 5);
    expect(result).toEqual([]);
  });

  it('should return an empty array if tilIndex is less than or equal to fromIndex', () => {
    const input = [1, 2, 3];
    const result = pipe.transform(input, 2, 2);
    expect(result).toEqual([]);
  });
});
