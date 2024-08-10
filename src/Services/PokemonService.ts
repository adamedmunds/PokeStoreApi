import axios from 'axios';
import { PokemonModel } from '../Schemas/Pokemon';
import { Pokemon } from '../Types/Pokemon';
import { CacheManager } from './CacheManagerService';
import { RedisService } from './RedisService';

export class PokemonService {
  static async getPokemon(pokemonId: string): Promise<Pokemon | null> {
    // TODO: add middlware for catching these errors

    if (!pokemonId) {
      throw new Error(`[${this.name}] Pokemon id is required`);
    }

    if (isNaN(parseInt(pokemonId))) {
      throw new Error(`[${this.name}] Pokemon id must be a number`);
    }

    if (parseInt(pokemonId) < 1) {
      throw new Error(`[${this.name}] Pokemon id must be higher than 1`);
    }

    const redisKey = `pokemon:${pokemonId}`;

    const redisPokemon = await RedisService.getPokemon(redisKey);
    if (redisPokemon) {
      console.log(`[${this.name}] Pokemon ${redisPokemon.name} found in Redis`);
      CacheManager.movePokemonToFront(redisPokemon.id);
      return redisPokemon;
    }

    console.log(`[${this.name}] Pokemon not found in Redis searching Mongo`);
    const pokemon = await PokemonModel.findOne({ id: pokemonId });
    if (pokemon) {
      const accessCount = CacheManager.updatePokemon(pokemonId);
      const pokemonAccessCount = CacheManager.getPokemonAccessCount(pokemonId);
      console.log(`[${this.name}] Pokemon access count: ${pokemonAccessCount}`);
      if (accessCount >= RedisService.REDIS_ACCESS_COUNT) {
        RedisService.addPokemon(redisKey, pokemon);
        CacheManager.addPokemonToList(pokemon);
        console.log(
          `[${this.name}] Pokemon with id ${pokemonId} added to Redis`
        );
      }
      return pokemon;
    }
    console.log(`[${this.name}] Pokemon not found in Mongo searching API`);
    return await axios
      .get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
      .then(async (response) => {
        const pokemonData: Pokemon = response.data;
        const pokemon = await PokemonModel.create(pokemonData);
        await pokemon.save();
        console.log(
          `[${this.name}] Pokemon with id ${pokemonId} added to Mongo`
        );
        CacheManager.updatePokemon(pokemonId);
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
