import express, { Request, Response } from 'express';
import { PokemonService } from '../Services/PokemonService';

export const pokemonRouter = express.Router();

pokemonRouter.get('/:id', async (req: Request, res: Response) => {
  return PokemonService.getPokemon(req, res);
});