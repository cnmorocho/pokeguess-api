export function getRandomItem<T>(list: Array<T>): T {
  return list[Math.floor(Math.random() * list.length + 1)];
}
