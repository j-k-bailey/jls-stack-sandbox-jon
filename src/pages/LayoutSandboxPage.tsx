import { LayoutSandbox } from "@/components/layout/LayoutSandbox";
import { PageHeader } from "@/components/common/PageHeader";

export function LayoutSandboxPage() {
  return (
    <div className="space-y-section container px-standard pb-section">
      <PageHeader
        pageTitle="Layout Sandbox"
        pageDescription="Practical demonstrations of responsive layout patterns using my JLS Stack component library."
        hr
      />

      <LayoutSandbox />
    </div>
  );
}
