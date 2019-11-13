export function mean(array = []) {
  if (array.length === 0) return 0;
  return array.reduce((acc, current) => acc + current) / array.length;
}

export function shuffle(array = []) {
  // Fisher-Yates Algorithm
  // source: https://medium.com/@nitinpatel_20236/how-to-shuffle-correctly-shuffle-an-array-in-javascript-15ea3f84bfb
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}
