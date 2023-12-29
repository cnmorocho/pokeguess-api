import 'dotenv/config';

const environment = {
  PORT: process.env.PORT || '8080',
  POKEAPI_OBTENER_POKEMONS_URL: process.env.POKEAPI_OBTENER_POKEMONS_URL,
};

export default environment;
