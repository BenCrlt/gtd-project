"use client";

import { Button } from "@/components/ui/button";
import Loader from "@/components/ui/loader";
import { LogIn, LogOut } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
import React, { useTransition } from "react";

export const AuthButton = (): React.JSX.Element => {
  const { status } = useSession();
  const [isPending, startTransition] = useTransition();

  if (status === "loading" || isPending) {
    <Loader />;
  }

  return status === "authenticated" ? (
    <Button
      onClick={() =>
        startTransition(() => {
          signIn("github");
        })
      }
    >
      <LogIn />
    </Button>
  ) : (
    <Button onClick={() => startTransition(() => signOut())}>
      <LogOut />
    </Button>
  );
};
