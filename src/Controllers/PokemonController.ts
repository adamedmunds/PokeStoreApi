import express, { Request, Response } from 'express';
import { PokemonService } from '../Services/PokemonService';

export const pokemonRouter = express.Router();

pokemonRouter.post('/', async (req: Request, res: Response) => {
  return PokemonService.addPokemon(req, res);
});

pokemonRouter.get('/:id', async (req: Request, res: Response) => {
  return PokemonService.getPokemon(req, res);
});