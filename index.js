const NUM_WORD_SIZE = 9;
const STR_WORD_SIZE = 7;
const END_CHAR = '#';

function serialize(numbers) {
  let binString = numbers
    .map(num => Math.floor(num).toString(2).slice(-NUM_WORD_SIZE).padStart(NUM_WORD_SIZE, '0'))
    .join('');

  const tailLength = binString.length % STR_WORD_SIZE;
  const tail = `${END_CHAR}${binString.substr(-tailLength)}`;
  
  binString = binString.slice(0, tailLength ? -tailLength : Infinity);

  let i = 0, result = '';

  while(i < binString.length) {
    const binCode = binString.slice(i, i + STR_WORD_SIZE);
    result += String.fromCharCode(Number.parseInt(binCode, 2));

    i += STR_WORD_SIZE;
  }

  return result + tail;
}

function deserialize(hash) {
  const tailPos = hash.lastIndexOf(END_CHAR);
  const tail = hash.slice(tailPos + 1);
  hash = hash.slice(0, tailPos);
  const binString = Array.from(hash)
    .map(ch => ch.charCodeAt(0).toString(2).padStart(STR_WORD_SIZE, '0'))
    .join('') + tail;
  
  let i = 0, result = [];

  while(i < binString.length) {
    const binCode = binString.slice(i, i + NUM_WORD_SIZE);
    result.push(parseInt(binCode, 2));
    i += NUM_WORD_SIZE;
  }

  return result;
}

module.exports = { serialize, deserialize };