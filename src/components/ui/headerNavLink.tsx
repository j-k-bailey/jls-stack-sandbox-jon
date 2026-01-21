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
          "px-3 py-1.5 rounded-lg transition-colors",
          isActive
            ? "bg-primary text-primary-foreground"
            : "text-muted-foreground hover:bg-muted/60 hover:text-foreground",
        )
      }
      {...props}
    >
      {children}
    </NavLink>
  );
}
