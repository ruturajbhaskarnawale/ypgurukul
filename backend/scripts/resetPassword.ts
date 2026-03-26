import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';

dotenv.config({ path: './.env' });

const prisma = new PrismaClient();

async function main() {
  const [, , email, newPassword] = process.argv;

  if (!email || !newPassword) {
    console.error('Usage: npx ts-node scripts/resetPassword.ts <email> <newPassword>');
    process.exit(1);
  }

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      console.error('User not found for email:', email);
      process.exit(1);
    }

    const hash = await bcrypt.hash(newPassword, 10);
    await prisma.user.update({ where: { email }, data: { passwordHash: hash } });
    console.log('Password reset successful for', email);
  } catch (err) {
    console.error('Error resetting password:', err);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
