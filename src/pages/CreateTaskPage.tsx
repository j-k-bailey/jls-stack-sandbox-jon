"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Check, ChevronsUpDown, X } from "lucide-react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
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

// Constants
const CATEGORIES = [
  "Development",
  "Design",
  "Marketing",
  "Sales",
  "Support",
  "HR",
  "Finance",
  "Operations",
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

// Schema with more comprehensive validation
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
  const form = useForm<CreateTaskFormFields>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: {
      taskName: "",
      visibility: undefined,
      description: "",
      priority: undefined,
      deadlineDate: undefined,
      category: "",
      tags: [],
    },
  });

  const onSubmit = (data: CreateTaskFormFields) => {
    console.log(data);
    // Handle submission
  };

  const handleReset = () => {
    form.reset();
  };

  const [categoryOpen, setCategoryOpen] = useState(false);

  return (
    <Card>
      <CardTitle level="h2">Create Task</CardTitle>

      <CardContent className="space-y-section">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-section"
          >
            {/* =============================
            ESSENTIAL INFORMATION
           ============================= */}
            <div className="space-y-standard">
              <div>
                <h3 className="headline-5 text-foreground">Core Information</h3>
              </div>

              <div className="space-y-standard">
                {/* Task Name */}
                <FormField
                  control={form.control}
                  name="taskName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Task Name <span className="text-warning">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., Complete Q1 performance review"
                          className="text-base"
                          {...field}
                        />
                      </FormControl>
                      <div className="flex justify-between items-start">
                        <FormMessage />
                        <span className="caption text-muted-foreground">
                          {field.value.length}/100
                        </span>
                      </div>
                    </FormItem>
                  )}
                />
                <ResponsiveGrid maxColumns="two" align="start">
                  {/* Visibility */}
                  <FormField
                    control={form.control}
                    name="visibility"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Visibility <span className="text-warning">*</span>
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value || ""}
                          name={field.name}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select visibility" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="personal">
                              <strong>Personal</strong> — Only visible to you
                            </SelectItem>
                            <SelectItem value="team">
                              <strong>Team</strong> — Shared with your team
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          Choose who can view this task
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Priority */}
                  <FormField
                    control={form.control}
                    name="priority"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Priority <span className="text-warning">*</span>
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value || ""}
                          name={field.name}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select priority" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="high">
                              <span className="flex items-center gap-2">
                                <span className="h-2 w-2 rounded-full bg-warning" />
                                High
                              </span>
                            </SelectItem>
                            <SelectItem value="medium">
                              <span className="flex items-center gap-2">
                                <span className="h-2 w-2 rounded-full bg-primary" />
                                Medium
                              </span>
                            </SelectItem>
                            <SelectItem value="low">
                              <span className="flex items-center gap-2">
                                <span className="h-2 w-2 rounded-full bg-muted-foreground" />
                                Low
                              </span>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </ResponsiveGrid>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-border" />

            {/* =============================
            ADDITIONAL DETAILS
           ============================= */}
            <div className="space-y-standard">
              <div>
                <h3 className="headline-5 text-foreground">
                  Additional Details
                </h3>
                <p className="caption text-muted-foreground mt-tight">
                  Optional fields to organize and prioritize your task
                </p>
              </div>

              <div className="space-y-standard">
                {/* Description */}
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Description{" "}
                        <span className="text-muted-foreground caption">
                          (optional)
                        </span>
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Add more context about this task..."
                          className="min-h-32 resize-none"
                          {...field}
                        />
                      </FormControl>
                      <div className="flex justify-between items-start">
                        <FormMessage />
                        <span className="caption text-muted-foreground">
                          {field.value?.length || 0}/500
                        </span>
                      </div>
                    </FormItem>
                  )}
                />

                {/* Organization Fields Grid */}
                <ResponsiveGrid
                  maxColumns="two"
                  align="start"
                  className="gap-section"
                >
                  {/* Deadline */}
                  <FormField
                    control={form.control}
                    name="deadlineDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Deadline{" "}
                          <span className="text-muted-foreground caption">
                            (optional)
                          </span>
                        </FormLabel>
                        <FormControl>
                          <DatePicker
                            value={field.value}
                            onChange={field.onChange}
                            placeholder="Select deadline"
                            name={field.name}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Category */}
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Category{" "}
                          <span className="text-muted-foreground caption">
                            (optional)
                          </span>
                        </FormLabel>
                        <Popover
                          open={categoryOpen}
                          onOpenChange={setCategoryOpen}
                        >
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="input"
                                className={cn(
                                  "w-full justify-between",
                                  !field.value && "text-muted-foreground",
                                )}
                              >
                                {field.value || "Select category"}
                                <ChevronsUpDown className="h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
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
                                        form.setValue("category", category, {
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
                        <FormDescription>
                          Organize by department
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </ResponsiveGrid>

                {/* Tags - Full Width */}
                <FormField
                  control={form.control}
                  name="tags"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Tags{" "}
                        <span className="text-muted-foreground caption">
                          (optional, max 5)
                        </span>
                      </FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="input"
                              className={cn(
                                "w-full justify-between min-h-10 h-auto",
                                !field.value?.length && "text-muted-foreground",
                              )}
                            >
                              <div className="flex flex-wrap gap-1 flex-1">
                                {field.value?.length ? (
                                  field.value.map((tag) => (
                                    <Badge
                                      key={tag}
                                      variant="accent-subtle"
                                      className="cursor-pointer hover:bg-secondary-foreground/10"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        form.setValue(
                                          "tags",
                                          field.value?.filter(
                                            (t) => t !== tag,
                                          ) || [],
                                        );
                                      }}
                                    >
                                      {tag}
                                      <X className="ml-1 h-3 w-3" />
                                    </Badge>
                                  ))
                                ) : (
                                  <span>
                                    Select tags to help categorize this task
                                  </span>
                                )}
                              </div>
                              <ChevronsUpDown className="h-4 w-4 opacity-50 ml-2" />
                            </Button>
                          </FormControl>
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
                                        form.setValue(
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
                      <FormDescription>
                        Add up to 5 tags ({field.value?.length || 0}/5 selected)
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* =============================
            ACTIONS
           ============================= */}
            <div className="flex justify-between items-center pt-section border-t border-border">
              <Button
                type="button"
                variant="ghost"
                onClick={handleReset}
                disabled={!form.formState.isDirty}
              >
                Reset Form
              </Button>
              <div className="flex gap-compact">
                <Button type="button" variant="outline">
                  Cancel
                </Button>
                <Button type="submit">Create Task</Button>
              </div>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
