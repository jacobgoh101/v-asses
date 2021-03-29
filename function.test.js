const { solution } = require('./function');

test(`[5, 1, 10, 7], 11`, () => {
  expect(solution([5, 1, 10, 7], 11)).toEqual([[1, 10]]);
});
test(`[1, 8, 9, 3, 10, 1], 12`, () => {
  expect(solution([1, 8, 9, 3, 10, 1], 12)).toEqual([
    [9, 3],
    [1, 10, 1],
    [8, 3, 1],
  ]);
});
test(`[1, 3, 9], 3`, () => {
  expect(solution([1, 3, 9], 3)).toEqual([]);
});
