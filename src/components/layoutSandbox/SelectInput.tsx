import { useId } from "react";

interface SelectInputProps {
  label: string;
  options: string[];
  id?: string;
}

export function SelectInput({ label, options, id }: SelectInputProps) {
  const autoId = useId();
  const selectId = id ?? autoId;

  return (
    <div>
      <label
        htmlFor={selectId}
        className="overline-text text-muted-foreground mb-tight block"
      >
        {label}
      </label>

      <select
        id={selectId}
        className="w-full bg-background border border-input rounded-lg p-tight body-2 text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] outline-none transition-[color,box-shadow] [&>option]:bg-background [&>option]:text-foreground"
      >
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
