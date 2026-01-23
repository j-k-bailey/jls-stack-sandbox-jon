export default function AppLogo() {
  return (
    <div className="flex items-center gap-tight">
      <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground text-button font-bold">
        J
      </span>
      <div className="flex flex-col">
        <span className="font-semibold text-foreground">JLS Stack Sandbox</span>
        <span className="text-caption text-muted-foreground">
          Week 2 – UI/UX & Layout
        </span>
      </div>
    </div>
  );
}
