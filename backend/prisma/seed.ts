/*import { PrismaClient } from '../generated/prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient()

async function main() {
  const passwordHash = await bcrypt.hash('AdminPassword123', 10);

  await prisma.user.create({
    data: {
      email: 'admin@kwata.cm',
      name: 'Super Admin',
      passwordHash,
      role: 'ADMIN',
    },
  });

  console.log('Admin user created successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
  */