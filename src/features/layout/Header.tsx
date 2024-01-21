"use client";
import { ThemeToggle } from "@/theme/ThemeToggle";
import React from "react";
import { CheckCircle } from "lucide-react";

export const Header = () => {
  return (
    <header className="border-b border-b-accent">
      <div className="container flex items-center justify-between px-4 py-4">
        <div className="flex items-center">
          <h2 className="text-2xl font-bold">Get Things D</h2>
          <CheckCircle />
          <h2 className="text-2xl font-bold">ne!</h2>
        </div>
        <ThemeToggle />
      </div>
    </header>
  );
};
