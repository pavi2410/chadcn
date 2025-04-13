import React from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { ThemeToggle } from '@/components/theme-toggle';

export function Header() {
  return (
    <header className="border-b">
      <div className="container flex h-16 items-center">
        <a href="/" className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src="/chadcn.png" alt="Chadcn Logo" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <span className="font-bold text-xl">Chadcn Registry</span>
        </a>
        <nav className="ml-auto flex items-center gap-4">
          <a href="/" className="text-foreground/70 hover:text-foreground">Home</a>
          <a href="/registries" className="text-foreground/70 hover:text-foreground">Registries</a>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
