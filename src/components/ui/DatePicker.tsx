"use client";

import * as React from "react";
import { format, parse, isValid } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/BrandButton";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DatePickerProps {
  value?: Date;
  onChange?: (date: Date | undefined) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  name?: string;
  id?: string;
}

export function DatePicker({
  value,
  onChange,
  placeholder = "MM/DD/YYYY",
  disabled = false,
  className,
  name,
  id,
}: DatePickerProps) {
  const [inputValue, setInputValue] = React.useState("");
  const [isOpen, setIsOpen] = React.useState(false);

  /* ------------------------------------------------------------------ */
  /* Sync committed value → input                                        */
  /* ------------------------------------------------------------------ */
  React.useEffect(() => {
    if (value) {
      setInputValue(format(value, "MM/dd/yyyy"));
    } else {
      setInputValue("");
    }
  }, [value]);

  /* ------------------------------------------------------------------ */
  /* Draft typing (NO validation / commit here)                           */
  /* ------------------------------------------------------------------ */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  /* ------------------------------------------------------------------ */
  /* Commit draft → value (on blur / Enter)                               */
  /* ------------------------------------------------------------------ */
  const commitInputValue = () => {
    const draft = inputValue.trim();

    if (draft === "") {
      onChange?.(undefined);
      return;
    }

    const parsed = parse(draft, "MM/dd/yyyy", new Date());

    if (isValid(parsed) && format(parsed, "MM/dd/yyyy") === draft) {
      onChange?.(parsed);
    } else {
      // Revert to last committed value
      setInputValue(value ? format(value, "MM/dd/yyyy") : "");
    }
  };

  return (
    <div className="flex gap-2 items-center">
      <Input
        type="text"
        id={id}
        value={inputValue}
        onChange={handleInputChange}
        onBlur={commitInputValue}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            commitInputValue();
          }
        }}
        placeholder={placeholder}
        disabled={disabled}
        name={name}
        className={cn("flex-1", className)}
      />

      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            type="button"
            variant="outline"
            semantic="primary"
            disabled={disabled}
            className="px-compact"
            aria-label="Open calendar"
          >
            <CalendarIcon className="h-4 w-4" />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-auto p-0" align="end">
          <Calendar
            mode="single"
            selected={value}
            defaultMonth={value}
            onSelect={(date) => {
              onChange?.(date);
              setIsOpen(false);
            }}
            disabled={disabled}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
