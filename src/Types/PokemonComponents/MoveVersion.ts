import { GenericApiResponse } from './GenericApiResponse';

export type PokemonMoveVersion = {
  move_learn_method: GenericApiResponse;
  version_group: GenericApiResponse;
  level_learned_at: number;
};
