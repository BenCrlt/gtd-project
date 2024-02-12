"use client";

import { Switch } from "@/components/ui/switch";
import { Moon, SunMedium } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export const ThemeToggle = () => {
  const [themeSelected, setThemeSelected] = useState("light");

  useEffect(() => {
    setThemeSelected(localStorage.getItem("theme") || "light");
  }, []);

  const { setTheme } = useTheme();

  const onCheckedChange = () => {
    const newTheme = themeSelected === "dark" ? "light" : "dark";
    setThemeSelected(newTheme);
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <div className="flex gap-2">
      <Moon />
      <Switch
        checked={themeSelected === "light"}
        onCheckedChange={onCheckedChange}
      />
      <SunMedium />
    </div>
  );
};
