import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IconSun, IconMoon, IconDeviceDesktop } from "@tabler/icons-react";
import { useStore } from "@nanostores/react";
import { themeStore, applyTheme, getEffectiveTheme, type Theme } from "@/lib/theme-store";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const theme = useStore(themeStore);
  const [mounted, setMounted] = useState(false);
  
  // Only show the toggle after mounting to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
    
    // Apply theme when component mounts
    applyTheme(theme);
    
    // Set up listener for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      if (theme === 'system') {
        applyTheme('system');
      }
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme]);
  
  // Handle theme change
  const setTheme = (newTheme: Theme) => {
    console.log(`Setting theme to ${newTheme}`);
    themeStore.set(newTheme);
    applyTheme(newTheme);
  };
  
  // Determine which icon to show based on current theme
  const getIcon = () => {
    if (!mounted) return null;
    
    if (theme === 'light') {
      return <IconSun className="h-[1.2rem] w-[1.2rem]" />;
    } else if (theme === 'dark') {
      return <IconMoon className="h-[1.2rem] w-[1.2rem]" />;
    } else {
      // For system, show the actual current theme icon
      return getEffectiveTheme(theme) === 'dark' 
        ? <IconMoon className="h-[1.2rem] w-[1.2rem]" />
        : <IconSun className="h-[1.2rem] w-[1.2rem]" />;
    }
  };

  if (!mounted) {
    // Return a placeholder during SSR to avoid hydration mismatch
    return <Button variant="outline" size="icon"><span className="sr-only">Toggle theme</span></Button>;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          {getIcon()}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          <IconSun className="h-4 w-4 mr-2" />
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          <IconMoon className="h-4 w-4 mr-2" />
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          <IconDeviceDesktop className="h-4 w-4 mr-2" />
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
