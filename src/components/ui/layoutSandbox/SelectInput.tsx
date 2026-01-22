interface SelectInputProps {
  label: string;
  options: string[];
}

export function SelectInput({ label, options }: SelectInputProps) {
  return (
    <div>
      <label className="text-overline text-muted-foreground mb-tight block">
        {label}
      </label>
      <select className="w-full bg-background border border-input rounded-lg px-compact py-compact text-body-2 text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] outline-none transition-[color,box-shadow] [&>option]:bg-background [&>option]:text-foreground">
        {options.map((option, index) => (
          <option key={index}>{option}</option>
        ))}
      </select>
    </div>
  );
}
