import { PageHeader } from "@/components/common/PageHeader";
import { SectionCard } from "@/components/common/SectionCard";

export function HelpPage() {
  return (
    <div className="section-spacing container px-standard pb-section">
      <PageHeader
        pageTitle="Help & Documentation"
        pageDescription="Find resources and guidance to help you succeed in the JLS Academy
          program."
      />

      <div className="grid gap-6 md:grid-cols-1">
        <SectionCard
          title="Week 1 Documentation"
          description="Getting started with the fundamentals"
        >
          <p className="text-sm">
            Access Week 1 materials covering the basics of React, TypeScript,
            and modern web development practices. These foundational docs will
            guide you through setting up your development environment and
            understanding core concepts.
          </p>
        </SectionCard>

        <SectionCard
          title="Week 2 UI/UX Documentation"
          description="Design principles and component libraries"
        >
          <p className="text-sm">
            Explore Week 2 resources focused on user interface design, user
            experience principles, Tailwind CSS, and component-based
            architecture. Learn how to build accessible and responsive
            interfaces using modern design patterns.
          </p>
        </SectionCard>

        <SectionCard
          title="Ask for Help from Mentors"
          description="Get support when you need it"
        >
          <p className="text-sm">
            Our mentors are here to support your learning journey. Reach out
            through the dedicated Slack channels, schedule office hours, or
            submit questions through the support portal. Don't hesitate to ask
            questions—we're here to help you succeed!
          </p>
        </SectionCard>
      </div>
    </div>
  );
}
