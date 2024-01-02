export type EspeciePokemon = {
  id: number;
  name: string;
  order: number;
  gender_rate: number;
  capture_rate: number;
  base_happiness: number;
  is_baby: boolean;
  is_legendary: boolean;
  is_mythical: boolean;
  hatch_counter: number;
  has_gender_differences: boolean;
  forms_switchable: boolean;
  growth_rate: Color;
  pokedex_numbers: PokedexNumber[];
  egg_groups: Color[];
  color: Color;
  shape: Color;
  evolves_from_species: Color;
  evolution_chain: EvolutionChain;
  habitat: null;
  generation: Color;
  names: Name[];
  flavor_text_entries: FlavorTextEntry[];
  form_descriptions: FormDescription[];
  genera: Genus[];
  varieties: Variety[];
};

export type Color = {
  name: string;
  url: string;
};

export type EvolutionChain = {
  url: string;
};

export type FlavorTextEntry = {
  flavor_text: string;
  language: Color;
  version: Color;
};

export type FormDescription = {
  description: string;
  language: Color;
};

export type Genus = {
  genus: string;
  language: Color;
};

export type Name = {
  name: string;
  language: Color;
};

export type PokedexNumber = {
  entry_number: number;
  pokedex: Color;
};

export type Variety = {
  is_default: boolean;
  pokemon: Color;
};
