import { Loader2, Save, X } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/BrandButton";
import { InlineAlert } from "@/components/common/InlineAlert";
import { ResponsiveGrid } from "@/components/layout/ResponsiveGrid";
import {
  FormInput,
  FormTextarea,
  FormSelect,
} from "@/components/form/FormField";
import { FormTagInput } from "@/components/form/FormTagInput";
import { IDEA_STATUSES, IDEA_PRIORITIES } from "@/lib/zodSchemas/productIdea";
import type { ProductIdea } from "@/lib/types/productIdeas";
import type { UseIdeaEditReturn } from "@/features/ideas/hooks/useIdeaEdit";

// ============================================================================
// TYPES
// ============================================================================

export interface IdeaEditFormProps {
  control: UseIdeaEditReturn["control"];
  errors: UseIdeaEditReturn["errors"];
  idea: ProductIdea;
  isSubmitting: boolean;
  isDirty: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
}

// ============================================================================
// COMPONENT
// ============================================================================

export function IdeaEditForm({
  control,
  errors,
  idea,
  isSubmitting,
  isDirty,
  onSubmit,
  onCancel,
}: IdeaEditFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-section">
      {errors.root?.message && (
        <InlineAlert variant="warning" dismissible>
          {errors.root.message}
        </InlineAlert>
      )}

      <FormInput
        control={control}
        name="title"
        label="Title"
        required
        error={errors.title}
        maxLength={100}
        showCharCount
      />

      <FormTextarea
        control={control}
        name="summary"
        label="Summary"
        required
        error={errors.summary}
        maxLength={1000}
        rows={5}
      />

      <ResponsiveGrid maxColumns="two" className="gap-stack">
        <FormSelect
          control={control}
          name="status"
          label="Status"
          required
          error={errors.status}
          options={IDEA_STATUSES.map((s) => ({
            value: s.value,
            label: s.label,
            description: s.description,
          }))}
        />
        <FormSelect
          control={control}
          name="priority"
          label="Priority"
          error={errors.priority}
          options={IDEA_PRIORITIES.map((p) => ({
            value: p.value,
            label: p.label,
            description: p.description,
          }))}
        />
      </ResponsiveGrid>

      <FormTagInput
        control={control}
        name="tags"
        label="Tags"
        error={errors.tags}
        maxTags={10}
        maxLength={30}
        placeholder="design, feature, bug-fix"
        helpText="Separate tags with commas"
      />

      <div className="caption text-muted-foreground space-y-inline py-section">
        {idea.createdAt && (
          <div>
            Created {format(idea.createdAt.toDate(), "MMM d, yyyy 'at' h:mm a")}
          </div>
        )}
        {idea.updatedAt && (
          <div>
            Updated {format(idea.updatedAt.toDate(), "MMM d, yyyy 'at' h:mm a")}
          </div>
        )}
      </div>

      <div className="flex gap-stack pt-stack border-t">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          <X className="h-4 w-4 mr-2" />
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isSubmitting || !isDirty}
          className="ml-auto"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Saving…
            </>
          ) : (
            <>
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
