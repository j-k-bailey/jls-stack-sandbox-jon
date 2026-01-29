export default function AppLogo() {
  return (
    <div className="flex items-center gap-inline ">
      {/* Decorative mark so aria-hidden */}
      <span
        aria-hidden="true"
        className="inline-flex h-8 w-8 items-center justify-center rounded-container
        bg-primary text-primary-foreground button-text font-bold"
      >
        J
      </span>

      {/* Brand text */}
      <div className="flex flex-col leading-none">
        <span className="font-semibold text-foreground">JLS Stack Sandbox</span>
        <span className="caption text-muted-foreground">
          Week 2 – UI/UX & Layout
        </span>
      </div>
    </div>
  );
}
