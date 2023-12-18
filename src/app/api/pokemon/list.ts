import { apiCall } from '@/app/api/api'

const apiController: string = `pokemon`;

export async function getPokemonList(limit: number = 50, offset: number = 0) {
  const urlRoute = `${apiController}?limit=${limit}&offset=${offset}`;
  const json = await apiCall(urlRoute, 'GET', null);
  const pokemonList: Pokemon[] = json.results;
  return pokemonList
}

export type Pokemon = {
  name: string;
  url: string
};