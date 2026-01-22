import { LayoutSandbox } from "@/components/layout/LayoutSandbox";
import { SimpleHeader } from "@/components/ui/simpleHeader";

export function LayoutSandboxPage() {
  return (
    <div className="section-spacing container px-standard pb-section">
      <SimpleHeader
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
