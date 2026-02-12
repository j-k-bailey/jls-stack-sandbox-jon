import { Link } from "react-router-dom";
import { Plus, Search, Archive, MessageSquare, Filter } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { SectionCard } from "@/components/common/SectionCard";
import { Button } from "@/components/ui/BrandButton";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ResponsiveGrid } from "@/components/layout/ResponsiveGrid";

export function HelpPage() {
  return (
    <div className="space-y-section container p-inset-2xl max-w-4xl">
      <PageHeader
        pageTitle="Help & Documentation"
        pageDescription="Learn how to use the Product Ideas Tracker to capture, organize, and develop your ideas."
      />

      {/* Quick Actions */}
      <div className="bg-surface-1 p-inset-lg rounded-container border border-border">
        <h3 className="headline-5 mb-stack">Quick Actions</h3>
        <ResponsiveGrid maxColumns="three">
          <Button asChild variant="outline" className="justify-start">
            <Link to="/ideas/new">
              <Plus className="h-4 w-4 mr-1" />
              Create New Idea
            </Link>
          </Button>
          <Button asChild variant="outline" className="justify-start">
            <Link to="/ideas">
              <Search className="h-4 w-4 mr-1" />
              Browse Ideas
            </Link>
          </Button>
          <Button asChild variant="outline" className="justify-start">
            <Link to="/ideas?archived=true">
              <Archive className="h-4 w-4 mr-1" />
              View Archived
            </Link>
          </Button>
        </ResponsiveGrid>
      </div>

      {/* Getting Started Guide */}
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

      {/* FAQ Section */}
      <div className="bg-surface-1 p-inset-lg rounded-container border border-border">
        <h3 className="headline-4 mb-stack">Frequently Asked Questions</h3>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-left">
              <div className="flex items-center gap-inline">
                <Plus className="h-4 w-4" />
                <span>How do I create a new idea?</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground">
              Click the "New Idea" button on the Ideas page. Fill in the title
              (required), summary (required), status, priority, and tags. All
              ideas are saved automatically. You can edit any idea later by
              clicking on it and selecting "Edit".
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger className="text-left">
              <div className="flex items-center gap-inline">
                <Filter className="h-4 w-4" />
                <span>How do filters work?</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground">
              Use the filter bar at the top of the Ideas page to narrow your
              view. Search by name (starts with matching), filter by status
              (Idea, Research, Planning, In Progress, Done), priority (Now,
              Next, Later), or tags. Toggle between "All Ideas" and "My Ideas"
              to see everything or just ideas you created. Active filter badges
              appear below the filters—click the X to remove them.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger className="text-left">
              <div className="flex items-center gap-inline">
                <MessageSquare className="h-4 w-4" />
                <span>What are notes for?</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground">
              Notes let you track progress, document decisions, share updates,
              or record research findings on any idea. Each note shows who wrote
              it and when. You can edit or remove your own notes. Notes are
              chronological and help maintain a history of the idea's
              development over time.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4">
            <AccordionTrigger className="text-left">
              <div className="flex items-center gap-inline">
                <Archive className="h-4 w-4" />
                <span>What happens when I archive an idea?</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground">
              Archived ideas become read-only and are removed from your main
              Ideas list. They remain searchable and can be restored at any
              time. Use archiving to clean up completed or abandoned ideas while
              preserving their history. Only idea owners can archive or restore
              ideas.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-5">
            <AccordionTrigger className="text-left">
              <div className="flex items-center gap-inline">
                <Search className="h-4 w-4" />
                <span>Can I search for archived ideas?</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground">
              Yes! Toggle the "Active/Archived" filter to "Archived" to view
              only archived ideas. All other filters (search, status, priority,
              tags) work the same way. Archived ideas show a banner indicating
              when they were archived and can be restored by clicking "Restore".
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-6">
            <AccordionTrigger className="text-left">
              <div className="flex items-center gap-inline">
                <Plus className="h-4 w-4" />
                <span>Who can create, edit, or delete ideas?</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground">
              Anyone can view ideas. Signed-in users can create new ideas. Idea
              owners and admins can edit ideas. Only the idea owner can archive
              or restore their ideas. Notes can be added by anyone, but only the
              note author can edit or remove their own notes.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
