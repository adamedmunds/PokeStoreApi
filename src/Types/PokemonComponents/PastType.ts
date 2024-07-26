import { GenericApiResponse } from './GenericApiResponse';
import { PokemonType } from './Type';

export type PastType = {
  generation: GenericApiResponse;
  types: Array<PokemonType>;
};
