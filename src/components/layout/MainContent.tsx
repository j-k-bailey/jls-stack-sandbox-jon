import { type ReactNode } from "react";

interface MainContentProps {
  children: ReactNode;
}

export function MainContent({ children }: MainContentProps) {
  return (
    <main className="flex-1">
      <div className="mx-auto md:ml-56 max-w-6xl px-compact pt-standard pb-section sm:px-standard">
        {children}
      </div>
    </main>
  );
}
