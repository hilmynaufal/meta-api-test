import "dotenv/config";
import bcrypt from "bcryptjs";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";

const email = process.env.SEED_ADMIN_EMAIL;
const password = process.env.SEED_ADMIN_PASSWORD;

async function main() {
  if (!email || !password || password.length < 12) {
    throw new Error("Isi SEED_ADMIN_EMAIL dan SEED_ADMIN_PASSWORD (min. 12 karakter) di .env");
  }
  const prisma = new PrismaClient({
    adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
  });
  try {
    const kataSandiHash = await bcrypt.hash(password, 12);
    await prisma.pengguna.upsert({
      where: { email },
      update: { kataSandiHash, aktif: true },
      create: { nama: "Admin", email, kataSandiHash, peran: "ADMIN" },
    });
    console.log(`Admin siap: ${email}`);
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((e) => {
  console.error(e.message);
  process.exit(1);
});
