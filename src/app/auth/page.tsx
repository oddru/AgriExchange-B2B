"use client";

import { signIn } from "next-auth/react";

export default function AuthPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-xl shadow text-center">

        <h1 className="text-2xl font-semibold mb-4">
          Sign in to continue
        </h1>

        <button
          onClick={() => signIn("google")}
          className="bg-black text-white px-6 py-2 rounded-lg"
        >
          Continue with Google
        </button>

      </div>
    </main>
  );
}