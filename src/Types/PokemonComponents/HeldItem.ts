import { NamedApiResource } from './GenericApiResponse';
import { PokemonHeldItemVersion } from './HeldItemVersion';

export type PokemonHeldItem = {
  item: NamedApiResource;
  version_details: Array<PokemonHeldItemVersion>;
};
