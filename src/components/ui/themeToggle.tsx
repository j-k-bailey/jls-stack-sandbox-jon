import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

// Helper function to get initial theme
const getInitialTheme = () => {
  if (typeof window === "undefined") return false;
  const savedTheme = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  return savedTheme === "dark" || (!savedTheme && prefersDark);
};

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(getInitialTheme);

  useEffect(() => {
    // Apply the theme to the document on mount and when it changes
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  const toggleTheme = () => {
    const newDarkMode = !isDark;
    setIsDark(newDarkMode);
    localStorage.setItem("theme", newDarkMode ? "dark" : "light");
    document.documentElement.classList.toggle("dark", newDarkMode);
  };

  return (
    <Button semantic="primary" onClick={toggleTheme} aria-label="Toggle theme">
      {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
    </Button>
  );
}
