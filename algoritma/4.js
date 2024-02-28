const matrix = [[1, 2, 0], [4, 5, 6], [7, 8, 9]];

function solution(matrix) {
  let firstDiagonal = 0;
  let secondDiagonal = 0;

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix.length; j++) {
      if (i === j) {
        firstDiagonal += matrix[i][j];
      }
      if (j === (matrix.length - 1 - i)) {
        secondDiagonal += matrix[i][j];
      }
    }
  }

  const result = firstDiagonal - secondDiagonal;

  return result;
}

console.log(solution(matrix));