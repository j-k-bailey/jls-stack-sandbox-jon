import { useState, useEffect, useCallback, useRef } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  updateProductIdeaSchema,
  type UpdateProductIdeaInput,
} from "@/lib/zodSchemas/productIdea";
import type { ProductIdea } from "@/lib/types/productIdeas";

// ============================================================================
// TYPES
// ============================================================================

export interface UseIdeaEditOptions {
  idea: ProductIdea | null;
  onUpdate: (data: UpdateProductIdeaInput) => Promise<void>;
  updating: boolean;
}

export interface UseIdeaEditReturn {
  // Mode
  isEditMode: boolean;
  enterEditMode: () => void;
  exitEditMode: () => void;

  // Form (react-hook-form)
  control: ReturnType<typeof useForm<UpdateProductIdeaInput>>["control"];
  handleSubmit: ReturnType<
    typeof useForm<UpdateProductIdeaInput>
  >["handleSubmit"];
  errors: ReturnType<
    typeof useForm<UpdateProductIdeaInput>
  >["formState"]["errors"];
  isSubmitting: boolean;
  isDirty: boolean;
  setError: ReturnType<typeof useForm<UpdateProductIdeaInput>>["setError"];

  // Actions
  onSubmit: SubmitHandler<UpdateProductIdeaInput>;
  cancelEdit: () => void;
  confirmCancelEdit: () => void;

  // Dialog state
  cancelDialogOpen: boolean;
  setCancelDialogOpen: (open: boolean) => void;
}

// ============================================================================
// HOOK
// ============================================================================

export function useIdeaEdit(options: UseIdeaEditOptions): UseIdeaEditReturn {
  const { idea, onUpdate, updating } = options;

  const [isEditMode, setIsEditMode] = useState(false);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);

  // Track edit mode in ref for use in effects
  const isEditModeRef = useRef(isEditMode);
  useEffect(() => {
    isEditModeRef.current = isEditMode;
  }, [isEditMode]);

  // ─── Form setup ────────────────────────────────────────────────────────────

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isDirty },
    setError,
  } = useForm<UpdateProductIdeaInput>({
    resolver: zodResolver(updateProductIdeaSchema),
    mode: "onBlur",
    defaultValues: {
      title: "",
      summary: "",
      status: "draft",
      tags: [],
      priority: undefined,
    },
  });

  // ─── Sync form when idea changes (unless user is mid-edit) ────────────────

  useEffect(() => {
    if (!idea) return;

    // Don't reset form while user is actively editing
    if (isEditModeRef.current) return;

    reset({
      title: idea.title,
      summary: idea.summary,
      status: idea.status,
      tags: idea.tags ?? [],
      priority: idea.priority,
    });
  }, [idea, reset]);

  // ─── Actions ───────────────────────────────────────────────────────────────

  const enterEditMode = useCallback(() => {
    setIsEditMode(true);
  }, []);

  const exitEditMode = useCallback(() => {
    setIsEditMode(false);
  }, []);

  const cancelEdit = useCallback(() => {
    if (isDirty) {
      setCancelDialogOpen(true);
    } else {
      setIsEditMode(false);
      if (idea) {
        reset({
          title: idea.title,
          summary: idea.summary,
          status: idea.status,
          tags: idea.tags ?? [],
          priority: idea.priority,
        });
      }
    }
  }, [isDirty, idea, reset]);

  const confirmCancelEdit = useCallback(() => {
    setIsEditMode(false);
    if (idea) {
      reset({
        title: idea.title,
        summary: idea.summary,
        status: idea.status,
        tags: idea.tags ?? [],
        priority: idea.priority,
      });
    }
    setCancelDialogOpen(false);
  }, [idea, reset]);

  const onSubmit: SubmitHandler<UpdateProductIdeaInput> = useCallback(
    async (data) => {
      try {
        await onUpdate(data);
        setIsEditMode(false);
      } catch (err) {
        // Error already handled by onUpdate (toast shown)
        // Set form error for display
        setError("root", {
          type: "server",
          message:
            err instanceof Error
              ? err.message
              : "Failed to update idea. Please try again.",
        });
      }
    },
    [onUpdate, setError],
  );

  // ─── Return ────────────────────────────────────────────────────────────────

  return {
    // Mode
    isEditMode,
    enterEditMode,
    exitEditMode,

    // Form
    control,
    handleSubmit,
    errors,
    isSubmitting: isSubmitting || updating,
    isDirty,
    setError,

    // Actions
    onSubmit,
    cancelEdit,
    confirmCancelEdit,

    // Dialog state
    cancelDialogOpen,
    setCancelDialogOpen,
  };
}
