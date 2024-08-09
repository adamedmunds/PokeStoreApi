import mongoose from 'mongoose';
import { Pokemon } from '../Types/Pokemon';

const { Schema } = mongoose;

const GenericApiResponse = {
  name: String,
  url: String,
};

const Ability = {
  is_hidden: Boolean,
  slot: Number,
  ability: GenericApiResponse,
};

const GameIndex = {
  game_index: Number,
  version: GenericApiResponse,
};

const HeldItemVersion = {
  version: GenericApiResponse,
  rarity: Number,
};

const HeldItem = {
  item: GenericApiResponse,
  version_details: [HeldItemVersion],
};

const PokemonMoveVersion = {
  move_learn_method: GenericApiResponse,
  version_group: GenericApiResponse,
  level_learned_at: Number,
};

const PokemonMove = {
  move: GenericApiResponse,
  version_group_details: [PokemonMoveVersion],
};

const Stat = {
  stat: GenericApiResponse,
  effort: Number,
  base_stat: Number,
};

const PokemonType = {
  slot: Number,
  type: { type: GenericApiResponse },
};

const PastType = {
  generation: GenericApiResponse,
  types: [PokemonType],
};

const Sprites = {
  front_default: String,
  front_shiny: { type: String, default: null },
  front_female: { type: String, default: null },
  front_shiny_female: { type: String, default: null },
  back_default: { type: String, default: null },
  back_shiny: { type: String, default: null },
  back_female: { type: String, default: null },
  back_shiny_female: { type: String, default: null },
};

const Cries = {
  latest: String,
  legacy: String,
};

export const pokemonSchema = new Schema<Pokemon>({
  id: Number,
  name: String,
  base_experience: Number,
  height: Number,
  is_default: Boolean,
  order: Number,
  weight: Number,
  abilities: [Ability],
  forms: [GenericApiResponse],
  game_indices: [GameIndex],
  held_items: [HeldItem],
  location_area_encounters: String,
  moves: [PokemonMove],
  past_types: [PastType],
  sprites: Sprites,
  cries: Cries,
  species: GenericApiResponse,
  stats: [Stat],
  types: [PokemonType],
});

export const PokemonModel = mongoose.model('Pokemon', pokemonSchema);
