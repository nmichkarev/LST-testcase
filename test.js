const test = require('node:test');
const assert = require('node:assert/strict');

const { serialize, deserialize } = require('./index.js');

test('50 random numbers', (t) => {
  const nums = (new Array(50)).fill().map(getRandomInteger.bind(null, 1, 301));
  testFun(nums, t.name);
});

test('100 random numbers', (t) => {
  const nums = (new Array(100)).fill().map(getRandomInteger.bind(null, 1, 301));
  testFun(nums, t.name);
});

test('500 random numbers', (t) => {
  const nums = (new Array(500)).fill().map(getRandomInteger.bind(null, 1, 301));
  testFun(nums, t.name);
});

test('1000 random numbers', (t) => {
  const nums = (new Array(1000)).fill().map(getRandomInteger.bind(null, 1, 301));
  testFun(nums, t.name);
});

test('300 random numbers of one-digit', (t) => {
  const nums = (new Array(300)).fill().map(getRandomInteger.bind(null, 1, 10));
  testFun(nums, t.name);
});

test('400 random numbers of two-digits', (t) => {
  const nums = (new Array(400)).fill().map(getRandomInteger.bind(null, 10, 100));
  testFun(nums, t.name);
});

test('1000 random numbers of three-digits', (t) => {
  const nums = (new Array(1000)).fill().map(getRandomInteger.bind(null, 100, 301));
  testFun(nums, t.name);
});

test('Each number three times', (t) => {
  let i = 1, nums = [];
  while (i < 301) {
    nums.push(i);
    nums.push(i);
    nums.push(i);
    i++;
  }
  testFun(nums, t.name);
});

function testFun(numArr, description) {
  console.log('------------------------------------------------');
  console.log(`Test suit: '${description}'`);
  console.log();
  console.log(`Array length: ${numArr.length}`);

  const stdLength = numArr.toString().length;
  const serialized = serialize(numArr);
  const deserialized = deserialize(serialized);

  //console.log(`Serialized string: "${serialized}"`);
  console.log(`Serialized string length: ${serialized.length}`);

  assert.deepStrictEqual(deserialized, numArr, 'Deserialized and original arrays are not equal');
  
  const resLength = serialized.length;
  const efficiency = Math.round((stdLength - resLength) * 100 / stdLength);

  console.log(`Efficiency: ${efficiency}%`);
  console.log('------------------------------------------------');
}

// min <= x < max
function getRandomInteger(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
}
