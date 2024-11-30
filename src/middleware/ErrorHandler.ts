import { NextFunction, Request, Response } from 'express';
import { RestResponse } from '../Dto/RestResponse';
import { StatusCodes } from '../Enums/statusCodes';
import { RestError } from '../Errors/RestError';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!err) return next();

  if (err instanceof RestError) {
    return RestResponse.Fail(
      err.title,
      StatusCodes.BAD_REQUEST,
      err.errors,
      res
    );
  }

  return RestResponse.Fail(
    'Internal server error',
    StatusCodes.INTERNAL_SERVER_ERROR,
    [err.message],
    res
  );
};
