import { useForm, type SubmitHandler, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Check, ChevronsUpDown, X, CheckCircle2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { DatePicker } from "@/components/ui/DatePicker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { ResponsiveGrid } from "@/components/layout/ResponsiveGrid";
import { useState } from "react";
import { fakerApi } from "@/lib/fakerApi";
import { InlineAlert } from "@/components/ui/InlineAlert";
import {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { format } from "date-fns";

// Constants
const CATEGORIES = [
  "Development",
  "Design",
  "Finance",
  "HR",
  "Marketing",
  "Operations",
  "Sales",
  "Support",
] as const;

const TAGS = [
  "urgent",
  "bug-fix",
  "feature",
  "enhancement",
  "documentation",
  "testing",
  "review-needed",
  "blocked",
  "in-progress",
  "backlog",
] as const;

const taskNameSchema = z
  .string()
  .min(1, "Task name is required")
  .max(100, "Task name must be 100 characters or less");

const visibilitySchema = z.enum(["team", "personal"], {
  error: "Please select task visibility",
});

const descriptionSchema = z
  .string()
  .max(500, "Description must be 500 characters or less")
  .optional();

const prioritySchema = z.enum(["high", "medium", "low"], {
  error: "Please select task priority",
});

const deadlineDateSchema = z.date().optional();

const categorySchema = z.string().optional();

const tagsSchema = z
  .array(z.string())
  .max(5, "Maximum 5 tags allowed")
  .optional();

const createTaskSchema = z.object({
  taskName: taskNameSchema,
  visibility: visibilitySchema,
  description: descriptionSchema,
  priority: prioritySchema,
  deadlineDate: deadlineDateSchema,
  category: categorySchema,
  tags: tagsSchema,
});

type CreateTaskFormFields = z.infer<typeof createTaskSchema>;

export const CreateTaskPage = () => {
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isDirty, isSubmitting },
    setError,
  } = useForm<CreateTaskFormFields>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: {
      taskName: "",
      description: "",
      tags: [],
    },
  });

  const [submittedTask, setSubmittedTask] =
    useState<CreateTaskFormFields | null>(null);
  const [categoryOpen, setCategoryOpen] = useState(false);

  const onSubmit: SubmitHandler<CreateTaskFormFields> = async (data) => {
    try {
      await fakerApi({ data });
      setSubmittedTask(data);
      handleReset();
    } catch (error) {
      setError("root", {
        type: "server",
        message:
          error instanceof Error
            ? error.message
            : "Something went wrong. Please try again.",
      });
    }
  };

  const handleReset = () => {
    reset();
  };

  const handleCreateAnother = () => {
    setSubmittedTask(null);
  };

  const getPriorityBadgeVariant = (priority: string): "primary" | "accent" => {
    return priority === "high" ? "accent" : "primary";
  };

  return (
    <div className="space-y-section">
      {/* Success Message */}
      {submittedTask && (
        <FeatureCard
          layout="horizontal"
          emphasis="bold"
          icon={<CheckCircle2 className="text-success" />}
          heading="Task Created Successfully!"
          headingLevel="h3"
          description={
            <div className="space-y-compact">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Task Name</p>
                <p className="font-semibold text-foreground">
                  {submittedTask.taskName}
                </p>
              </div>

              {submittedTask.description && (
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    Description
                  </p>
                  <p className="text-foreground">{submittedTask.description}</p>
                </div>
              )}

              <div className="flex flex-wrap gap-compact">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    Visibility
                  </p>
                  <Badge variant="neutral-subtle">
                    {submittedTask.visibility}
                  </Badge>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-1">Priority</p>
                  <Badge
                    variant={
                      submittedTask.priority === "high"
                        ? "warning-subtle"
                        : submittedTask.priority === "medium"
                          ? "primary-subtle"
                          : "muted-subtle"
                    }
                  >
                    {submittedTask.priority}
                  </Badge>
                </div>

                {submittedTask.category && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">
                      Category
                    </p>
                    <Badge variant="neutral-subtle">
                      {submittedTask.category}
                    </Badge>
                  </div>
                )}

                {submittedTask.deadlineDate && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">
                      Deadline
                    </p>
                    <Badge variant="neutral-subtle">
                      {format(submittedTask.deadlineDate, "MMM dd, yyyy")}
                    </Badge>
                  </div>
                )}
              </div>

              {submittedTask.tags && submittedTask.tags.length > 0 && (
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Tags</p>
                  <div className="flex flex-wrap gap-1.5">
                    {submittedTask.tags.map((tag) => (
                      <Badge key={tag} variant="accent-subtle">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          }
          badges={[
            {
              text: "NEW",
              variant: getPriorityBadgeVariant(submittedTask.priority),
            },
          ]}
          cta={{
            label: "Create Another Task",
            onClick: handleCreateAnother,
            variant: "primary",
          }}
        />
      )}

      {/* Form Card */}
      <Card>
        <CardTitle level="h2">Create Task</CardTitle>

        <CardContent className="space-y-section">
          {errors.root?.message && (
            <InlineAlert variant="warning" dismissible>
              {errors.root.message}
            </InlineAlert>
          )}

          <form onSubmit={handleSubmit(onSubmit)}>
            <FieldSet>
              <FieldGroup>
                <FieldLegend>Core Information</FieldLegend>

                <Controller
                  control={control}
                  name="taskName"
                  render={({ field }) => (
                    <Field invalid={!!errors.taskName}>
                      <FieldLabel htmlFor="taskName" required>
                        Task Name
                      </FieldLabel>
                      <Input
                        id="taskName"
                        placeholder="e.g., Refactor hero component"
                        {...field}
                      />
                      <div className="flex items-center justify-between gap-2">
                        <FieldError errors={[errors.taskName]} />
                        <span className="caption text-muted-foreground shrink-0">
                          {field.value.length}/100
                        </span>
                      </div>
                    </Field>
                  )}
                />

                <ResponsiveGrid maxColumns="two" align="start">
                  <Controller
                    control={control}
                    name="visibility"
                    render={({ field }) => (
                      <Field invalid={!!errors.visibility}>
                        <FieldLabel htmlFor="visibility" required>
                          Visibility
                        </FieldLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value || ""}
                          name={field.name}
                        >
                          <SelectTrigger id="visibility">
                            <SelectValue placeholder="Select visibility" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="personal">
                              <strong>Personal:</strong> Only visible to you
                            </SelectItem>
                            <SelectItem value="team">
                              <strong>Team:</strong> Shared with your team
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FieldError errors={[errors.visibility]} />
                      </Field>
                    )}
                  />

                  <Controller
                    control={control}
                    name="priority"
                    render={({ field }) => (
                      <Field invalid={!!errors.priority}>
                        <FieldLabel htmlFor="priority" required>
                          Priority
                        </FieldLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value || ""}
                          name={field.name}
                        >
                          <SelectTrigger id="priority">
                            <SelectValue placeholder="Select priority" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="high">
                              <span className="flex items-center gap-2">
                                <span className="h-2 w-2 rounded-full bg-warning" />
                                High Priority
                              </span>
                            </SelectItem>
                            <SelectItem value="medium">
                              <span className="flex items-center gap-2">
                                <span className="h-2 w-2 rounded-full bg-primary" />
                                Medium Priority
                              </span>
                            </SelectItem>
                            <SelectItem value="low">
                              <span className="flex items-center gap-2">
                                <span className="h-2 w-2 rounded-full bg-muted-foreground" />
                                Low Priority
                              </span>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FieldError errors={[errors.priority]} />
                      </Field>
                    )}
                  />
                </ResponsiveGrid>
              </FieldGroup>

              <FieldSeparator />

              <FieldGroup>
                <FieldLegend>Additional Details</FieldLegend>

                <Controller
                  control={control}
                  name="description"
                  render={({ field }) => (
                    <Field invalid={!!errors.description}>
                      <FieldLabel htmlFor="description">Description</FieldLabel>
                      <Textarea
                        id="description"
                        placeholder="Add more context about this task..."
                        className="min-h-32 resize-none"
                        {...field}
                      />
                      <div className="flex items-center justify-between gap-2">
                        <FieldError errors={[errors.description]} />
                        <span className="caption text-muted-foreground shrink-0">
                          {field.value?.length || 0}/500
                        </span>
                      </div>
                    </Field>
                  )}
                />

                <ResponsiveGrid maxColumns="two" align="start">
                  <Controller
                    control={control}
                    name="deadlineDate"
                    render={({ field }) => (
                      <Field invalid={!!errors.deadlineDate}>
                        <FieldLabel htmlFor="deadlineDate">Deadline</FieldLabel>
                        <DatePicker
                          id="deadlineDate"
                          name={field.name}
                          value={field.value}
                          onChange={field.onChange}
                        />
                        <FieldError errors={[errors.deadlineDate]} />
                      </Field>
                    )}
                  />

                  <Controller
                    control={control}
                    name="category"
                    render={({ field }) => (
                      <Field invalid={!!errors.category}>
                        <FieldLabel htmlFor="category">Category</FieldLabel>
                        <Popover
                          open={categoryOpen}
                          onOpenChange={setCategoryOpen}
                        >
                          <PopoverTrigger asChild>
                            <Button
                              id="category"
                              variant="input"
                              className={cn(
                                "w-full justify-between",
                                !field.value && "text-muted-foreground",
                              )}
                            >
                              {field.value || "Select category"}
                              <ChevronsUpDown className="h-4 w-4 opacity-50" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-full p-0" align="start">
                            <Command>
                              <CommandInput placeholder="Search category..." />
                              <CommandList>
                                <CommandEmpty>No category found.</CommandEmpty>
                                <CommandGroup>
                                  {CATEGORIES.map((category) => (
                                    <CommandItem
                                      key={category}
                                      value={category}
                                      onSelect={() => {
                                        setValue("category", category, {
                                          shouldDirty: true,
                                        });
                                        setCategoryOpen(false);
                                      }}
                                    >
                                      <Check
                                        className={cn(
                                          "mr-2 h-4 w-4",
                                          category === field.value
                                            ? "opacity-100"
                                            : "opacity-0",
                                        )}
                                      />
                                      {category}
                                    </CommandItem>
                                  ))}
                                </CommandGroup>
                              </CommandList>
                            </Command>
                          </PopoverContent>
                        </Popover>
                        <FieldError errors={[errors.category]} />
                      </Field>
                    )}
                  />
                </ResponsiveGrid>

                <Controller
                  control={control}
                  name="tags"
                  render={({ field }) => (
                    <Field invalid={!!errors.tags}>
                      <FieldLabel htmlFor="tags">Tags</FieldLabel>
                      <FieldDescription>
                        Add up to 5 tags to help categorize tasks
                      </FieldDescription>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            id="tags"
                            variant="input"
                            className={cn(
                              "w-full justify-between min-h-10 h-auto py-2",
                              !field.value?.length && "text-muted-foreground",
                            )}
                          >
                            <div className="flex flex-wrap gap-1.5 flex-1">
                              {field.value?.length ? (
                                field.value.map((tag) => (
                                  <Badge
                                    key={tag}
                                    variant="accent-subtle"
                                    className="cursor-pointer hover:bg-accent-hover"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setValue(
                                        "tags",
                                        field.value?.filter((t) => t !== tag) ||
                                          [],
                                      );
                                    }}
                                  >
                                    {tag}
                                    <X className="ml-1 h-3 w-3" />
                                  </Badge>
                                ))
                              ) : (
                                <span>Select tags</span>
                              )}
                            </div>
                            <ChevronsUpDown className="h-4 w-4 opacity-50 ml-2 shrink-0" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0" align="start">
                          <Command>
                            <CommandInput placeholder="Search tags..." />
                            <CommandList>
                              <CommandEmpty>No tag found.</CommandEmpty>
                              <CommandGroup>
                                {TAGS.map((tag) => {
                                  const isSelected = field.value?.includes(tag);
                                  const isDisabled =
                                    (field.value?.length || 0) >= 5 &&
                                    !isSelected;
                                  return (
                                    <CommandItem
                                      key={tag}
                                      value={tag}
                                      disabled={isDisabled}
                                      onSelect={() => {
                                        if (isDisabled) return;
                                        const current = field.value || [];
                                        setValue(
                                          "tags",
                                          isSelected
                                            ? current.filter((t) => t !== tag)
                                            : [...current, tag],
                                        );
                                      }}
                                    >
                                      <Check
                                        className={cn(
                                          "mr-2 h-4 w-4",
                                          isSelected
                                            ? "opacity-100"
                                            : "opacity-0",
                                        )}
                                      />
                                      {tag}
                                    </CommandItem>
                                  );
                                })}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      <FieldError errors={[errors.tags]} />
                    </Field>
                  )}
                />
              </FieldGroup>
            </FieldSet>

            <div className="flex justify-between items-center pt-section border-t border-border mt-section">
              <Button
                type="button"
                variant="ghost"
                onClick={handleReset}
                disabled={!isDirty || isSubmitting}
              >
                Reset Form
              </Button>
              <div className="flex gap-compact">
                <Button type="button" variant="outline" disabled={isSubmitting}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Creating…" : "Create Task"}
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
