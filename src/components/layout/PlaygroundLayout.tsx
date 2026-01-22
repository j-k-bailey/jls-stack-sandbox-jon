import { Outlet, NavLink } from "react-router-dom";
import { SimpleHeader } from "@/components/ui/simpleHeader";

export function PlaygroundLayout() {
  return (
    <div className="section-spacing">
      <SimpleHeader
        pageTitle="Playground"
        pageDescription="The only way to learn is by playing. The only way to win is by learning.
        And the only way to begin is by beginning."
      />

      {/* Tab navigation */}
      <nav className="flex space-x-compact border-b border-border">
        <NavLink
          to="/playground"
          end
          className={({ isActive }) =>
            `px-compact py-compact text-button ${
              isActive
                ? "border-b-2 border-primary text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`
          }
        >
          Overview
        </NavLink>
        <NavLink
          to="/playground/brand-kit"
          className={({ isActive }) =>
            `px-compact py-compact text-button ${
              isActive
                ? "border-b-2 border-primary text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`
          }
        >
          Brand Kit
        </NavLink>
        <NavLink
          to="/playground/aesthetic"
          className={({ isActive }) =>
            `px-compact py-compact text-button ${
              isActive
                ? "border-b-2 border-primary text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`
          }
        >
          Aesthetic Fun
        </NavLink>
        <NavLink
          to="/playground/forms"
          className={({ isActive }) =>
            `px-compact py-compact text-button ${
              isActive
                ? "border-b-2 border-primary text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`
          }
        >
          Forms
        </NavLink>
      </nav>

      {/* Child routes render here */}
      <Outlet />
    </div>
  );
}
