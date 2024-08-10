import { PokemonModel } from '../../Schemas/Pokemon';
import { Pokemon } from '../../Types/Pokemon';

export const getPokemonById = async (
  pokemonId: string
): Promise<Pokemon | null> => {
  const pokemon = await PokemonModel.findOne({ id: pokemonId });
  return pokemon;
};
