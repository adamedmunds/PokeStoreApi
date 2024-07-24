import { PrismaClient } from '@prisma/client';

export const getPrismaUsers = async (startAt: number = 0) => {
  const prisma = new PrismaClient();

  const users = await prisma.users.findMany({ skip: startAt });

  prisma.$disconnect();
  return users;
};
