import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { Button } from "@/components/ui/BrandButton";
import { IdeaNotesSection } from "@/features/ideas/pages/IdeaNotesSection";

export function IdeaNotesPage() {
  const { ideaId } = useParams<{ ideaId: string }>();
  const navigate = useNavigate();

  return (
    <div className="p-inset-2xl space-y-section container max-w-4xl">
      <PageHeader
        pageTitle="Notes"
        actions={
          <Button variant="ghost" onClick={() => navigate(`/ideas/${ideaId}`)}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Idea
          </Button>
        }
      />
      <IdeaNotesSection />
    </div>
  );
}
