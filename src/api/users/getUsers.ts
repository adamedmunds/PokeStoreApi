import { Response } from 'express';
import { RestResponse } from '../../Dto/RestResponse';
import { getPrismaUsers } from '../../ORM/Users/getPrismaUsers';

export const getUsers = async (startAt: number, res: Response) => {
  const data = await getPrismaUsers(startAt);
  return RestResponse.OkWithData('Users fetched successfully', data, res);
};
