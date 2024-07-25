import { Request, Response } from 'express';
import { RestResponse } from '../Dto/RestResponse';
import { addPrismaUser, getPrismaUsers } from '../ORM/Users';
import { RedisService } from './RedisService';

export class UserService {
  static async getUsers(startAt: number, res: Response): Promise<Response> {
    const data = await getPrismaUsers(startAt);
    return RestResponse.OkWithData('Users fetched successfully', data, res);
  }

  static async addUser(req: Request, res: Response): Promise<Response> {
    const user = await addPrismaUser(req.body.name, req.body.age);
    await RedisService.hSet(`users:${user.id}`, user);
    return RestResponse.OkWithData('User added successfully', user, res);
  }
}
