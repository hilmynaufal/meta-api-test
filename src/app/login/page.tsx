import { LoginForm } from "@/components/login-form";

export const metadata = { title: "Masuk | SIAP PPA" };

export default function LoginPage() {
  return (
    <main className="flex flex-1 items-center justify-center px-4">
      <div className="w-full max-w-sm rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-xl font-semibold text-slate-900">Masuk SIAP PPA</h1>
        <p className="mb-6 mt-1 text-sm text-slate-600">Khusus Admin dan Pendamping.</p>
        <LoginForm />
      </div>
    </main>
  );
}
