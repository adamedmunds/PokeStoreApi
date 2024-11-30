import { NextFunction, Request, Response, Router } from 'express';
import { RestResponse } from '../Dto/RestResponse';
import { StatusCodes } from '../Enums/statusCodes';
import { PokemonService } from '../Services/PokemonService';
import axios from 'axios';

export const pokemonRouter = Router();

pokemonRouter.get(
  '/:id',
  async (req: Request, res: Response, next: NextFunction) => {
    const pokemonId = req.params.id;
    const pokemonData = await PokemonService.getPokemon(pokemonId);

    if (pokemonData instanceof Error) {
      next(pokemonData);
      return;
    }

    return RestResponse.OkWithData('Pokemon found', pokemonData, res);
  }
);
