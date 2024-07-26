import { UserModel } from '../../Schemas/User';

export const getUsers = async () => {
  const users = await UserModel.find({}).select('-__v');
  return users;
};
