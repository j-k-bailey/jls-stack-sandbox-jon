import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Topbar } from "@/components/ui/Topbar";
import { Sidebar } from "@/components/ui/Sidebar";
import { MainContent } from "@/components/layout/MainContent";
import { NAVIGATION_CONFIG } from "@/constants/navigation";

export function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Topbar onMenuClick={() => setSidebarOpen((prev) => !prev)} />

      <div className="flex flex-1 pt-16">
        <Sidebar variant="desktop" navigationConfig={NAVIGATION_CONFIG} />

        <Sidebar
          variant="mobile"
          navigationConfig={NAVIGATION_CONFIG}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        <MainContent>
          <Outlet />
        </MainContent>
      </div>
    </div>
  );
}
