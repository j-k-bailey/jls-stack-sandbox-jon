import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Topbar } from "@/components/layout/Topbar";
import { Sidebar } from "@/components/layout/Sidebar";
import { MainContent } from "@/components/layout/MainContent";
import { NAVIGATION_CONFIG } from "@/constants/navigation";

type LayoutContext = {
  setBackground: (bg: string) => void;
};

export function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [background, setBackground] = useState<string>("");

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Topbar
        onMenuClick={() => setSidebarOpen((prev) => !prev)}
        isMenuOpen={sidebarOpen}
      />

      <div className="pt-16 flex">
        <Sidebar variant="desktop" navigationConfig={NAVIGATION_CONFIG} />

        <Sidebar
          variant="mobile"
          navigationConfig={NAVIGATION_CONFIG}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        <MainContent background={background}>
          <Outlet context={{ setBackground } satisfies LayoutContext} />
        </MainContent>
      </div>
    </div>
  );
}
