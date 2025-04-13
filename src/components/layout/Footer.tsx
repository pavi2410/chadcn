import React from 'react';

export function Footer() {
  return (
    <footer className="border-t py-6 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Chadcn Registry. All rights reserved.
        </p>
        <div className="flex items-center gap-4">
          <a 
            href="https://github.com/shadcn-ui/ui" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            shadcn/ui
          </a>
          <a 
            href="https://ui.shadcn.com/docs/registry" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Registry Docs
          </a>
        </div>
      </div>
    </footer>
  );
}
