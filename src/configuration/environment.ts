import 'dotenv/config';

const environment = {
  PORT: process.env.PORT || '8080',
  POKEAPI_GET_POKEDEX_URL: process.env.POKEAPI_GET_POKEDEX_URL,
};

export default environment;
