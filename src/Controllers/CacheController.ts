import { Request, Response, Router } from 'express';
import { StatusCodes } from '../Enums/statusCodes';
import { CacheManager } from '../Services/CacheManagerService';

export const cacheRouter = Router();

cacheRouter.get('/:id', async (req: Request, res: Response) => {
  const pokemonAccessCount = CacheManager.getPokemonAccessCount(req.params.id);
  const data =
    pokemonAccessCount !== undefined ? pokemonAccessCount : 'no data found';
  return res.status(StatusCodes.OK).send({ data: data });
});
