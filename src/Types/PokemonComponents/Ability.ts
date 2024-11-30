import { NamedApiResource } from './GenericApiResponse';

export type PokemonAbility = {
  is_hidden: boolean;
  slot: number;
  ability: NamedApiResource;
};
