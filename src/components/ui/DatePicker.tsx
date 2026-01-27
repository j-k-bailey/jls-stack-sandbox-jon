import * as React from "react";
import { format } from "date-fns";
import { CalendarIcon, RotateCcw } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
  placeholder = "Select date",
  disabled = false,
  className,
  id,
}: DatePickerProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const triggerRef = React.useRef<HTMLButtonElement>(null);

  const close = () => {
    setIsOpen(false);
    requestAnimationFrame(() => {
      triggerRef.current?.focus();
    });
  };

  const handleCalendarSelect = (date: Date | undefined) => {
    if (!date || (value && date.getTime() === value.getTime())) {
      close();
      return;
    }

    onChange?.(date);
    close();
  };

  const handleClear = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onChange?.(undefined);
    requestAnimationFrame(() => {
      triggerRef.current?.focus();
    });
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <div className="relative w-full">
        <PopoverTrigger asChild>
          <Button
            ref={triggerRef}
            id={id}
            type="button"
            variant="input"
            disabled={disabled}
            aria-haspopup="dialog"
            aria-expanded={isOpen}
            aria-controls={id ? `${id}-calendar` : undefined}
            className={cn(
              "w-full justify-start text-left font-normal",
              !value && "text-muted-foreground",
              value && "pr-10",
              className,
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4 shrink-0" />
            <span className="flex-1 button-text">
              {value ? format(value, "MM/dd/yyyy") : placeholder}
            </span>
          </Button>
        </PopoverTrigger>

        {value && !disabled && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-sm p-1 text-muted-foreground hover:text-foreground hover:bg-surface-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition-colors"
            aria-label="Clear date"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
        )}
      </div>

      <PopoverContent
        id={id ? `${id}-calendar` : undefined}
        role="dialog"
        aria-modal="false"
        className="w-auto p-0"
        align="start"
      >
        <Calendar
          mode="single"
          selected={value}
          defaultMonth={value}
          onSelect={handleCalendarSelect}
          disabled={disabled}
          captionLayout="dropdown"
          required={false}
        />
      </PopoverContent>
    </Popover>
  );
}
