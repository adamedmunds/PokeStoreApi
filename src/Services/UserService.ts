import { Request, Response } from 'express';
import { RestResponse } from '../Dto/RestResponse';
import { addUser, getUsers } from '../ORM/Users';
import { RedisService } from './RedisService';

export class UserService {
  static async getUsers(res: Response): Promise<Response> {
    const data = await getUsers();
    return RestResponse.OkWithData('Users fetched successfully', data, res);
  }

  static async addUser(req: Request, res: Response): Promise<Response> {
    const user = await addUser(req.body.name, req.body.age);
    // await RedisService.hSet(`users:${user.id}`, user);
    return RestResponse.OkWithData('User added successfully', user, res);
  }
}
