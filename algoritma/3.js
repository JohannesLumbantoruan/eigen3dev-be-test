const input = ['xc', 'dz', 'bbb', 'dz'];
const query = ['bbb', 'ac', 'dz'];

function solution(input, query) {
  const result = new Array(query.length).fill(0);

  for (let i = 0; i < query.length; i++) {
    for (let j = 0; j < input.length; j++) {
      if (input[j] === query[i]) {
        result[i] += 1;
      }
    }
  }

  return result;
}

console.log(solution(input, query));