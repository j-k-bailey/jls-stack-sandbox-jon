import * as React from "react";
import {
  DayPicker,
  getDefaultClassNames,
  type DayButton,
} from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDownIcon,
} from "lucide-react";

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = "dropdown",
  buttonVariant = "ghost",
  formatters,
  components,
  ...props
}: React.ComponentProps<typeof DayPicker> & {
  buttonVariant?: React.ComponentProps<typeof Button>["variant"];
}) {
  const defaultClassNames = getDefaultClassNames();

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn(
        "p-inset [--cell-radius:var(--radius-interactive)] [--cell-size:--spacing(7)] bg-background",
        String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`,
        String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`,
        className,
      )}
      captionLayout={captionLayout}
      formatters={{
        formatMonthDropdown: (date) =>
          date.toLocaleString("default", { month: "long" }),
        formatYearDropdown: (date) => date.getFullYear().toString(),
        ...formatters,
      }}
      classNames={{
        root: cn("w-fit", defaultClassNames.root),
        months: cn(
          "flex gap-stack flex-col md:flex-row relative",
          defaultClassNames.months,
        ),
        month: cn("flex flex-col w-full gap-stack", defaultClassNames.month),
        nav: cn(
          "flex items-center gap-inline w-full absolute top-0 inset-x-0 justify-between",
          defaultClassNames.nav,
        ),
        button_previous: cn(
          buttonVariants({ variant: buttonVariant }),
          "size-(--cell-size) aria-disabled:opacity-50 p-0 select-none",
          defaultClassNames.button_previous,
        ),
        button_next: cn(
          buttonVariants({ variant: buttonVariant }),
          "size-(--cell-size) aria-disabled:opacity-50 p-0 select-none",
          defaultClassNames.button_next,
        ),
        month_caption: cn(
          "flex items-center justify-center h-(--cell-size) w-full px-(--cell-size)",
          defaultClassNames.month_caption,
        ),
        dropdowns: cn(
          "w-full flex items-center text-sm font-medium justify-center h-(--cell-size) gap-inline",
          defaultClassNames.dropdowns,
        ),
        dropdown_root: cn(
          "relative rounded-interactive",
          defaultClassNames.dropdown_root,
        ),
        dropdown: cn(
          "absolute inset-0 opacity-0 cursor-pointer appearance-none",
          "bg-background text-foreground",
          "focus-visible:opacity-100 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          defaultClassNames.dropdown,
        ),
        caption_label: cn(
          "select-none font-medium pointer-events-none",
          captionLayout === "label"
            ? "text-sm"
            : "rounded-interactive flex items-center gap-inline text-sm px-inset py-inline border border-border bg-background hover:bg-surface-1 transition-colors [&>svg]:text-muted-foreground [&>svg]:size-4",
          defaultClassNames.caption_label,
        ),
        table: "w-full border-collapse mt-stack",
        weekdays: cn("flex", defaultClassNames.weekdays),
        weekday: cn(
          "text-muted-foreground rounded-interactive flex-1 font-medium text-xs select-none pb-inline",
          defaultClassNames.weekday,
        ),
        week: cn("flex w-full mt-inline", defaultClassNames.week),
        week_number_header: cn(
          "select-none w-(--cell-size)",
          defaultClassNames.week_number_header,
        ),
        week_number: cn(
          "text-xs select-none text-muted-foreground",
          defaultClassNames.week_number,
        ),
        day: cn(
          "relative w-full rounded-interactive h-full p-0 text-center group/day aspect-square select-none",
          defaultClassNames.day,
        ),
        range_start: cn(
          "rounded-l-interactive bg-primary-background",
          defaultClassNames.range_start,
        ),
        range_middle: cn(
          "rounded-none bg-primary-background",
          defaultClassNames.range_middle,
        ),
        range_end: cn(
          "rounded-r-interactive bg-primary-background",
          defaultClassNames.range_end,
        ),
        today: cn(
          "bg-neutral-background text-foreground font-semibold rounded-interactive",
          defaultClassNames.today,
        ),
        outside: cn(
          "text-muted-foreground opacity-50",
          defaultClassNames.outside,
        ),
        disabled: cn(
          "text-disabled-foreground opacity-50 cursor-not-allowed",
          defaultClassNames.disabled,
        ),
        hidden: cn("invisible", defaultClassNames.hidden),
        ...classNames,
      }}
      components={{
        Root: ({ className, rootRef, ...props }) => {
          return (
            <div
              data-slot="calendar"
              ref={rootRef}
              className={cn(className)}
              {...props}
            />
          );
        },
        Chevron: ({ className, orientation, ...props }) => {
          if (orientation === "left") {
            return (
              <ChevronLeftIcon className={cn("size-4", className)} {...props} />
            );
          }

          if (orientation === "right") {
            return (
              <ChevronRightIcon
                className={cn("size-4", className)}
                {...props}
              />
            );
          }

          return (
            <ChevronDownIcon className={cn("size-4", className)} {...props} />
          );
        },
        DayButton: CalendarDayButton,
        WeekNumber: ({ children, ...props }) => {
          return (
            <td {...props}>
              <div className="flex size-(--cell-size) items-center justify-center text-center">
                {children}
              </div>
            </td>
          );
        },
        ...components,
      }}
      {...props}
    />
  );
}

function CalendarDayButton({
  className,
  day,
  modifiers,
  ...props
}: React.ComponentProps<typeof DayButton>) {
  const defaultClassNames = getDefaultClassNames();

  const ref = React.useRef<HTMLButtonElement>(null);
  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus();
  }, [modifiers.focused]);

  return (
    <Button
      ref={ref}
      variant="ghost"
      size="icon"
      data-day={day.date.toLocaleDateString()}
      data-selected-single={
        modifiers.selected &&
        !modifiers.range_start &&
        !modifiers.range_end &&
        !modifiers.range_middle
      }
      data-range-start={modifiers.range_start}
      data-range-end={modifiers.range_end}
      data-range-middle={modifiers.range_middle}
      className={cn(
        "data-[selected-single=true]:bg-primary data-[selected-single=true]:text-primary-foreground",
        "data-[range-middle=true]:bg-primary-background data-[range-middle=true]:text-primary-on-background",
        "data-[range-start=true]:bg-primary data-[range-start=true]:text-primary-foreground",
        "data-[range-end=true]:bg-primary data-[range-end=true]:text-primary-foreground",
        "hover:bg-primary-background hover:text-primary-on-background",
        "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        "relative isolate z-10 flex aspect-square size-auto w-full min-w-(--cell-size) items-center justify-center",
        "border-0 leading-none font-normal text-sm",
        "rounded-interactive",
        "transition-colors",
        defaultClassNames.day,
        className,
      )}
      {...props}
    />
  );
}

export { Calendar, CalendarDayButton };
