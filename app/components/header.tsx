import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

interface HeaderProps {
  showNavLinks?: boolean;
  showAuthButtons?: boolean;
  showBackButton?: boolean;
  backButtonHref?: string;
  backButtonText?: string;
}

export function Header({
  showNavLinks = false,
  showAuthButtons = false,
  showBackButton = false,
  backButtonHref = '/registry',
  backButtonText = 'Back'
}: HeaderProps) {
  return (
    <header className="border-b border-border sticky top-0 z-10 bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <a href="/" className="flex items-center gap-2">
            <Avatar className="size-10">
              <AvatarImage src="/chadcn.png" alt="chadcn logo" />
              <AvatarFallback className="bg-primary text-primary-foreground font-bold text-xl">C</AvatarFallback>
            </Avatar>
            <span className="font-semibold text-xl">chadcn</span>
          </a>
        </div>
        
        {showNavLinks && (
          <nav className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-foreground/80 hover:text-foreground transition-colors">Features</a>
            <a href="#components" className="text-foreground/80 hover:text-foreground transition-colors">Components</a>
            <a href="#testimonials" className="text-foreground/80 hover:text-foreground transition-colors">Testimonials</a>
            <a href="#pricing" className="text-foreground/80 hover:text-foreground transition-colors">Pricing</a>
          </nav>
        )}
        
        <div className="flex items-center gap-4">
          {showBackButton && (
            <Button variant="outline" asChild>
              <a href={backButtonHref}>{backButtonText}</a>
            </Button>
          )}
          
          {showAuthButtons && (
            <>
              <Button variant="outline" className="hidden md:inline-flex" asChild>
                <a href="/auth">Log in</a>
              </Button>
              <Button asChild>
                <a href="/auth">Get Started</a>
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild className="md:hidden">
                  <Button variant="outline" size="icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5">
                      <line x1="4" x2="20" y1="12" y2="12"/>
                      <line x1="4" x2="20" y1="6" y2="6"/>
                      <line x1="4" x2="20" y1="18" y2="18"/>
                    </svg>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  {showNavLinks && (
                    <>
                      <DropdownMenuItem asChild>
                        <a href="#features">Features</a>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <a href="#components">Components</a>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <a href="#testimonials">Testimonials</a>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <a href="#pricing">Pricing</a>
                      </DropdownMenuItem>
                    </>
                  )}
                  <DropdownMenuItem asChild>
                    <a href="/auth">Log in</a>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
