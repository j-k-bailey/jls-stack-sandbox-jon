interface SelectInputProps {
  label: string;
  options: string[];
}

export function SelectInput({ label, options }: SelectInputProps) {
  return (
    <div>
      <label className="text-xs uppercase tracking-wide text-muted-foreground mb-2 block">
        {label}
      </label>
      <select className="w-full bg-background border border-input rounded-lg px-3 py-2 text-sm text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] outline-none transition-[color,box-shadow] [&>option]:bg-background [&>option]:text-foreground">
        {options.map((option, index) => (
          <option key={index}>{option}</option>
        ))}
      </select>
    </div>
  );
}
