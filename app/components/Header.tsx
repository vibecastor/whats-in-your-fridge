"use client";

import ThemeToggle from "./ThemeToggle";

function Header() {
  return (
    <header className="py-4 bg-background border-b border-card-border transition-colors">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <h1 className="text-2xl md:text-3xl font-bold text-primary">
          fridge assistant
        </h1>
        <ThemeToggle />
      </div>
    </header>
  );
}

export default Header;
