export type PokeIndex = {
    name: string;
    url: string;
}

export type Pokedex = {
    count: number;
    next: string | null;
    previous: string | null;
    results: PokeIndex[];
};
