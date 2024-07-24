import { Response } from 'express';
import { StatusCode } from '../Enums/statusCode';

export class RestResponse {
  message: string;
  status: StatusCode;
  errors: undefined | string[];
  data: any;
  response: Response;

  constructor(
    message: string,
    status: StatusCode,
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
      StatusCode.OK,
      undefined,
      undefined,
      res
    );
    return this.Send(object);
  }

  static OkWithData(message: string, data: any, res: Response): Response {
    const object = new RestResponse(
      message,
      StatusCode.OK,
      undefined,
      data,
      res
    );
    return this.Send(object);
  }

  static Success(message: string, status: StatusCode, res: Response): Response {
    const object = new RestResponse(message, status, undefined, undefined, res);
    return this.Send(object);
  }

  static Fail(
    message: string,
    status: StatusCode,
    errors: string[],
    res: Response
  ): Response {
    const object = new RestResponse(message, status, errors, undefined, res);
    return this.Send(object);
  }

  static ValidationFail(errors: string[], res: Response): Response {
    const object = new RestResponse(
      'Validation error',
      StatusCode.BAD_REQUEST,
      errors,
      undefined,
      res
    );
    return this.Send(object);
  }
}
