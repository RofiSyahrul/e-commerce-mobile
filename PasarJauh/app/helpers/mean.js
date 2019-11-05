export function mean(array = []) {
  if (array.length === 0) return 0;
  return array.reduce((acc, current) => acc + current) / array.length;
}
