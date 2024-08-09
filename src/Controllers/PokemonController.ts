import { Request, Response, Router } from 'express';
import { PokemonService } from '../Services/PokemonService';

export const pokemonRouter = Router();

pokemonRouter.get('/:id', async (req: Request, res: Response) => {
  return PokemonService.getPokemon(req, res);
});