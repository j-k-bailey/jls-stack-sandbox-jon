import { type ReactNode } from "react";

interface MainContentProps {
  children: ReactNode;
  background?: string;
}

export function MainContent({ children, background }: MainContentProps) {
  return (
    <main className="w-full md:ml-56">
      {/* Full-width background layer */}
      <div className={`min-h-[calc(100vh-4rem)] ${background || ""}`}>
        {/* Constrained content layer */}
        <div className="max-w-6xl mr-auto">{children}</div>
      </div>
    </main>
  );
}
