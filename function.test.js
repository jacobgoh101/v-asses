const { solution } = require('./solution');

function sortBy(arr, callback = (a) => a) {
  return arr.slice().sort((a, b) => callback(a) - callback(b));
}

function compareResultIgnoringOrder(arr1, arr2) {
  //sort children array
  arr1 = arr1.map((arr) => sortBy(arr));
  arr2 = arr2.map((arr) => sortBy(arr));
  // sort parent array
  arr1 = sortBy(arr1, (arr) => arr.join(''));
  arr2 = sortBy(arr2, (arr) => arr.join(''));
  expect(arr1).toEqual(arr2);
}

test(`[5, 1, 10, 7], 11`, () => {
  compareResultIgnoringOrder(solution([5, 1, 10, 7], 11), [[1, 10]]);
});

test(`[1, 8, 9, 3, 10, 1], 12`, () => {
  compareResultIgnoringOrder(solution([1, 8, 9, 3, 10, 1], 12), [
    [9, 3],
    [1, 10, 1],
    [8, 3, 1],
  ]);
});

test(`[1, 3, 9], 3`, () => {
  compareResultIgnoringOrder(solution([1, 3, 9], 3), []);
});

test(`[1,....,1], 1`, () => {
  compareResultIgnoringOrder(solution(new Array(15).fill(1), 1), []);
});

test(`[1,....,1], 15`, () => {
  compareResultIgnoringOrder(solution(new Array(15).fill(1), 15), [
    new Array(15).fill(1),
  ]);
});
