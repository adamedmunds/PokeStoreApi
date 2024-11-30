import { NamedApiResource } from './GenericApiResponse';
import { PokemonType } from './Type';

export type PokemonTypePast = {
  generation: NamedApiResource;
  types: Array<PokemonType>;
};
