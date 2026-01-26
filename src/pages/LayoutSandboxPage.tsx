import { LayoutSandbox } from "@/components/layout/LayoutSandbox";
import { PageHeader } from "@/components/common/PageHeader";

export function LayoutSandboxPage() {
  return (
    <div className="space-y-section container px-standard pb-section">
      <PageHeader
        pageTitle="Layout Sandbox"
        pageDescription="A playground for practicing Tailwind layout patterns."
      />

      {/* Reuse the sandbox component from Lesson 2.1a */}
      <div className="rounded-lg border border-border overflow-hidden">
        <LayoutSandbox />
      </div>
    </div>
  );
}
