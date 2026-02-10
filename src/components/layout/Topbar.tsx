// @/components/layout/Topbar.tsx
import { Button } from "@/components/ui/BrandButton";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { FaBars } from "react-icons/fa6";
import AppLogo from "@/components/common/AppLogo";
import { UserProfileButton } from "@/components/common/UserProfileButton";
import { LiveIndicator } from "@/components/ui/LiveIndicator";
import { LiveListenerDebug } from "@/components/dev/LiveListenerDebug";

interface TopbarProps {
  onMenuClick: () => void;
  isMenuOpen?: boolean;
}

export function Topbar({ onMenuClick, isMenuOpen = false }: TopbarProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 h-16 border-b border-border bg-surface-1">
      <div className="flex items-center justify-between h-full p-inset lg:px-standard">
        {/* Left: Logo */}
        <AppLogo />

        {/* Right: Desktop shortcuts */}
        <div className="hidden items-center gap-inline md:flex">
          <span className="caption text-muted-foreground border-r border-border pr-inline mr-inline">
            Environment: <span className="font-medium text-primary">Dev</span>
          </span>

          <LiveIndicator className="ml-auto mr-4" />

          <LiveListenerDebug />

          <ThemeToggle />

          <Button semantic="primary" size="sm" aria-label="Give feedback">
            Feedback
          </Button>

          <UserProfileButton />
        </div>

        {/* Mobile menu button */}
        <Button
          size="sm"
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
