import { Outlet } from "react-router-dom";
import { PageHeader } from "@/components/common/PageHeader";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";

const playgroundLinks = [
  {
    anchor: "Overview",
    to: "/playground",
  },
  {
    anchor: "Aesthetic Cards",
    to: "/playground/aesthetic",
  },
  {
    anchor: "Brand Kit",
    to: "/playground/brand-kit",
  },
  {
    anchor: "Forms",
    to: "/playground/forms",
  },
];

export function PlaygroundLayout() {
  return (
    <div className="space-y-section container">
      <PageHeader
        pageTitle="Playground"
        pageDescription="The only way to learn is by playing. The only way to win is by learning.
        And the only way to begin is by beginning."
      />

      <div className="space-y-standard">
        <div className="flex gap-tight pb-compact border-b border-border">
          {playgroundLinks.map((playgroundLink, index) => (
            <NavLink
              key={index}
              to={playgroundLink.to}
              end
              className={({ isActive }) =>
                cn(
                  "button-text px-compact py-tight rounded-lg rounded-tr-lg text-body-2 transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-link hover:bg-accent/20",
                )
              }
            >
              {playgroundLink.anchor}
            </NavLink>
          ))}
        </div>

        <Outlet />
      </div>
    </div>
  );
}
