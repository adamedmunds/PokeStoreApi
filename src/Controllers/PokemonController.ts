import { Request, Response, Router } from 'express';
import { PokemonService } from '../Services/PokemonService';
import { StatusCodes } from '../Enums/statusCodes';

export const pokemonRouter = Router();

pokemonRouter.get('/:id', async (req: Request, res: Response) => {
  const pokemonData = await PokemonService.getPokemon(req.params.id);

  // return RestResponse.Fail(
  //   'Error fetching Pokemon from API',
  //   StatusCodes.BAD_REQUEST,
  //   [`Pokemon with id ${pokemonId} not found`],
  //   res
  // );
  return res.status(StatusCodes.OK).send({ data: pokemonData });
});
