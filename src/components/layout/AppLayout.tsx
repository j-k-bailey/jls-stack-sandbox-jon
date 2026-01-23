import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/themeToggle";
import { FaBars, FaX } from "react-icons/fa6";

const navItems = [
  { label: "Dashboard", to: "/" },
  { label: "Layout Sandbox", to: "/layout-sandbox" },
  { label: "Components", to: "/components" },
  { label: "Playground", to: "/playground" },
  { label: "Quality Log", to: "/quality-check" },
  { label: "Help", to: "/help" },
  { label: "Settings", to: "/settings" },
];

export function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      {/* Topbar */}
      <header className="fixed top-0 left-0 right-0 z-40 h-16 border-b border-border bg-surface-1 backdrop-blur">
        <div className="flex h-full items-center justify-between p-compact lg:px-standard">
          {/* Topbar Left: Logo + product */}
          <div className="flex items-center gap-tight">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground text-button font-bold">
              J
            </span>
            <div className="flex flex-col">
              <span className="font-semibold text-foreground">
                JLS Stack Sandbox
              </span>
              <span className="text-caption text-muted-foreground">
                Week 2 – UI/UX & Layout
              </span>
            </div>
          </div>

          {/* Topbar Right: Desktop nav shortcuts + theme toggle + user placeholder */}
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
          <Button
            variant="default"
            size="lg"
            className="inline-flex md:hidden transition-colors"
            onClick={() => setSidebarOpen((prev) => !prev)}
          >
            <FaBars />
          </Button>
        </div>
      </header>

      {/* Shell body: sidebar + content */}
      <div className="flex flex-1 pt-16">
        {/* Sidebar – desktop */}
        <aside className="hidden md:block fixed left-0 top-16 bottom-0 w-56 pt-compact border-r border-border bg-surface-1 ">
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
          <div className="fixed inset-0 z-50 flex md:hidden">
            {/* Backdrop */}
            <div
              className="flex-1 bg-overlay/40"
              onClick={() => setSidebarOpen(false)}
            />

            {/* Panel */}
            <aside className="w-64 min-h-screen border-l border-border bg-surface-4 p-compact flex flex-col">
              <div className="mb-compact flex items-center justify-between">
                <span className="text-overline">Navigation</span>
                <Button
                  variant="default"
                  size="lg"
                  className="inline-flex md:hidden transition-colors"
                  onClick={() => setSidebarOpen(false)}
                >
                  <FaX />
                </Button>
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
                          : "text-foreground hover:bg-surface-5 hover:text-accent-foreground hover:bg-accent/50",
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
          <div className="mx-auto md:ml-56 max-w-6xl px-compact py-standard lg:px-standard">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
