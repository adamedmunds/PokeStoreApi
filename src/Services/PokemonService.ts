import axios from 'axios';
import { ENDPOINTS } from '../Constants/Endpoints';
import { POKEMON_NAMES, PokemonName } from '../Constants/Pokemon';
import { POKEMON_IDS } from '../Constants/PokemonIds';
import { RestError } from '../Errors/RestError';
import { SingleRestError } from '../Errors/SingleRestError';
import { addPokemonToDatabase, getPokemonById } from '../ORM/Pokemon';
import { Pokemon } from '../Types/Pokemon';
import { RedisService } from './RedisService';

export class PokemonService {
  static async getPokemon(pokemonQuery: string): Promise<Pokemon | RestError> {
    if (!pokemonQuery) {
      return new SingleRestError(
        'Request Error',
        'BAD_REQUEST',
        'Pokemon id is required'
      );
    }

    if (isNaN(parseInt(pokemonQuery))) {
      pokemonQuery = pokemonQuery.trim().replace(/\s+/g, '-').toLowerCase();

      if (!(pokemonQuery in POKEMON_NAMES)) {
        const closestMatch = Object.keys(POKEMON_NAMES).find(
          (name) => name[0] === pokemonQuery[0] && name.includes(pokemonQuery)
        );

        let errorMessage = 'Could not find pokemon with name: ' + pokemonQuery;
        if (closestMatch !== undefined) {
          errorMessage += ', did you mean ' + closestMatch + '?';
        }

        return new SingleRestError(
          'Request Error',
          'BAD_REQUEST',
          errorMessage
        );
      }

      pokemonQuery = POKEMON_IDS[pokemonQuery as PokemonName].toString();
    }

    if (parseInt(pokemonQuery) < 1) {
      return new SingleRestError(
        'Request Error',
        'BAD_REQUEST',
        'Pokemon id must be greater than 1'
      );
    }

    const redisKey = `pokemon:${pokemonQuery}`;

    const redisPokemon = await RedisService.getPokemon(redisKey);
    if (redisPokemon) {
      console.log(`[${this.name}] Pokemon ${redisPokemon.name} found in Redis`);
      RedisService.checkPokemonMemory(redisPokemon.id);
      return redisPokemon;
    }

    console.log(`[${this.name}] Pokemon not found in Redis searching Mongo`);
    const pokemon = await getPokemonById(pokemonQuery);
    if (pokemon) {
      await this.addRedisPokemon(redisKey, pokemon);
      console.log(
        `[${this.name}] Pokemon with id ${pokemonQuery} added to Redis`
      );
      return pokemon;
    }

    console.log(`[${this.name}] Pokemon not found in Mongo searching API`);
    return await this.getPokemonFromApi(pokemonQuery);
  }

  private static async getPokemonFromApi(
    pokemonId: string
  ): Promise<Pokemon | RestError> {
    return await axios
      .get(`${ENDPOINTS.POKEMON}${pokemonId}`)
      .then(async (response) => {
        const pokemonData: Pokemon = response.data;
        await addPokemonToDatabase(pokemonData);
        console.log(
          `[${this.name}] Pokemon with id ${pokemonId} added to Mongo`
        );
        await this.addRedisPokemon(`pokemon:${pokemonId}`, pokemonData);
        return pokemonData;
      })
      .catch(() => {
        return new SingleRestError(
          'Request Error',
          'NOT_FOUND',
          `Pokemon with id ${pokemonId} not found`
        );
      });
  }

  private static async addRedisPokemon(
    key: string,
    pokemon: Pokemon
  ): Promise<void> {
    await RedisService.addPokemon(key, pokemon);
    console.log(`[${this.name}] Pokemon with id ${pokemon.id} added to Redis`);
  }
}
