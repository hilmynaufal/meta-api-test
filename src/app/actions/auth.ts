"use server";

import bcrypt from "bcryptjs";
import * as z from "zod";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { createSession, deleteSession } from "@/lib/session";

const LoginSchema = z.object({
  email: z.email({ error: "Masukkan email yang valid." }).trim().toLowerCase(),
  password: z.string().min(1, { error: "Kata sandi wajib diisi." }),
});

export type LoginState =
  | { errors?: { email?: string[]; password?: string[] }; message?: string; email?: string }
  | undefined;

// Hash tiruan agar waktu respons sama baik email ada maupun tidak.
const DUMMY_HASH = bcrypt.hashSync("tidak-dipakai", 12);

export async function login(_state: LoginState, formData: FormData): Promise<LoginState> {
  const parsed = LoginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });
  const emailInput = String(formData.get("email") ?? "");
  if (!parsed.success) {
    return { errors: z.flattenError(parsed.error).fieldErrors, email: emailInput };
  }

  const { email, password } = parsed.data;
  const user = await prisma.pengguna.findUnique({ where: { email } });
  const cocok = await bcrypt.compare(password, user?.kataSandiHash ?? DUMMY_HASH);

  if (!user || !user.aktif || !cocok) {
    return { message: "Email atau kata sandi salah.", email: emailInput };
  }

  await createSession({ userId: user.id, peran: user.peran });
  redirect(user.peran === "ADMIN" ? "/admin" : "/");
}

export async function logout() {
  await deleteSession();
  redirect("/login");
}
