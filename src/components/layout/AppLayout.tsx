import { Outlet } from "react-router-dom";
import { ThemeToggle } from "@/components/ui/themeToggle";
import { HeaderNavLink } from "@/components/ui/headerNavLink";

export function AppLayout() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Top bar */}
      <header className="border-b border-border bg-surface backdrop-blur">
        <div className="max-w-5xl mx-auto flex items-center justify-between px-6 py-3">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold">
              J
            </span>
            <div className="flex flex-col">
              <span className="text-page-title font-semibold text-foreground">
                JLS Stack Sandbox
              </span>
              <small>Week 2 – UI/UX & Layout</small>
            </div>
          </div>

          <nav className="flex items-center gap-2 text-sm">
            <HeaderNavLink to="/" end>
              Dashboard
            </HeaderNavLink>

            <HeaderNavLink to="/layout-sandbox">Layout Sandbox</HeaderNavLink>

            <HeaderNavLink to="/components">Components</HeaderNavLink>

            <HeaderNavLink to="/playground">Playground</HeaderNavLink>

            <HeaderNavLink to="/help">Help</HeaderNavLink>

            {/* 
            
            <Button
              variant="outline"
              size="sm"
              className="border-border text-xs text-muted-foreground hover:text-muted-foreground"
            >
              Future Route
            </Button> */}
          </nav>
          <ThemeToggle />
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-5xl mx-auto p-6">
        <Outlet />
      </main>
    </div>
  );
}
