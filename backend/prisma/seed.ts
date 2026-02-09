import { PrismaClient, Role } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // hash passwords
  const adminPassword = await bcrypt.hash('Admin123!', 10);
  const staffPassword = await bcrypt.hash('Staff123!', 10);

  // admin user
  await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      passwordHash: adminPassword,
      role: Role.ADMIN,
    },
  });

  // staff user
  await prisma.user.upsert({
    where: { email: 'staff@example.com' },
    update: {},
    create: {
      email: 'staff@example.com',
      passwordHash: staffPassword,
      role: Role.STAFF,
    },
  });

  console.log('✅ Seeded admin and staff users');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
