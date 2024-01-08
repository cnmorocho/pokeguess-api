export function getRandomItem<T>(list: Array<T>): T {
  return list[Math.floor(Math.random() * list.length + 1)];
}

export function getPokemonIdFromPokeapiURL(url: string): number {
  return Number(url.slice(34, -1));
}
