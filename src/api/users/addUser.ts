import { Request, Response } from 'express';
import { RestResponse } from '../../Dto/RestResponse';
import { User } from '../../Models/User';
import { addPrismaUser } from '../../ORM/Users/addPrismaUser';
import { getMissingFields } from '../../Utils/getMissingFields';

export const addUser = async (req: Request, res: Response) => {
  const missingFields = getMissingFields(User.fields, Object.keys(req.body));

  if (missingFields.length > 0) {
    return RestResponse.ValidationFail(missingFields, res);
  }

  const user = await addPrismaUser(req.body.name, req.body.age);

  return RestResponse.OkWithData('User added successfully', user, res);
};
