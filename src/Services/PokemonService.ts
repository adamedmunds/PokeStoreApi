import axios from 'axios';
import { Request, Response } from 'express';
import { RestResponse } from '../Dto/RestResponse';
import { StatusCode } from '../Enums/statusCode';
import { addPokemon } from '../ORM/Pokemon/addPokemon';
import { PokemonModel } from '../Schemas/Pokemon';
import { Pokemon } from '../Types/Pokemon';
import { testPokemonData } from '../Utils/testPokemonData';
import { RedisService } from './RedisService';

export class PokemonService {
  static async addPokemon(req: Request, res: Response): Promise<Response> {
    const data = await addPokemon(testPokemonData);
    return RestResponse.OkWithData('Pokemon data added', data, res);
  }

  static async getPokemon(req: Request, res: Response): Promise<Response> {
    const pokemonId = req.params.id;

    const redisPokemon = await RedisService.get(`pokemon:${pokemonId}`);
    if (redisPokemon) {
      return RestResponse.OkWithData(
        'Pokemon fetched from Redis',
        redisPokemon,
        res
      );
    }
    console.log('[Pokemon] Pokemon not found in Redis searching Mongo');

    const pokemon = await PokemonModel.findOne({ id: pokemonId });
    if (pokemon) {
      // TODO: Implement Cache manager to handle when to add to redis cache
      // await RedisService.set(
      //   `pokemon:${pokemonId}`,
      //   JSON.stringify(pokemon)
      // );
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
        return RestResponse.OkWithData(
          'Pokemon fetched from API',
          pokemon,
          res
        );
      })
      .catch(() => {
        return RestResponse.Fail(
          'Error fetching Pokemon from API',
          StatusCode.BAD_REQUEST,
          [`Pokemon with id ${pokemonId} not found`],
          res
        );
      });
  }
}
