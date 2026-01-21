interface SelectInputProps {
  label: string;
  options: string[];
}

export function SelectInput({ label, options }: SelectInputProps) {
  const selectClasses =
    "w-full bg-stone-900/70 border border-stone-700/50 rounded px-3 py-2 text-sm text-stone-300 [&>option]:bg-stone-900 [&>option]:text-stone-300";

  return (
    <div>
      <label className="text-xs uppercase tracking-wide text-stone-500 mb-2 block">
        {label}
      </label>
      <select className={selectClasses}>
        {options.map((option, index) => (
          <option key={index}>{option}</option>
        ))}
      </select>
    </div>
  );
}
