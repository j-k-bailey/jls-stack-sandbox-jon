import { PageHeader } from "@/components/common/PageHeader";
import { SectionCard } from "@/components/common/SectionCard";

export function HelpPage() {
  return (
    <div className="space-y-section container p-inset-2xl">
      <PageHeader
        pageTitle="Help & Documentation"
        pageDescription="Learn how to use the Product Ideas Tracker to capture, organize, and develop your ideas."
      />

      <div className="grid gap-6 md:grid-cols-1">
        <SectionCard
          title="Getting Started"
          description="Create and manage your first product idea"
        >
          <p className="text-sm">
            Start by creating a new idea from the Ideas page. Give it a clear
            title, write a detailed summary, and assign a status (Idea,
            Research, Planning, In Progress, or Done). Use tags to categorize
            ideas and set priorities (Now, Next, Later) to organize your
            workflow. Ideas are automatically saved and can be edited at any
            time.
          </p>
        </SectionCard>

        <SectionCard
          title="Using Notes"
          description="Track progress and collaborate with your team"
        >
          <p className="text-sm">
            Add notes to any idea to document research findings, meeting
            outcomes, decisions, or progress updates. Notes appear in
            chronological order and can be edited or removed as needed. Use
            notes to maintain a timeline of your idea's evolution and keep
            stakeholders informed.
          </p>
        </SectionCard>

        <SectionCard
          title="Organizing Ideas"
          description="Filter, search, and archive effectively"
        >
          <p className="text-sm">
            Use the filtering system to find ideas by status, priority, tags, or
            search by name. Filter between "All Ideas" and "My Ideas" to focus
            on your work. Archive completed or abandoned ideas to keep your
            active list focused—archived ideas remain searchable and can be
            restored anytime.
          </p>
        </SectionCard>

        <SectionCard
          title="Best Practices"
          description="Tips for effective idea management"
        >
          <p className="text-sm">
            Write clear, specific titles and detailed summaries. Update status
            regularly to reflect current progress. Use consistent tags across
            similar ideas for better filtering. Add notes frequently to capture
            insights while they're fresh. Review and archive old ideas
            periodically to maintain a clean workspace.
          </p>
        </SectionCard>
      </div>
    </div>
  );
}
