import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.upsert({
    where: { phone: '13800000000' },
    update: {},
    create: { phone: '13800000000' },
  });

  const child = await prisma.child.create({
    data: {
      userId: user.id,
      name: '小明',
      gender: 'boy',
      birthday: new Date('2018-03-02'),
      age: 6,
    },
  });

  await prisma.assessment.create({
    data: {
      userId: user.id,
      childId: child.id,
      city: '上海',
      sensitivities: ['花粉', '尘螨'],
      note: '夜间鼻塞明显',
    },
  });
}

main().finally(async () => {
  await prisma.$disconnect();
});
