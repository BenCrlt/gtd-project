"use client";
import { useTheme } from "next-themes";
import React from "react";
import { Moon, SunMedium } from "lucide-react";
import { Switch } from "@/components/ui/switch";

export const ThemeToggle = () => {
  const { setTheme } = useTheme();
  return (
    <div className="flex gap-2">
      <Moon />
      <Switch
        onCheckedChange={(checked) => setTheme(checked ? "light" : "dark")}
      />
      <SunMedium />
    </div>
  );
};
