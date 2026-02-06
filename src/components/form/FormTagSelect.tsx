import {
  Controller,
  type Control,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";
import { X, ChevronsUpDown, Check } from "lucide-react";
import {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
} from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";

interface FormTagSelectProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
  name: FieldPath<TFieldValues>;
  label: string;
  description?: string;
  error?: { message?: string };
  options: string[];
  maxTags?: number;
  placeholder?: string;
}

export function FormTagSelect<TFieldValues extends FieldValues>({
  control,
  name,
  label,
  description,
  error,
  options,
  maxTags = 10,
  placeholder = "Select tags",
}: FormTagSelectProps<TFieldValues>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <Field invalid={!!error}>
          <FieldLabel htmlFor={name}>{label}</FieldLabel>
          {description && <FieldDescription>{description}</FieldDescription>}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id={name}
                variant="input"
                className={cn(
                  "w-full justify-between min-h-10 h-auto py-2",
                  !field.value?.length && "text-muted-foreground",
                )}
              >
                <div className="flex flex-wrap gap-1.5 flex-1">
                  {field.value?.length ? (
                    field.value.map((tag: string) => (
                      <Badge
                        key={tag}
                        variant="accent-subtle"
                        className="cursor-pointer hover:bg-accent-hover"
                        onClick={(e) => {
                          e.stopPropagation();
                          field.onChange(
                            field.value?.filter((t: string) => t !== tag) || [],
                          );
                        }}
                      >
                        {tag}
                        <X className="ml-1 h-3 w-3" />
                      </Badge>
                    ))
                  ) : (
                    <span>{placeholder}</span>
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
                    {options.map((tag) => {
                      const isSelected = field.value?.includes(tag);
                      const isDisabled =
                        (field.value?.length || 0) >= maxTags && !isSelected;
                      return (
                        <CommandItem
                          key={tag}
                          value={tag}
                          disabled={isDisabled}
                          onSelect={() => {
                            if (isDisabled) return;
                            const current = field.value || [];
                            field.onChange(
                              isSelected
                                ? current.filter((t: string) => t !== tag)
                                : [...current, tag],
                            );
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              isSelected ? "opacity-100" : "opacity-0",
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
          <FieldError errors={error ? [error] : []} />
        </Field>
      )}
    />
  );
}
