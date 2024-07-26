import { PokemonModel } from '../../Schemas/Pokemon';
import { Pokemon } from '../../Types/Pokemon';

export const addPokemon = async (data: Pokemon): Promise<Pokemon> => {
  const pokemon = await PokemonModel.create(data);
  await pokemon.save();
  return pokemon;
};
