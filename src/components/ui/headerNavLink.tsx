import { NavLink, type NavLinkProps } from "react-router-dom";
import { cn } from "@/lib/utils";

interface HeaderNavLinkProps extends Omit<NavLinkProps, "className"> {
  children: React.ReactNode;
}

export function HeaderNavLink({ children, ...props }: HeaderNavLinkProps) {
  return (
    <NavLink
      className={({ isActive }) =>
        cn(
          "px-compact py-tight rounded-lg transition-colors text-button",
          isActive
            ? "bg-primary text-primary-foreground"
            : "text-muted-foreground hover:bg-surface-5 hover:text-foreground",
        )
      }
      {...props}
    >
      {children}
    </NavLink>
  );
}
