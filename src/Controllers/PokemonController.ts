import express, { Request, Response } from 'express';
import { Pokemon } from '../Types/Pokemon';
import { RestResponse } from '../Dto/RestResponse';
import { testPokemonData } from '../Utils/testPokemonData';

export const pokemonRouter = express.Router();

pokemonRouter.get(
  '/:id',
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const pokemon: Pokemon = testPokemonData;
  }
);
