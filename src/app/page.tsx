"use client";

import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session, status } = useSession();

  if (status === "authenticated") {
    return <p>Signed in as {JSON.stringify(session.user)}</p>;
  }

  return <p>Sign in</p>;
}
