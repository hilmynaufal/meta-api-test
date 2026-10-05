"use client";

import { useActionState } from "react";
import { login } from "@/app/actions/auth";

const input =
  "mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-sky-700 focus:outline-none focus:ring-1 focus:ring-sky-700";

export function LoginForm() {
  const [state, action, pending] = useActionState(login, undefined);

  return (
    <form action={action} className="space-y-4" noValidate>
      {state?.message && (
        <p role="alert" className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-800">
          {state.message}
        </p>
      )}
      <div>
        <label htmlFor="email" className="text-sm font-medium text-slate-700">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="username"
          defaultValue={state?.email}
          className={input}
        />
        {state?.errors?.email && <p className="mt-1 text-xs text-red-700">{state.errors.email[0]}</p>}
      </div>
      <div>
        <label htmlFor="password" className="text-sm font-medium text-slate-700">
          Kata sandi
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          className={input}
        />
        {state?.errors?.password && (
          <p className="mt-1 text-xs text-red-700">{state.errors.password[0]}</p>
        )}
      </div>
      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-md bg-sky-800 px-4 py-2.5 text-sm font-medium text-white hover:bg-sky-900 disabled:opacity-60"
      >
        {pending ? "Memproses..." : "Masuk"}
      </button>
    </form>
  );
}
