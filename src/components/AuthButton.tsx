"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function AuthButton() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p className="text-sm text-gray-500">Loading...</p>;
  }

  if (!session) {
    return (
      <button
        onClick={() => signIn("google")}
        className="bg-black text-white px-4 py-2 rounded-xl text-sm hover:opacity-90"
      >
        Sign in with Google
      </button>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <img
        src={session.user?.image || ""}
        alt="user"
        className="h-8 w-8 rounded-full"
      />

      <span className="text-sm font-medium">
        {session.user?.name}
      </span>

      <button
        onClick={() => signOut()}
        className="text-sm text-red-500"
      >
        Logout
      </button>
    </div>
  );
}