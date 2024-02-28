const sentence = "Saya sangat senang mengerjakan soal algoritma";

function longest(sentence) {
  const sentenceArr = sentence.split(' ');
  let result = sentenceArr[0];

  for (const word of sentenceArr) {
    if (word.length > result.length) {
      result = word;
    }
  }

  console.log(`${result}: ${result.length} character`);
}

longest(sentence);