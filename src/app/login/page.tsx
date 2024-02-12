"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Loader from "@/components/ui/loader";
import { Github } from "lucide-react";
import { signIn } from "next-auth/react";
import { useTransition } from "react";

export default function LoginPage() {
  const [isPending, startTransition] = useTransition();
  return (
    <div className="w-full flex justify-center">
      <Card>
        <CardHeader>
          <CardTitle>Bienvenue sur Get Things Done !</CardTitle>
          <CardDescription>Tu dois te connecter pour continuer</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center">
          <Button
            className="flex gap-2"
            onClick={() =>
              startTransition(() => {
                signIn("github");
              })
            }
            disabled={isPending}
          >
            <Github />
            <p>Se connecter avec Github</p>
            {isPending && <Loader />}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
