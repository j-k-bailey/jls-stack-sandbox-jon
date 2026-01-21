import { Outlet, NavLink } from "react-router-dom";

export function PlaygroundLayout() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold tracking-tight">Playground</h1>
      <p className="text-sm text-slate-300">
        The only way to learn is by playing. The only way to win is by learning.
        And the only way to begin is by beginning.
      </p>

      {/* Tab navigation */}
      <nav className="flex space-x-4 border-b border-slate-700">
        <NavLink
          to="/playground"
          end
          className={({ isActive }) =>
            `px-4 py-2 text-sm font-medium ${
              isActive
                ? "border-b-2 border-sky-500 text-sky-400"
                : "text-slate-400 hover:text-slate-200"
            }`
          }
        >
          Overview
        </NavLink>
        <NavLink
          to="/playground/aesthetic"
          className={({ isActive }) =>
            `px-4 py-2 text-sm font-medium ${
              isActive
                ? "border-b-2 border-sky-500 text-sky-400"
                : "text-slate-400 hover:text-slate-200"
            }`
          }
        >
          Aesthetic Fun
        </NavLink>
        <NavLink
          to="/playground/forms"
          className={({ isActive }) =>
            `px-4 py-2 text-sm font-medium ${
              isActive
                ? "border-b-2 border-sky-500 text-sky-400"
                : "text-slate-400 hover:text-slate-200"
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
