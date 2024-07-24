import { PrismaClient } from '@prisma/client';

export const addPrismaUser = async (name: string, age: number) => {
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
