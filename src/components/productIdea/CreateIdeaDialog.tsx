import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2 } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { InlineAlert } from "@/components/common/InlineAlert";
import { FeatureCard } from "@/components/common/FeatureCard";
import { Badge } from "@/components/ui/badge";
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
import { createProductIdea } from "@/lib/firestore/productIdeas";
import { canCreateProductIdea } from "@/lib/permissions/productIdeas";

import {
  createProductIdeaSchema,
  type CreateProductIdeaInput,
  IDEA_STATUSES,
  IDEA_PRIORITIES,
  IDEA_TAGS,
} from "@/lib/zodSchemas/productIdea";

interface CreateIdeaDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export function CreateIdeaDialog({
  open,
  onOpenChange,
  onSuccess,
}: CreateIdeaDialogProps) {
  const { user, userProfile } = useAuth();

  const [submittedIdea, setSubmittedIdea] =
    useState<CreateProductIdeaInput | null>(null);

  const role = userProfile?.role;

  /**
   * Canonical permission check (mirrors Firestore)
   */
  const canCreateIdea = canCreateProductIdea(role, user?.uid);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isSubmitting },
    setError,
  } = useForm<CreateProductIdeaInput>({
    resolver: zodResolver(createProductIdeaSchema),
    mode: "onBlur",
    defaultValues: {
      title: "",
      summary: "",
      status: "draft",
      tags: [],
      priority: undefined,
    },
  });

  const onSubmit: SubmitHandler<CreateProductIdeaInput> = async (data) => {
    if (!user || !canCreateIdea) {
      setError("root", {
        type: "permission",
        message: "You do not have permission to create product ideas.",
      });
      return;
    }

    try {
      await createProductIdea(
        {
          ...data,
          ownerId: user.uid,
        },
        user.uid,
      );

      setSubmittedIdea(data);
      reset();
      onSuccess?.();
    } catch (error) {
      setError("root", {
        type: "server",
        message:
          error instanceof Error
            ? error.message
            : "Failed to create idea. Please try again.",
      });
    }
  };

  const handleClose = () => {
    setSubmittedIdea(null);
    reset();
    onOpenChange(false);
  };

  const handleCreateAnother = () => {
    setSubmittedIdea(null);
    reset();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* ------------------------------------------------------------------ */}
        {/* SUCCESS STATE */}
        {/* ------------------------------------------------------------------ */}
        {submittedIdea ? (
          <>
            <DialogHeader>
              <DialogTitle>Idea Created Successfully!</DialogTitle>
            </DialogHeader>

            <FeatureCard
              layout="vertical"
              emphasis="bold"
              icon={<CheckCircle2 className="text-success" />}
              heading={submittedIdea.title}
              headingLevel="h3"
              description={
                <div className="space-y-compact">
                  <p className="text-foreground">{submittedIdea.summary}</p>

                  <div className="flex flex-wrap gap-2">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">
                        Status
                      </p>
                      <Badge variant="neutral-subtle">
                        {submittedIdea.status}
                      </Badge>
                    </div>

                    {submittedIdea.priority && (
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">
                          Priority
                        </p>
                        <Badge
                          variant={
                            submittedIdea.priority === "now"
                              ? "accent-subtle"
                              : submittedIdea.priority === "next"
                                ? "primary-subtle"
                                : "muted-subtle"
                          }
                        >
                          {submittedIdea.priority}
                        </Badge>
                      </div>
                    )}
                  </div>

                  {submittedIdea.tags && submittedIdea.tags?.length > 0 && (
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Tags</p>
                      <div className="flex flex-wrap gap-1.5">
                        {submittedIdea.tags.map((tag) => (
                          <Badge key={tag} variant="accent-subtle">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              }
              badges={[{ text: "NEW", variant: "primary" }]}
            />

            <DialogFooter>
              <Button variant="outline" onClick={handleClose}>
                Close
              </Button>
              <Button onClick={handleCreateAnother}>Create Another</Button>
            </DialogFooter>
          </>
        ) : (
          <>
            {/* ------------------------------------------------------------------ */}
            {/* CREATE FORM */}
            {/* ------------------------------------------------------------------ */}
            <DialogHeader>
              <DialogTitle>Create Product Idea</DialogTitle>
              <DialogDescription>
                Capture a new product idea to explore and develop
              </DialogDescription>
            </DialogHeader>

            {!canCreateIdea && (
              <InlineAlert variant="warning">
                You must be a contributor, moderator, or admin to create product
                ideas.
              </InlineAlert>
            )}

            {errors.root?.message && (
              <InlineAlert variant="warning" dismissible>
                {errors.root.message}
              </InlineAlert>
            )}

            <form onSubmit={handleSubmit(onSubmit)}>
              <FieldSet disabled={!canCreateIdea}>
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

              <DialogFooter className="pt-section border-t border-border mt-section">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => reset()}
                  disabled={!isDirty || isSubmitting}
                >
                  Reset
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleClose}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={!canCreateIdea || isSubmitting}>
                  {isSubmitting ? "Creating..." : "Create Idea"}
                </Button>
              </DialogFooter>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
