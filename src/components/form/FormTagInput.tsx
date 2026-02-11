import { useEffect, useState } from "react";
import {
  useController,
  type Control,
  type FieldError,
  type FieldValues,
  type FieldPath,
  type FieldErrorsImpl,
  type Merge,
} from "react-hook-form";
import { X } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface FormTagInputProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
  name: FieldPath<TFieldValues>;
  label: string;
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<string[]>>;
  required?: boolean;
  maxTags?: number;
  maxLength?: number;
  placeholder?: string;
  helpText?: string;
}

export function FormTagInput<TFieldValues extends FieldValues>({
  control,
  name,
  label,
  error,
  required = false,
  maxTags = 10,
  maxLength = 30,
  placeholder = "Enter tags separated by commas",
  helpText,
}: FormTagInputProps<TFieldValues>) {
  const {
    field: { value, onChange, onBlur },
  } = useController({
    name,
    control,
  });

  const [inputValue, setInputValue] = useState("");

  // Type guard to ensure value is string array
  const currentTags: string[] = Array.isArray(value) ? value : [];

  // Parse tags from comma-separated input
  const parseTagsFromInput = (input: string): string[] => {
    return input
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0 && tag.length <= maxLength);
  };

  // Handle input change with real-time parsing
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setInputValue(input);

    // Parse tags in real-time
    const parsed = parseTagsFromInput(input);

    // Only update if we have valid tags and haven't exceeded max
    if (parsed.length > 0 && parsed.length <= maxTags) {
      onChange(parsed);
    } else if (parsed.length === 0) {
      onChange([]);
    }
  };

  // Handle blur - finalize tags
  const handleBlur = () => {
    const parsed = parseTagsFromInput(inputValue);

    // Enforce max tags on blur
    const finalTags = parsed.slice(0, maxTags);
    onChange(finalTags);

    // Update input to show cleaned value
    setInputValue(finalTags.join(", "));
    onBlur();
  };

  // Remove individual tag
  const removeTag = (tagToRemove: string) => {
    const newTags = currentTags.filter((tag) => tag !== tagToRemove);
    onChange(newTags);
    setInputValue(newTags.join(", "));
  };

  // Clear all tags
  const clearAll = () => {
    onChange([]);
    setInputValue("");
  };

  // Sync input value when form value changes externally (e.g., reset)
  // Only update if the tags actually changed, not if inputValue changed
  useEffect(() => {
    const tagsString = currentTags.join(", ");
    // Only update if form value changed (not from our own updates)
    if (tagsString !== inputValue && currentTags.length > 0) {
      setInputValue(tagsString);
    } else if (currentTags.length === 0 && inputValue !== "") {
      setInputValue("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTags.length, currentTags.join(",")]); // Depend on stringified tags to detect changes

  const isMaxTagsReached = currentTags.length >= maxTags;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label htmlFor={name}>
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </Label>
        {currentTags.length > 0 && (
          <button
            type="button"
            onClick={clearAll}
            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            Clear all
          </button>
        )}
      </div>

      <Input
        id={name}
        value={inputValue}
        onChange={handleInputChange}
        onBlur={handleBlur}
        placeholder={placeholder}
        aria-invalid={error ? "true" : "false"}
        aria-describedby={
          error ? `${name}-error` : helpText ? `${name}-help` : undefined
        }
        className={error ? "border-destructive" : ""}
      />

      {/* Tag Preview */}
      {currentTags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 p-2 bg-muted/30 rounded-md">
          {currentTags.map((tag: string) => (
            <Badge key={tag} variant="accent-subtle" className="group gap-1">
              <span>{tag}</span>
              <button
                type="button"
                onClick={() => removeTag(tag)}
                className="opacity-0 group-hover:opacity-100 focus-visible:opacity-100 transition-opacity"
                aria-label={`Remove ${tag} tag`}
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}

      {/* Help Text & Validation */}
      <div className="flex items-center justify-between text-xs">
        <div className="space-y-1">
          {error && (
            <p id={`${name}-error`} className="text-destructive">
              {typeof error.message === "string"
                ? error.message
                : "Invalid tags"}
            </p>
          )}
          {helpText && !error && (
            <p id={`${name}-help`} className="text-muted-foreground">
              {helpText}
            </p>
          )}
        </div>
        <p
          className={`text-muted-foreground ${isMaxTagsReached ? "text-warning" : ""}`}
        >
          {currentTags.length} / {maxTags}
        </p>
      </div>
    </div>
  );
}
