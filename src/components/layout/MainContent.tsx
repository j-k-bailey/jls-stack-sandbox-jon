import { type ReactNode } from "react";

interface MainContentProps {
  children: ReactNode;
}

export function MainContent({ children }: MainContentProps) {
  return (
    <main className="flex-1">
      <div className="mx-auto md:ml-56 max-w-6xl px-compact py-standard lg:px-standard">
        {children}
      </div>
    </main>
  );
}
