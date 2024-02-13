"use client";
import { ThemeToggle } from "@/theme/ThemeToggle";
import { CheckCircle } from "lucide-react";
import { UserInfo } from "./auth/UserInfo";

export const Header = () => {
  return (
    <header className="border-b border-b-accent">
      <div className="container flex items-center justify-between px-4 py-4">
        <div className="flex items-center">
          <h2 className="text-2xl font-bold">Get Things D</h2>
          <CheckCircle />
          <h2 className="text-2xl font-bold">ne!</h2>
        </div>
        <div className="flex items-center gap-9">
          <ThemeToggle />
          <UserInfo />
        </div>
      </div>
    </header>
  );
};
