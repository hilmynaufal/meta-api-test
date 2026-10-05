"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// Menu fitur lain ditampilkan nonaktif sampai kartu pengerjaannya selesai.
const MENU = [
  { href: "/admin", label: "Dashboard", aktif: true },
  { href: "/admin/jenis-kekerasan", label: "Jenis Kekerasan", aktif: false },
  { href: "/admin/laporan", label: "Laporan", aktif: false },
  { href: "/admin/jadwal", label: "Jadwal Pendampingan", aktif: false },
  { href: "/admin/kontak-darurat", label: "Kontak Darurat", aktif: false },
];

export function AdminNav() {
  const pathname = usePathname();
  return (
    <nav aria-label="Menu admin" className="flex flex-col gap-1 text-sm">
      {MENU.map((m) =>
        m.aktif ? (
          <Link
            key={m.href}
            href={m.href}
            aria-current={pathname === m.href ? "page" : undefined}
            className={`rounded-md px-3 py-2 font-medium ${
              pathname === m.href ? "bg-sky-800 text-white" : "text-slate-700 hover:bg-slate-100"
            }`}
          >
            {m.label}
          </Link>
        ) : (
          <span
            key={m.href}
            aria-disabled="true"
            className="flex items-center justify-between rounded-md px-3 py-2 text-slate-400"
          >
            {m.label}
            <span className="text-[10px] uppercase tracking-wide">Segera</span>
          </span>
        ),
      )}
    </nav>
  );
}
