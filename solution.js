//@ts-check
/*
Write a function that accepts 2 params as in param 1 is array and param 2 is number to return a group of array numbers that sum up to match the number. And, write test case as well.
Example 1: 
arr = [5, 1, 10, 7]
num = 11
Result: [[1, 10]]
—————————
Example 2: 
arr = [1, 8, 9, 3, 10, 1]
num = 12 
Result: [[9, 3], [1, 10, 1], [8, 3, 1]]
—————————
Example 2:
arr = [1, 3, 9]
num = 3
Result: [] 
*/

function uniqueBy(arr, callback) {
  let map = {};
  return arr.filter((item) => {
    const v = callback(item);
    if (typeof map[v] !== 'undefined') return false;
    map[v] = 1;
    return true;
  });
}

function solution(array, targetSum, indexes = [], result = []) {
  const currentItems = array.filter((_, i) => indexes.includes(i));
  const currentSum = currentItems.reduce((a, b) => a + b, 0);
  if (currentSum === targetSum) result.push(currentItems);

  let lastI = indexes[indexes.length - 1];
  if (typeof lastI === 'undefined') lastI = -1;
  for (let i = lastI + 1; i < array.length; i++) {
    solution(array, targetSum, [...indexes, i], result);
  }

  if (!indexes.length) {
    // remove single item
    result = result.filter((arr) => arr.length > 1);
    // remove dupes
    result = uniqueBy(result, (arrOfNum) => {
      return JSON.stringify(arrOfNum.slice().sort());
    });
    return result;
  }
}

// console.log(solution([5, 1, 10, 7], 11));
// console.log(solution([1, 8, 9, 3, 10, 1], 12));
// console.log(solution([1, 3, 9], 3));

exports.solution = solution;
