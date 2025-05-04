"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");

  // Initialize theme from localStorage on client-side
  useEffect(() => {
    // Add dark mode class to document by default
    document.documentElement.classList.add("dark");

    const storedTheme = localStorage.getItem("theme") as Theme;

    // If there's a stored theme, use it, otherwise keep dark as default
    if (storedTheme) {
      setTheme(storedTheme);

      // Adjust the class based on the stored theme
      if (storedTheme === "light") {
        document.documentElement.classList.remove("dark");
      }
    } else {
      // No stored preference, set dark as default in storage
      localStorage.setItem("theme", "dark");
    }
  }, []);

  // Toggle theme handler
  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === "light" ? "dark" : "light";

      // Update localStorage
      localStorage.setItem("theme", newTheme);

      // Toggle class on document
      if (newTheme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }

      return newTheme;
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
}
