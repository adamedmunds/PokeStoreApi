import { Request, Response, Router } from 'express';
import { RestResponse } from '../Dto/RestResponse';
import { StatusCodes } from '../Enums/statusCodes';
import { PokemonService } from '../Services/PokemonService';

export const pokemonRouter = Router();

pokemonRouter.get('/:id', async (req: Request, res: Response) => {
  const pokemonId = req.params.id;
  const pokemonData = await PokemonService.getPokemon(pokemonId);

  if (!pokemonData) {
    return RestResponse.Fail(
      'Error fetching Pokemon from API',
      StatusCodes.BAD_REQUEST,
      [`Pokemon with id ${pokemonId} not found`],
      res
    );
  }

  return RestResponse.OkWithData('Pokemon found', pokemonData, res);
});
