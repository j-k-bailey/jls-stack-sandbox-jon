import { Button } from "@/components/ui/BrandButton";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { FaX } from "react-icons/fa6";
import {
  NavigationGroup,
  type NavConfig,
} from "@/components/ui/NavigationItem";

interface SidebarProps {
  navigationConfig: NavConfig[];
  isOpen?: boolean;
  onClose?: () => void;
  variant?: "desktop" | "mobile";
}

export function Sidebar({
  navigationConfig,
  isOpen = false,
  onClose,
  variant = "desktop",
}: SidebarProps) {
  // Desktop sidebar
  if (variant === "desktop") {
    return (
      <aside className="hidden md:flex fixed left-0 top-16 bottom-0 w-56 border-r border-border bg-surface-1 h-full flex-col">
        <nav className="flex flex-1 flex-col px-compact overflow-y-auto">
          <NavigationGroup items={navigationConfig} />
        </nav>
      </aside>
    );
  }

  // Mobile sidebar
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex md:hidden">
      {/* Decorative backdrop */}
      <div className="flex-1 bg-overlay/40" aria-hidden="true" />

      {/* Panel */}
      <div
        id="mobile-navigation"
        role="dialog"
        aria-modal="true"
        aria-labelledby="mobile-nav-title"
        className="w-64 min-h-screen border-l border-border bg-surface-2 p-compact flex flex-col"
      >
        <div className="flex items-center justify-between">
          <span id="mobile-nav-title" className="overline-text">
            Navigation
          </span>

          <Button
            variant="default"
            size="lg"
            className="inline-flex transition-colors"
            semantic="primary"
            aria-label="Close navigation menu"
            onClick={onClose}
          >
            <FaX aria-hidden="true" />
          </Button>
        </div>

        <nav className="flex flex-1 flex-col overflow-y-auto">
          <NavigationGroup items={navigationConfig} onItemClick={onClose} />
        </nav>

        {/* Theme toggle at bottom */}
        <div className="border-t border-border pt-compact mt-compact">
          <div className="flex items-center justify-between">
            <span className="caption text-muted-foreground">Theme</span>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </div>
  );
}
