import { useNavigate } from "react-router-dom";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { PageHeader } from "@/components/common/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
import { FormTagInput } from "@/components/form/FormTagInput";
import { ResponsiveGrid } from "@/components/layout/ResponsiveGrid";

import { useAuth } from "@/contexts/AuthContext";
import { createProductIdea } from "@/lib/firestore/productIdeas";
import { canCreateProductIdea } from "@/lib/permissions/productIdeas";

import {
  createProductIdeaSchema,
  type CreateProductIdeaInput,
  IDEA_STATUSES,
  IDEA_PRIORITIES,
} from "@/lib/zodSchemas/productIdea";

export function CreateIdeaPage() {
  const navigate = useNavigate();
  const { user, userProfile } = useAuth();

  const role = userProfile?.role;
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
      const docRef = await createProductIdea(data, user.uid);

      toast.success("Idea created!", {
        description: `"${data.title}" has been created successfully.`,
      });

      navigate(`/ideas/${docRef.id}`);
    } catch (error) {
      setError("root", {
        type: "server",
        message:
          error instanceof Error
            ? error.message
            : "Failed to create idea. Please try again.",
      });

      toast.error("Failed to create idea", {
        description:
          error instanceof Error ? error.message : "Please try again.",
      });
    }
  };

  const handleBackToList = () => navigate("/ideas");

  return (
    <div className="p-inset-2xl space-y-section container max-w-4xl">
      <PageHeader
        pageTitle="Create Product Idea"
        pageDescription="Capture a new product idea to explore and develop"
        actions={
          <Button variant="ghost" onClick={handleBackToList}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Ideas
          </Button>
        }
      />

      {/* Permission error — shown when user lacks create access */}
      {!canCreateIdea && (
        <InlineAlert variant="warning">
          You must be a contributor, moderator, or admin to create product
          ideas.
        </InlineAlert>
      )}

      {/* Server / validation root error */}
      {errors.root?.message && (
        <InlineAlert variant="warning" dismissible>
          {errors.root.message}
        </InlineAlert>
      )}

      <Card>
        <CardContent className="p-inset-xl">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-section">
            <FieldSet disabled={!canCreateIdea || isSubmitting}>
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
              </FieldGroup>
            </FieldSet>

            <div className="flex flex-col sm:flex-row gap-stack pt-section border-t">
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
                onClick={handleBackToList}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={!canCreateIdea || isSubmitting}
                className="sm:ml-auto"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Creating…
                  </>
                ) : (
                  "Create Idea"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
