import { apiCall } from '@/app/api/api'

const apiController: string = `pokemon`;

export async function getPokemonDetail(name: string) {
  const urlRoute = `${apiController}/${name}`;
  const pokemonDetail = await apiCall(urlRoute, 'GET', null);
  return pokemonDetail
}

export async function getPokemonSpeciesDetails(id: number) {
  const urlRoute = `pokemon-species/${id}`;
  const pokemonSpecies = await apiCall(urlRoute, 'GET', null);
  return pokemonSpecies
}


