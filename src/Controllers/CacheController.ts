import { Request, Response, Router } from 'express';
import { RestResponse } from '../Dto/RestResponse';
import { CacheManager } from '../Services/CacheManagerService';
import { RedisService } from '../Services/RedisService';

export const cacheRouter = Router();

cacheRouter.get('/pokemon/keys', async (_: Request, res: Response) => {
  const cacheData = await RedisService.getAllPokemonKeys();
  return RestResponse.OkWithData('Pokemon keys', cacheData, res);
});

cacheRouter.get('/remove/:id', async (req: Request, res: Response) => {
  await CacheManager.deletePokemon(parseInt(req.params.id));
  return RestResponse.Ok('Pokemon removed from cache', res);
});
