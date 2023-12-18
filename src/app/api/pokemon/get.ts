import { apiCall } from '@/app/api/api'

const apiController: string = `pokemon`;

export async function getPokemonDetail(name: string) {
  const urlRoute = `${apiController}/${name}`;
  const pokemonDetail = await apiCall(urlRoute, 'GET', null);
  // console.log(json)
  // const pokemonDetail: Pokemon = json.data;
  return pokemonDetail
}

type Pokemon = {
  name: string;
  id: number;
  types: {
    name: string;
  };
};
