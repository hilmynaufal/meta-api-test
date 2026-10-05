# SIAP PPA

Sistem pelaporan kasus kekerasan terhadap perempuan dan anak, Kabupaten Bandung
(REQ/001/DISKOMINFO/2026). Next.js 16 (App Router) + PostgreSQL + Prisma.

## Menjalankan lokal

```bash
npm install
cp .env.example .env        # isi SESSION_SECRET dan SEED_ADMIN_PASSWORD
npm run db:up               # PostgreSQL dev di port 5434 (Docker)
npm run db:migrate
npm run db:seed             # membuat akun Admin awal dari .env
npm run dev
```

Buka http://localhost:3000/login. Area admin: `/admin`.

## Struktur

- `src/proxy.ts`: pemeriksaan optimistis cookie sesi untuk `/admin/*`
- `src/lib/session.ts`, `src/lib/dal.ts`: sesi JWT (cookie httpOnly) dan otorisasi Admin di server
- `src/app/actions/auth.ts`: login dan logout (Server Actions)
- `prisma/schema.prisma`: skema basis data

## Konvensi

Tulis kode kartu pengerjaan (mis. `K-20`) di nama branch atau pesan commit.
Dokumen proyek ada di `docs/`. Jangan commit `.env` atau data nyata.
