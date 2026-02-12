import { useCallback } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createNoteSchema,
  type CreateNoteInput,
} from "@/lib/zodSchemas/productIdea";
import type { CreateProductIdeaNoteInput } from "@/lib/types/productIdeas";

// ============================================================================
// TYPES
// ============================================================================

export interface UseNoteFormOptions {
  onSubmit: (
    input: CreateProductIdeaNoteInput,
    userId: string,
  ) => Promise<void>;
  userId: string | undefined;
  userProfile: {
    firstName?: string;
    lastNameInitial?: string;
  } | null;
  userDisplayName: string | null | undefined;
  userEmail: string | null | undefined;
  userPhotoURL: string | null | undefined;
}

export interface UseNoteFormReturn {
  // Form (react-hook-form)
  control: ReturnType<typeof useForm<CreateNoteInput>>["control"];
  handleSubmit: ReturnType<typeof useForm<CreateNoteInput>>["handleSubmit"];
  errors: ReturnType<typeof useForm<CreateNoteInput>>["formState"]["errors"];
  isSubmitting: boolean;
  isDirty: boolean;
  reset: ReturnType<typeof useForm<CreateNoteInput>>["reset"];

  // Actions
  onFormSubmit: SubmitHandler<CreateNoteInput>;
}

// ============================================================================
// HOOK
// ============================================================================

export function useNoteForm(options: UseNoteFormOptions): UseNoteFormReturn {
  const {
    onSubmit,
    userId,
    userProfile,
    userDisplayName,
    userEmail,
    userPhotoURL,
  } = options;

  // ─── Form setup ────────────────────────────────────────────────────────────

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isDirty },
    setError,
  } = useForm<CreateNoteInput>({
    resolver: zodResolver(createNoteSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: { body: "" },
  });

  // ─── Form submit handler ───────────────────────────────────────────────────

  const onFormSubmit: SubmitHandler<CreateNoteInput> = useCallback(
    async (data) => {
      if (!userId) {
        setError("root", {
          type: "auth",
          message: "You must be signed in to add a note.",
        });
        return;
      }

      try {
        // Build author display name from profile or user data
        const authorDisplayName = userProfile
          ? `${userProfile.firstName}${userProfile.lastNameInitial ? ` ${userProfile.lastNameInitial}.` : ""}`
          : userDisplayName || userEmail?.split("@")[0] || "Anonymous";

        const noteInput: CreateProductIdeaNoteInput = {
          body: data.body,
          authorDisplayName,
          authorPhotoURL: userPhotoURL ?? null,
        };

        await onSubmit(noteInput, userId);
        reset();
      } catch (err) {
        setError("root", {
          type: "server",
          message:
            err instanceof Error
              ? err.message
              : "Failed to add note. Please try again.",
        });
      }
    },
    [
      userId,
      userProfile,
      userDisplayName,
      userEmail,
      userPhotoURL,
      onSubmit,
      reset,
      setError,
    ],
  );

  // ─── Return ────────────────────────────────────────────────────────────────

  return {
    // Form
    control,
    handleSubmit,
    errors,
    isSubmitting,
    isDirty,
    reset,

    // Actions
    onFormSubmit,
  };
}
