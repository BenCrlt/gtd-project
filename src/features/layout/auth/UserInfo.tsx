"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Loader from "@/components/ui/loader";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import Typography from "@/components/ui/typography";
import { UserRound } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import React, { useTransition } from "react";

export const UserInfo = (): React.JSX.Element => {
  const { status, data: session } = useSession();
  const [isPending, startTransition] = useTransition();

  if (status === "loading" || status == "unauthenticated" || !session) {
    return <></>;
  }

  return (
    <Popover>
      <PopoverTrigger>
        <Avatar>
          {session.user.image && <AvatarImage src={session.user.image || ""} />}
          <AvatarFallback>
            <UserRound />
          </AvatarFallback>
        </Avatar>
      </PopoverTrigger>
      <PopoverContent side="bottom" align="end" className="flex flex-col gap-2">
        <Typography variant="small" className="italic">
          Connecté en tant que {session.user.name}
        </Typography>
        <Separator />
        <Button
          onClick={() => startTransition(() => signOut())}
          disabled={isPending}
        >
          {isPending ? <Loader /> : <Typography>Se déconnecter</Typography>}
        </Button>
      </PopoverContent>
    </Popover>
  );
};
