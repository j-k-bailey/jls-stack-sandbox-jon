import { Routes, Route } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { PlaygroundLayout } from "@/components/layout/PlaygroundLayout";
import { DashboardPage } from "@/pages/DashboardPage";
import { LayoutSandboxPage } from "@/pages/LayoutSandboxPage";
import { HelpPage } from "@/pages/HelpPage";
import { ComponentsPage } from "@/pages/ComponentsPage";
import { PlaygroundPage } from "@/pages/Playground/PlaygroundPage";
import { AestheticPage } from "@/pages/Playground/AestheticPage";
import { FormPlaygroundPage } from "@/pages/Playground/FormPlaygroundPage";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { BrandKitPage } from "@/pages/Playground/BrandKitPage";
import { QualityCheckPage } from "@/pages/QualityCheck";
import { SettingsPage } from "@/pages/SettingsPage";
import { CreateTaskPage } from "@/pages/CreateTaskPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        {/* Index ("/") → Dashboard */}
        <Route index element={<DashboardPage />} />

        {/* "/layout-sandbox" → layout sandbox page */}
        <Route path="layout-sandbox" element={<LayoutSandboxPage />} />

        <Route path="components" element={<ComponentsPage />} />

        {/* Quality Check */}
        <Route path="create-task" element={<CreateTaskPage />} />

        {/* Playground with layout wrapper */}
        <Route path="playground" element={<PlaygroundLayout />}>
          <Route index element={<PlaygroundPage />} />
          <Route path="brand-kit" element={<BrandKitPage />} />
          <Route path="aesthetic" element={<AestheticPage />} />
          <Route path="forms" element={<FormPlaygroundPage />} />
        </Route>

        {/* Quality Check */}
        <Route path="quality-check" element={<QualityCheckPage />} />

        {/* Settings */}
        <Route path="settings" element={<SettingsPage />} />

        {/* "/help" -> Help page */}
        <Route path="help" element={<HelpPage />} />

        {/* Catch-all route */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
