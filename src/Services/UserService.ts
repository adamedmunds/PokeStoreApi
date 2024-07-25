import { Response } from 'express';
import { RestResponse } from '../Dto/RestResponse';
import { getPrismaUsers } from '../ORM/Users/getPrismaUsers';

export class UserService {
  static async getUsers(startAt: number, res: Response): Promise<Response> {
    const data = await getPrismaUsers(startAt);
    return RestResponse.OkWithData('Users fetched successfully', data, res);
  }
}
