import { NamedApiResource } from './GenericApiResponse';

export type PokemonMoveVersion = {
  move_learn_method: NamedApiResource;
  version_group: NamedApiResource;
  level_learned_at: number;
};
