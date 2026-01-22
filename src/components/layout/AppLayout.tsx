import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/themeToggle";

const navItems = [
  { label: "Dashboard", to: "/" },
  { label: "Layout Sandbox", to: "/layout-sandbox" },
  { label: "Components", to: "/components" },
  { label: "Playground", to: "/playground" },
  { label: "Help", to: "/help" },
];

export function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      {/* Topbar */}
      <header className="border-b border-border bg-surface-1 backdrop-blur">
        <div className="flex h-14 items-center justify-between px-compact lg:px-standard">
          {/* Left: Logo + product */}
          <div className="flex items-center gap-tight">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground text-button font-bold">
              J
            </span>
            <div className="flex flex-col">
              <span className="text-body-2 font-semibold text-foreground">
                JLS Stack Sandbox
              </span>
              <span className="text-caption text-muted-foreground">
                Week 2 – UI/UX & Layout
              </span>
            </div>
          </div>

          {/* Right: Desktop nav shortcuts + theme toggle + user placeholder */}
          <div className="hidden items-center gap-compact md:flex">
            <ThemeToggle />

            <span className="text-caption text-muted-foreground">
              Environment:{" "}
              <span className="font-medium text-foreground">Dev</span>
            </span>

            <Button variant="outline" size="sm" className="text-button">
              Feedback
            </Button>

            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-caption font-semibold text-secondary-foreground">
              Y
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md border border-border bg-background px-tight py-tight text-button text-foreground md:hidden hover:bg-surface-5 transition-colors"
            onClick={() => setSidebarOpen((prev) => !prev)}
          >
            Menu
          </button>
        </div>
      </header>

      {/* Shell body: sidebar + content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar – desktop */}
        <aside className="hidden w-56 shrink-0 pt-compact border-r border-border bg-surface-1 md:block">
          <div className="flex h-full flex-col">
            <nav className="flex flex-1 flex-col gap-tight px-compact overflow-y-auto">
              <div className="mb-tight px-tight text-overline text-muted-foreground">
                Navigation
              </div>

              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === "/"}
                  className={({ isActive }) =>
                    [
                      "flex items-center gap-tight rounded-lg px-compact py-tight text-body-2 transition-colors",
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-surface-5 hover:text-foreground",
                    ].join(" ")
                  }
                >
                  <span>{item.label}</span>
                </NavLink>
              ))}
            </nav>
          </div>
        </aside>

        {/* Sidebar – mobile (overlay) */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-40 flex md:hidden">
            {/* Backdrop */}
            <div
              className="flex-1 bg-overlay"
              onClick={() => setSidebarOpen(false)}
            />

            {/* Panel */}
            <aside className="w-64 min-h-screen border-l border-border bg-surface-1 p-compact flex flex-col">
              <div className="mb-compact flex items-center justify-between">
                <span className="text-overline text-muted-foreground">
                  Navigation
                </span>
                <button
                  type="button"
                  className="text-caption text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => setSidebarOpen(false)}
                >
                  Close
                </button>
              </div>

              <nav className="flex flex-1 flex-col gap-tight">
                {navItems.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.to === "/"}
                    className={({ isActive }) =>
                      [
                        "flex items-center gap-tight rounded-lg px-compact py-tight text-body-2 transition-colors",
                        isActive
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:bg-surface-5 hover:text-foreground",
                      ].join(" ")
                    }
                    onClick={() => setSidebarOpen(false)}
                  >
                    <span>{item.label}</span>
                  </NavLink>
                ))}
              </nav>

              {/* Theme toggle at bottom of mobile sidebar */}
              <div className="border-t border-border pt-compact mt-compact">
                <div className="flex items-center justify-between">
                  <span className="text-caption text-muted-foreground">
                    Theme
                  </span>
                  <ThemeToggle />
                </div>
              </div>
            </aside>
          </div>
        )}

        {/* Main content */}
        <main className="flex-1">
          <div className="mx-auto max-w-6xl px-compact py-standard lg:px-standard">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
