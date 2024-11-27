import axios from 'axios';
import { NextFunction } from 'express';
import { addPokemon, getPokemonById } from '../ORM/Pokemon';
import { Pokemon } from '../Types/Pokemon';
import { CacheManager } from './CacheManagerService';
import { RedisService } from './RedisService';

export class PokemonService {
  static async getPokemon(
    pokemonId: string,
    next: NextFunction
  ): Promise<Pokemon | null | void> {
    // TODO: add middlware for catching these errors

    if (!pokemonId) {
      return next(new Error(`[${this.name}] Pokemon id is required`));
    }

    if (isNaN(parseInt(pokemonId))) {
      return next(new Error(`[${this.name}] Pokemon id must be a number`));
    }

    if (parseInt(pokemonId) < 1) {
      return next(new Error(`[${this.name}] Pokemon id must be higher than 1`));
    }

    const redisKey = `pokemon:${pokemonId}`;

    const redisPokemon = await RedisService.getPokemon(redisKey);
    if (redisPokemon) {
      console.log(`[${this.name}] Pokemon ${redisPokemon.name} found in Redis`);
      RedisService.checkPokemonMemory(redisPokemon.id);
      return redisPokemon;
    }

    console.log(`[${this.name}] Pokemon not found in Redis searching Mongo`);
    const pokemon = await getPokemonById(pokemonId);
    if (pokemon) {
      RedisService.addPokemon(redisKey, pokemon);
      console.log(`[${this.name}] Pokemon with id ${pokemonId} added to Redis`);
      return pokemon;
    }

    console.log(`[${this.name}] Pokemon not found in Mongo searching API`);
    return await axios
      .get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
      .then(async (response) => {
        const pokemonData: Pokemon = response.data;
        await addPokemon(pokemonData);
        console.log(
          `[${this.name}] Pokemon with id ${pokemonId} added to Mongo`
        );
        return pokemonData;
      })
      .catch((err) => {
        console.log(err);
        throw new Error(
          `[${this.name}] Pokemon with id ${pokemonId} not found`
        );
      });
  }
}
