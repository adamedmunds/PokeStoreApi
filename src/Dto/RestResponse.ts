import { Response } from 'express';
import { StatusCodes } from '../Enums/statusCodes';

export class RestResponse {
  message: string;
  status: StatusCodes;
  errors: undefined | string[];
  data: any;
  response: Response;

  constructor(
    message: string,
    status: StatusCodes,
    errors: string[] | undefined = undefined,
    data: any = undefined,
    response: Response
  ) {
    this.message = message;
    this.status = status;
    this.errors = errors;
    this.data = data;
    this.response = response;
  }

  static Send(data: RestResponse): Response {
    const { response, ...object } = { ...data };
    return data.response.status(object.status).json(object);
  }

  static Ok(message: string, res: Response): Response {
    const object = new RestResponse(
      message,
      StatusCodes.OK,
      undefined,
      undefined,
      res
    );
    return this.Send(object);
  }

  static OkWithData(message: string, data: object, res: Response): Response {
    const object = new RestResponse(
      message,
      StatusCodes.OK,
      undefined,
      data,
      res
    );
    return this.Send(object);
  }

  static Success(
    message: string,
    status: StatusCodes,
    res: Response
  ): Response {
    const object = new RestResponse(message, status, undefined, undefined, res);
    return this.Send(object);
  }

  static Fail(
    message: string,
    status: StatusCodes,
    errors: string[],
    res: Response
  ): Response {
    const object = new RestResponse(message, status, errors, undefined, res);
    return this.Send(object);
  }

  static ValidationFail(errors: string[], res: Response): Response {
    const object = new RestResponse(
      'Validation error',
      StatusCodes.BAD_REQUEST,
      errors,
      undefined,
      res
    );
    return this.Send(object);
  }
}
