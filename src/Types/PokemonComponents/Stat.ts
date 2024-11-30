import { NamedApiResource } from './GenericApiResponse';

export type PokemonStat = {
  stat: NamedApiResource;
  effort: number;
  base_stat: number;
};
