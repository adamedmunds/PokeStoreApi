import { NamedApiResource } from './GenericApiResponse';
import { PokemonMoveVersion } from './MoveVersion';

export type PokemonMove = {
  move: NamedApiResource;
  version_group_details: Array<PokemonMoveVersion>;
};
