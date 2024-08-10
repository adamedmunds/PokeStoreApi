import { Request, Response, Router } from 'express';
import { StatusCodes } from '../Enums/statusCodes';
import { CacheManager } from '../Services/CacheManagerService';
import { RedisService } from '../Services/RedisService';

export const cacheRouter = Router();

cacheRouter.get('/:id', async (req: Request, res: Response) => {
  const pokemonAccessCount = CacheManager.getPokemonAccessCount(req.params.id);
  const data =
    pokemonAccessCount !== undefined ? pokemonAccessCount : 'no data found';
  return res.status(StatusCodes.OK).send({ data: data });
});

cacheRouter.get('/pokemon/keys', async (req: Request, res: Response) => {
  const cacheData = await RedisService.getAllPokemonKeys();
  return res.status(StatusCodes.OK).send({ data: cacheData });
});

cacheRouter.get('/remove/:id', async (req: Request, res: Response) => {
  await CacheManager.deletePokemon(parseInt(req.params.id));
  return res.status(StatusCodes.OK).send({ data: 'Pokemon removed' });
});
