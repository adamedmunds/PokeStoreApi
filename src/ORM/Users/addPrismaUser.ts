import { PrismaClient } from '@prisma/client';
import { UserType } from '../../Types/User';

export const addPrismaUser = async (
  name: string,
  age: number
): Promise<UserType> => {
  const prisma = new PrismaClient();
  const user = await prisma.users.create({
    data: {
      name: name,
      age: age,
    },
  });

  prisma.$disconnect();
  return user;
};
