import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-6 px-6 text-center">
      <h1 className="text-3xl font-semibold text-slate-900">SIAP PPA</h1>
      <p className="max-w-md text-slate-600">
        Sistem pelaporan kasus kekerasan terhadap perempuan dan anak, Kabupaten Bandung.
      </p>
      <Link
        href="/login"
        className="rounded-md bg-sky-800 px-5 py-2.5 text-sm font-medium text-white hover:bg-sky-900"
      >
        Masuk petugas
      </Link>
    </main>
  );
}
