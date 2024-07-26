import { UserModel } from '../../Schemas/User';
import { User } from '../../Types/User';

export const addUser = async (name: string, age: number): Promise<User> => {
  const user = await UserModel.create({ name, age });
  await user.save();
  return user;
};
