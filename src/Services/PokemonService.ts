import axios from 'axios';
import { Request, Response } from 'express';
import { RestResponse } from '../Dto/RestResponse';
import { StatusCodes } from '../Enums/statusCodes';
import { PokemonModel } from '../Schemas/Pokemon';
import { Pokemon } from '../Types/Pokemon';
import { CacheManager } from './CacheManagerService';
import { RedisService } from './RedisService';

const REDIS_ACCESS_COUNT = 4;

export class PokemonService {
  static async getPokemon(req: Request, res: Response): Promise<Response> {
    const pokemonId = req.params.id;
    const redisKey = `pokemon:${pokemonId}`;

    const redisPokemon = await RedisService.getPokemon(redisKey);
    if (redisPokemon) {
      console.log('[Pokemon] Pokemon found in Redis');
      return RestResponse.OkWithData(
        'Pokemon fetched from Redis',
        redisPokemon,
        res
      );
    }
    console.log('[Pokemon] Pokemon not found in Redis searching Mongo');

    const pokemon = await PokemonModel.findOne({ id: pokemonId });
    if (pokemon) {
      const accessCount = CacheManager.updatePokemon(pokemonId);
      if (accessCount >= REDIS_ACCESS_COUNT) {
        RedisService.addPokemon(redisKey, pokemon);
      }
      return RestResponse.OkWithData(
        'Pokemon fetched from Mongo',
        pokemon,
        res
      );
    }

    console.log('[Pokemon] Pokemon not found in Mongo searching API');

    return await axios
      .get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
      .then(async (response) => {
        const pokemonData: Pokemon = response.data;
        const pokemon = await PokemonModel.create(pokemonData);
        await pokemon.save();
        console.log(`[Pokemon] Pokemon with id ${pokemonId} added to Mongo`);
        CacheManager.updatePokemon(pokemonId);
        return RestResponse.OkWithData(
          'Pokemon fetched from API',
          pokemon,
          res
        );
      })
      .catch(() => {
        return RestResponse.Fail(
          'Error fetching Pokemon from API',
          StatusCodes.BAD_REQUEST,
          [`Pokemon with id ${pokemonId} not found`],
          res
        );
      });
  }
}
