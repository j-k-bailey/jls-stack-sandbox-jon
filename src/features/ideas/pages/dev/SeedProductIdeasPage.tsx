import { useState } from "react";
import { seedProductIdeas } from "@/features/ideas/scripts/productIdeaSeed";
import { Button } from "@/components/ui/BrandButton";
import { Card, CardContent } from "@/components/ui/card";
import { PageHeader } from "@/components/common/PageHeader";
import { InlineAlert } from "@/components/common/InlineAlert";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";

export default function SeedProductIdeasPage() {
  const { user, userProfile } = useAuth();
  const [isSeeding, setIsSeeding] = useState(false);
  const [result, setResult] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const handleSeed = async () => {
    if (!user) {
      setResult({
        type: "error",
        message: "You must be signed in to seed data",
      });
      return;
    }

    setIsSeeding(true);
    setResult(null);

    try {
      // Build display name from userProfile
      const authorDisplayName = userProfile
        ? `${userProfile.firstName}${userProfile.lastNameInitial ? ` ${userProfile.lastNameInitial}.` : ""}`
        : user.email?.split("@")[0] || "Seed User";

      // Get photo URL from Google account
      const authorPhotoURL = user.photoURL ?? null;

      const { ideasCreated, notesCreated } = await seedProductIdeas(
        user.uid,
        authorDisplayName,
        authorPhotoURL,
      );

      setResult({
        type: "success",
        message: `Successfully seeded ${ideasCreated} product ideas and ${notesCreated} notes!`,
      });
    } catch (error) {
      console.error("Error seeding data:", error);
      setResult({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "Failed to seed data. Check console for details.",
      });
    } finally {
      setIsSeeding(false);
    }
  };

  const canSeed = user && !isSeeding;
  const userName = userProfile?.firstName || user?.email || "User";

  return (
    <div className="p-inset-2xl space-y-section container max-w-2xl">
      <PageHeader
        pageTitle="Seed Product Ideas"
        pageDescription="Populate your database with sample product ideas and notes for testing"
      />

      <Card>
        <CardContent className="space-y-stack">
          {!user ? (
            <InlineAlert variant="neutral">
              Sign in to seed product ideas and notes
            </InlineAlert>
          ) : (
            <InlineAlert variant="neutral">
              Signed in as <strong>{userName}</strong>. Click below to create
              sample ideas owned by your account.
            </InlineAlert>
          )}

          {result && (
            <InlineAlert
              variant={result.type === "success" ? "success" : "warning"}
              dismissible
              onDismiss={() => setResult(null)}
            >
              <div className="flex items-start gap-2">
                {result.type === "success" ? (
                  <CheckCircle2 className="h-4 w-4 mt-0.5 shrink-0" />
                ) : (
                  <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
                )}
                <span>{result.message}</span>
              </div>
            </InlineAlert>
          )}

          <div className="space-y-stack border-t pt-stack">
            <div className="text-sm text-muted-foreground space-y-2">
              <p className="font-medium text-foreground">This will create:</p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>
                  5 product ideas (Dock, Foundry, Ghostwrite, Lorebook, Vector)
                </li>
                <li>~4 notes per idea (~20 notes total)</li>
                <li>All items owned by your user account</li>
              </ul>
              <p className="text-xs mt-4">
                Note: Running this multiple times will create duplicate entries.
              </p>
            </div>

            <Button
              variant="filled"
              semantic="primary"
              onClick={handleSeed}
              disabled={!canSeed}
              className="w-full sm:w-auto"
            >
              {isSeeding ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Seeding...
                </>
              ) : (
                "Seed Product Ideas & Notes"
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
