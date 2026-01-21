import { Outlet, NavLink, useLocation } from "react-router-dom";

export function PlaygroundPage() {
  const location = useLocation();
  const isOverview = location.pathname === "/playground";

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold tracking-tight">Playground</h1>
      <p className="text-sm text-slate-300">
        The only way to learn is by playing. The only way to win is by learning.
        And the only way to begin is by beginning.
      </p>
      <h2 className="font-semibold">Focused Playgrounds</h2>
      {/* Tab navigation */}
      <nav className="flex space-x-4 border-b border-slate-700">
        <NavLink
          to="/playground"
          end
          className={({ isActive }) =>
            `px-4 py-2 text-sm font-medium ${
              isActive
                ? "border-b-2 border-blue-500 text-blue-400"
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
                ? "border-b-2 border-blue-500 text-blue-400"
                : "text-slate-400 hover:text-slate-200"
            }`
          }
        >
          Aesthetic Fun
        </NavLink>
        <NavLink
          to="/playground/form"
          className={({ isActive }) =>
            `px-4 py-2 text-sm font-medium ${
              isActive
                ? "border-b-2 border-blue-500 text-blue-400"
                : "text-slate-400 hover:text-slate-200"
            }`
          }
        >
          Forms
        </NavLink>
        {/* Add more tabs as needed */}
      </nav>
      {isOverview && (
        <div className="mt-8 p-6 border-2 border-dashed border-slate-700 rounded-lg bg-slate-900/50">
          <div className="flex items-start gap-2">
            <div className="text-6xl">🚧</div>
            <div>
              <h2 className="font-semibold text-slate-200 mb-2">
                Under Construction
              </h2>
              <p className="text-sm text-slate-400">
                This space is reserved for experiments and creative ideas. As
                inspiration strikes, new interactive demos and playground
                features will appear here to help explore and learn.
              </p>
            </div>
          </div>
        </div>
      )}
      <Outlet />
    </div>
  );
}
