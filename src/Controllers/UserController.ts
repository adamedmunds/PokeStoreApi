import { Request, Response, Router } from 'express';
import { RestResponse } from '../Dto/RestResponse';
import { userSchema } from '../Schemas/User';
import { UserService } from '../Services/UserService';
import { getMissingFields } from '../Utils/getMissingFields';

export const userRouter = Router();

userRouter.get('/', async (_: Request, res: Response): Promise<Response> => {
  return await UserService.getUsers(res);
});

userRouter.post('/', async (req: Request, res: Response): Promise<Response> => {
  const missingFields = getMissingFields(
    Object.keys(userSchema.obj),
    Object.keys(req.body)
  );

  if (missingFields.length > 0) {
    return RestResponse.ValidationFail(missingFields, res);
  }

  return await UserService.addUser(req, res);
});
