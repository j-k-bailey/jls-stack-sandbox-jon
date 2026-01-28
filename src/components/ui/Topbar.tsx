import { Button } from "@/components/ui/BrandButton";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { FaBars } from "react-icons/fa6";
import AppLogo from "@/components/common/AppLogo";

interface TopbarProps {
  onMenuClick: () => void;
  isMenuOpen?: boolean;
}

export function Topbar({ onMenuClick, isMenuOpen = false }: TopbarProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 h-16 border-b border-border bg-surface-1 backdrop-blur">
      <div className="flex h-full items-center justify-between p-compact lg:px-standard">
        {/* Left: Logo */}
        <AppLogo />

        {/* Right: Desktop shortcuts */}
        <div className="hidden items-center gap-compact md:flex">
          <span className="caption text-muted-foreground border-r border-border pr-tight mr-tight">
            Environment: <span className="font-medium text-primary">Dev</span>
          </span>

          <ThemeToggle />

          <Button semantic="primary" aria-label="Give feedback">
            Feedback
          </Button>

          <button
            type="button"
            aria-label="User menu"
            className="relative flex h-8 w-8 items-center justify-center rounded-full bg-muted border border-border-muted caption font-bold text-muted-foreground"
          >
            Y
            <span
              aria-hidden="true"
              className="absolute -top-1 -right-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-accent text-accent-foreground text-xs font-bold px-1"
            >
              3
            </span>
          </button>
        </div>

        {/* Mobile menu button */}
        <Button
          variant="default"
          size="lg"
          className="inline-flex md:hidden transition-colors"
          semantic="primary"
          aria-label="Open navigation menu"
          aria-controls="mobile-navigation"
          aria-expanded={isMenuOpen}
          onClick={onMenuClick}
        >
          <FaBars aria-hidden="true" />
        </Button>
      </div>
    </header>
  );
}
