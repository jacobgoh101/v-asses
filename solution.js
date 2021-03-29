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
function getAllCombinationsOfIndexByArrayLength(n) {
  if (n < 1) return [];
  if (n < 2) return [[0, 1]];
  let map = {};
  let size = 2;
  while (size <= n) {
    if (size === 2) {
      for (let i = 0; i < n - 1; i++) {
        for (let j = i + 1; j < n; j++) {
          map[size] = map[size] || [];
          map[size].push([i, j]);
        }
      }
    } else {
      const arrOfArrOfSize = map[size - 1];
      for (let i = 0; i < arrOfArrOfSize.length; i++) {
        const arrOfSize = arrOfArrOfSize[i];
        const lastIndex = arrOfSize[arrOfSize.length - 1];
        for (let j = lastIndex + 1; j < n; j++) {
          map[size] = map[size] || [];
          map[size].push([...arrOfSize, j]);
        }
      }
    }
    size++;
  }
  return Object.values(map).reduce((acc, curr) => [...acc, ...curr], []);
}
function uniqueBy(arr, callback) {
  let map = {};
  return arr.filter((item) => {
    const v = callback(item);
    if (typeof map[v] !== 'undefined') return false;
    map[v] = 1;
    return true;
  });
}
function solution(array, targetSum) {
  const allCombinationsOfIndex = getAllCombinationsOfIndexByArrayLength(
    array.length
  );
  const validCombinationsOfIndex = allCombinationsOfIndex
    .map((com) => {
      const filteredArr = array.filter((_, i) => com.includes(i));
      const sum = filteredArr.reduce((a, b) => a + b, 0);
      if (sum === targetSum) return com;
    })
    .filter(Boolean);
  let validCombinations = validCombinationsOfIndex.map((arr) => {
    return arr.map((i) => array[i]);
  });
  validCombinations = uniqueBy(validCombinations, (arrOfNum) => {
    return JSON.stringify(arrOfNum.slice().sort());
  });
  return validCombinations;
}
console.log(solution([5, 1, 10, 7], 11));
console.log(solution([1, 8, 9, 3, 10, 1], 12));
console.log(solution([1, 3, 9], 3));
exports.solution = solution;
