import { logout } from "@/app/actions/auth";
import { AdminNav } from "@/components/admin-nav";
import { requireAdmin } from "@/lib/dal";

export default async function AdminLayout({ children }: LayoutProps<"/admin">) {
  const user = await requireAdmin();

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <aside className="border-b border-slate-200 bg-white p-4 md:w-60 md:border-b-0 md:border-r">
        <p className="mb-4 px-3 text-lg font-semibold text-slate-900">SIAP PPA</p>
        <AdminNav />
      </aside>
      <div className="flex flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-3">
          <p className="text-sm text-slate-600">
            Masuk sebagai <span className="font-medium text-slate-900">{user.nama}</span>
          </p>
          <form action={logout}>
            <button
              type="submit"
              className="rounded-md border border-slate-300 px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-100"
            >
              Keluar
            </button>
          </form>
        </header>
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
