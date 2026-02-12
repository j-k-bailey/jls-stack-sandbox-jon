import { Loader2, Send } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/BrandButton";
import { InlineAlert } from "@/components/common/InlineAlert";
import { FormTextarea } from "@/components/form/FormField";
import type { UseNoteFormReturn } from "@/features/ideas/hooks/useNoteForm";

// ============================================================================
// TYPES
// ============================================================================

export interface AddNoteFormProps {
  control: UseNoteFormReturn["control"];
  errors: UseNoteFormReturn["errors"];
  isSubmitting: boolean;
  isDirty: boolean;
  onSubmit: (e: React.FormEvent) => void;
}

// ============================================================================
// COMPONENT
// ============================================================================

export function AddNoteForm({
  control,
  errors,
  isSubmitting,
  isDirty,
  onSubmit,
}: AddNoteFormProps) {
  return (
    <Card>
      <CardContent className="p-inset-xl">
        <form onSubmit={onSubmit} className="space-y-stack">
          {errors.root?.message && (
            <InlineAlert variant="warning" dismissible>
              {errors.root.message}
            </InlineAlert>
          )}

          <FormTextarea
            control={control}
            name="body"
            label="Add a note"
            placeholder="Add a note..."
            error={errors.body}
            maxLength={2000}
            rows={3}
          />

          <div className="flex justify-end">
            <Button
              type="submit"
              variant="filled"
              semantic="primary"
              size="sm"
              aria-label="Submit note"
              disabled={isSubmitting || !isDirty}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-3 w-3 animate-spin" />
                  Adding…
                </>
              ) : (
                <>
                  <Send className="h-3 w-3" />
                  Add Note
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
