import { Moon, Sun, Monitor } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { motion, AnimatePresence } from 'framer-motion';

export const ThemeToggle = () => {
  const { theme, setTheme, resolvedTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            variant="ghost"
            size="icon"
            className="relative w-10 h-10 rounded-lg hover:bg-accent/20"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={resolvedTheme}
                initial={{ rotate: -180, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 180, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {resolvedTheme === 'dark' ? (
                  <Moon className="h-5 w-5 text-accent" />
                ) : (
                  <Sun className="h-5 w-5 text-accent" />
                )}
              </motion.div>
            </AnimatePresence>
            <span className="sr-only">Toggle theme</span>
          </Button>
        </motion.div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme('light')} className="gap-2 cursor-pointer">
          <Sun className="h-4 w-4" />
          <span>Light</span>
          {theme === 'light' && <span className="ml-auto text-accent">✓</span>}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('dark')} className="gap-2 cursor-pointer">
          <Moon className="h-4 w-4" />
          <span>Dark</span>
          {theme === 'dark' && <span className="ml-auto text-accent">✓</span>}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('system')} className="gap-2 cursor-pointer">
          <Monitor className="h-4 w-4" />
          <span>System</span>
          {theme === 'system' && <span className="ml-auto text-accent">✓</span>}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
