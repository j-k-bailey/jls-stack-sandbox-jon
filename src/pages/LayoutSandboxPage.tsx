import { LayoutSandbox } from "@/components/layout/LayoutSandbox";
import { SimpleHeader } from "@/components/ui/simpleHeader";

export function LayoutSandboxPage() {
  return (
    <div className="space-y-4">
      <SimpleHeader
        pageTitle="Layout Sandbox"
        pageDescription="A playground for practicing Tailwind layout patterns."
      />

      {/* Reuse the sandbox component from Lesson 2.1a */}
      <div className="rounded-xl border border-slate-800 overflow-hidden">
        <LayoutSandbox />
      </div>
    </div>
  );
}
