import {
  Controller,
  type Control,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";
import {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface BaseFormFieldProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
  name: FieldPath<TFieldValues>;
  label: string;
  description?: string;
  required?: boolean;
  error?: { message?: string };
}

interface FormInputProps<
  TFieldValues extends FieldValues,
> extends BaseFormFieldProps<TFieldValues> {
  type?: "text" | "email" | "number";
  placeholder?: string;
  maxLength?: number;
  showCharCount?: boolean;
}

export function FormInput<TFieldValues extends FieldValues>({
  control,
  name,
  label,
  description,
  required,
  error,
  placeholder,
  maxLength,
  showCharCount,
}: FormInputProps<TFieldValues>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <Field invalid={!!error}>
          <div className="space-y-inline">
            <div className="flex items-baseline justify-between gap-stack">
              <div>
                <FieldLabel
                  htmlFor={name}
                  required={required}
                  className="inline"
                >
                  {label}
                </FieldLabel>
                {description && (
                  <FieldDescription className="inline ml-inline">
                    {description}
                  </FieldDescription>
                )}
              </div>
              {showCharCount && maxLength && (
                <span className="caption text-muted-foreground shrink-0 tabular-nums">
                  {field.value?.length || 0}/{maxLength}
                </span>
              )}
            </div>
            <Input
              id={name}
              placeholder={placeholder}
              maxLength={maxLength}
              {...field}
            />
          </div>
          <FieldError errors={error ? [error] : []} />
        </Field>
      )}
    />
  );
}

interface FormTextareaProps<
  TFieldValues extends FieldValues,
> extends BaseFormFieldProps<TFieldValues> {
  placeholder?: string;
  maxLength?: number;
  rows?: number;
}

export function FormTextarea<TFieldValues extends FieldValues>({
  control,
  name,
  label,
  description,
  required,
  error,
  placeholder,
  maxLength,
  rows = 4,
}: FormTextareaProps<TFieldValues>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <Field invalid={!!error}>
          <div className="space-y-inline">
            <div className="flex items-baseline justify-between gap-stack">
              <div>
                <FieldLabel
                  htmlFor={name}
                  required={required}
                  className="inline"
                >
                  {label}
                </FieldLabel>
                {description && (
                  <FieldDescription className="inline ml-inline">
                    {description}
                  </FieldDescription>
                )}
              </div>
              {maxLength && (
                <span className="caption text-muted-foreground shrink-0 tabular-nums">
                  {field.value?.length || 0}/{maxLength}
                </span>
              )}
            </div>
            <Textarea
              id={name}
              placeholder={placeholder}
              maxLength={maxLength}
              rows={rows}
              className="resize-none"
              {...field}
            />
          </div>
          <FieldError errors={error ? [error] : []} />
        </Field>
      )}
    />
  );
}

interface SelectOption {
  value: string;
  label: string;
  description?: string;
}

interface FormSelectProps<
  TFieldValues extends FieldValues,
> extends BaseFormFieldProps<TFieldValues> {
  placeholder?: string;
  options: SelectOption[];
}

export function FormSelect<TFieldValues extends FieldValues>({
  control,
  name,
  label,
  description,
  required,
  error,
  placeholder,
  options,
}: FormSelectProps<TFieldValues>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => {
        // Find the selected option to display only its label in the trigger
        const selectedOption = options.find((opt) => opt.value === field.value);

        return (
          <Field invalid={!!error}>
            <div className="space-y-inline">
              <div>
                <FieldLabel
                  htmlFor={name}
                  required={required}
                  className="inline"
                >
                  {label}
                </FieldLabel>
                {description && (
                  <FieldDescription className="inline ml-inline">
                    {description}
                  </FieldDescription>
                )}
              </div>
              <Select
                onValueChange={field.onChange}
                value={field.value || ""}
                name={field.name}
              >
                <SelectTrigger id={name} className="w-full">
                  <SelectValue placeholder={placeholder}>
                    {selectedOption?.label}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {options.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.description ? (
                        <>
                          <span className="subtitle-1 inline">
                            {option.label}
                          </span>{" "}
                          <span className="caption text-muted-foreground inline">
                            {option.description}
                          </span>
                        </>
                      ) : (
                        option.label
                      )}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <FieldError errors={error ? [error] : []} />
          </Field>
        );
      }}
    />
  );
}
