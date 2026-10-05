import "server-only";
import { cache } from "react";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { readSession } from "@/lib/session";

// Otorisasi sebenarnya: cek sesi DAN keadaan pengguna di database
// (proxy.ts hanya pemeriksaan optimistis berbasis cookie).
export const requireAdmin = cache(async () => {
  const session = await readSession();
  if (!session) redirect("/login");

  const user = await prisma.pengguna.findUnique({
    where: { id: session.userId },
    select: { id: true, nama: true, email: true, peran: true, aktif: true },
  });
  if (!user || !user.aktif || user.peran !== "ADMIN") redirect("/login");
  return user;
});
