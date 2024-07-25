import express, { Request, Response } from 'express';
import { RestResponse } from '../Dto/RestResponse';
import { User } from '../Models/User';
import { addPrismaUser } from '../ORM/Users/addPrismaUser';
import { UserService } from '../Services/UserService';
import { getMissingFields } from '../Utils/getMissingFields';

export const userRouter = express.Router();

userRouter.get('/', async (req: Request, res: Response): Promise<Response> => {
  let startAt = 0;
  if (req.query.startAt) {
    startAt = +req.query.startAt;
  }
  if (startAt < 0) {
    return RestResponse.ValidationFail(['startAt can not be negative'], res);
  }

  return await UserService.getUsers(startAt, res);
});

userRouter.post('/', async (req: Request, res: Response): Promise<Response> => {
  const missingFields = getMissingFields(User.fields, Object.keys(req.body));

  if (missingFields.length > 0) {
    return RestResponse.ValidationFail(missingFields, res);
  }

  return await UserService.addUser(req, res);
});
