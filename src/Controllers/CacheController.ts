import { Request, Response, Router } from 'express';
import { StatusCodes } from '../Enums/statusCodes';
import { CacheManager } from '../Services/CacheManagerService';
import { RedisService } from '../Services/RedisService';
import { RestResponse } from '../Dto/RestResponse';

export const cacheRouter = Router();

cacheRouter.get('/:id', async (req: Request, res: Response) => {
  const pokemonAccessCount = CacheManager.getPokemonAccessCount(req.params.id);
  const data =
    pokemonAccessCount !== undefined ? pokemonAccessCount : 'no data found';
  return RestResponse.OkWithData('Pokemon access count', data, res);
});

cacheRouter.get('/pokemon/keys', async (_: Request, res: Response) => {
  const cacheData = await RedisService.getAllPokemonKeys();
  return RestResponse.OkWithData('Pokemon keys', cacheData, res);
});

cacheRouter.get('/remove/:id', async (req: Request, res: Response) => {
  await CacheManager.deletePokemon(parseInt(req.params.id));
  return RestResponse.Ok('Pokemon removed from cache', res);
});
