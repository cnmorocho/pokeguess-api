import 'dotenv/config';

const environment = {
  PORT: process.env.PORT || '8080',
  POKEAPI_GET_POKEMONS_URL: process.env.POKEAPI_GET_POKEMONS_URL,
  POKEAPI_GET_POKEMON_SPECIES_URL: process.env.POKEAPI_GET_POKEMON_SPECIES_URL,
};

export default environment;
