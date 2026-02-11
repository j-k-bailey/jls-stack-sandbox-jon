import { ArchiveX } from "lucide-react";

interface ArchivedIdeaBannerProps {
  /** Context-specific message. Defaults to generic archived description. */
  message?: string;
}

/**
 * Full-width neutral strip shown on all archived idea pages.
 * Makes the archived context unmissable without being alarming.
 */
export function ArchivedIdeaBanner({ message }: ArchivedIdeaBannerProps) {
  return (
    <div
      role="status"
      aria-label="Archived content"
      className="flex items-center gap-3 rounded-lg border border-border-neutral bg-neutral-background text-neutral-on-background px-4 py-3 text-sm"
    >
      <ArchiveX
        className="h-4 w-4 shrink-0 text-neutral-on-background"
        aria-hidden
      />
      <p>
        {message ??
          "These ideas have been archived and are no longer active. They can be restored at any time."}
      </p>
    </div>
  );
}
