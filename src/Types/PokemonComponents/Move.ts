import { GenericApiResponse } from './GenericApiResponse';
import { PokemonMoveVersion } from './MoveVersion';

export type PokemonMove = {
  move: GenericApiResponse;
  version_group_details: Array<PokemonMoveVersion>;
};
