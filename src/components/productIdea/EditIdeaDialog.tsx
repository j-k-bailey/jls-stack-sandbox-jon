import { useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/BrandButton";
import { InlineAlert } from "@/components/common/InlineAlert";
import {
  FieldSet,
  FieldGroup,
  FieldLegend,
  FieldSeparator,
} from "@/components/ui/field";
import {
  FormInput,
  FormTextarea,
  FormSelect,
} from "@/components/form/FormField";
import { FormTagSelect } from "@/components/form/FormTagSelect";
import { ResponsiveGrid } from "@/components/layout/ResponsiveGrid";

import { useAuth } from "@/contexts/AuthContext";
import { updateProductIdea } from "@/lib/firestore/productIdeas";
import { canEditProductIdea } from "@/lib/permissions/productIdeas";

import {
  createProductIdeaSchema,
  type CreateProductIdeaInput,
  IDEA_STATUSES,
  IDEA_PRIORITIES,
  IDEA_TAGS,
} from "@/lib/zodSchemas/productIdea";
import type {
  ProductIdeaPriority,
  ProductIdeaStatus,
  ProductIdeaTag,
} from "@/lib/types/productIdeas";

interface EditIdeaDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  ideaId: string;
  idea: CreateProductIdeaInput & { ownerId: string };
  onSuccess?: () => void;
}

export function EditIdeaDialog({
  open,
  onOpenChange,
  ideaId,
  idea,
  onSuccess,
}: EditIdeaDialogProps) {
  const { user, userProfile } = useAuth();

  const role = userProfile?.role;

  const isOwner = user?.uid === idea.ownerId;
  const canEdit = canEditProductIdea(role, isOwner);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isSubmitting },
    setError,
  } = useForm<CreateProductIdeaInput>({
    resolver: zodResolver(createProductIdeaSchema),
    mode: "onBlur",
    defaultValues: idea,
  });

  useEffect(() => {
    if (open) reset(idea);
  }, [open, idea, reset]);

  const onSubmit: SubmitHandler<CreateProductIdeaInput> = async (data) => {
    if (!user || !canEdit) {
      setError("root", {
        type: "permission",
        message: "You do not have permission to edit this idea.",
      });
      return;
    }

    try {
      await updateProductIdea(ideaId, idea.ownerId, {
        title: data.title,
        summary: data.summary,
        status: data.status as ProductIdeaStatus,
        tags: data.tags as ProductIdeaTag[],
        priority: data.priority as ProductIdeaPriority,
      });

      onSuccess?.();
      onOpenChange(false);
    } catch (error) {
      setError("root", {
        type: "server",
        message:
          error instanceof Error
            ? error.message
            : "Failed to update idea. Please try again.",
      });
    }
  };

  if (!canEdit) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Permission Required</DialogTitle>
            <DialogDescription>
              You don't have permission to edit this product idea.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="filled"
              semantic="neutral"
              onClick={() => onOpenChange(false)}
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="headline-3">Edit Product Idea</DialogTitle>
          <DialogDescription className="body-2">
            Update the details of this product idea
          </DialogDescription>
        </DialogHeader>

        {errors.root?.message && (
          <InlineAlert variant="warning" dismissible>
            {errors.root.message}
          </InlineAlert>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-section">
          <FieldSet disabled={!canEdit}>
            <FieldGroup>
              <FieldLegend>Basic Information</FieldLegend>

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
            </FieldGroup>

            <FieldSeparator />

            <FieldGroup>
              <FieldLegend>Classification</FieldLegend>

              <ResponsiveGrid maxColumns="two" className="gap-section">
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

              <FormTagSelect
                control={control}
                name="tags"
                label="Tags"
                error={errors.tags}
                options={[...IDEA_TAGS]}
                maxTags={10}
              />
            </FieldGroup>
          </FieldSet>

          <DialogFooter className="gap-inline pt-section border-t border-border">
            <Button
              type="button"
              variant="filled"
              semantic="neutral"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="filled"
              semantic="primary"
              disabled={!isDirty || isSubmitting}
            >
              {isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
