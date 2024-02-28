let str = 'NEGIE1';

function solution(str) {
  const text = str.slice(0, str.length - 1);
  const num = str.slice(str.length - 1);

  return text.split('').reverse().join('') + num;
}

str = solution(str);

console.log(str);