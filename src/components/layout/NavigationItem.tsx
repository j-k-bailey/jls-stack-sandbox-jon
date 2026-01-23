import * as React from "react";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";

interface BadgeConfig {
  label: string;
  variant?: "primary" | "accent" | "success" | "warning" | "neutral";
}

interface NotificationConfig {
  count?: number;
  dot?: boolean;
}

interface NavItemConfig {
  type: "item";
  label: string;
  to: string;
  icon?: React.ComponentType<{ className?: string }>;
  badge?: BadgeConfig;
  notification?: NotificationConfig;
}

interface NavHeadingConfig {
  type: "heading";
  label: string;
}

type NavConfig = NavItemConfig | NavHeadingConfig;

interface NavigationGroupProps {
  items: NavConfig[];
  onItemClick?: () => void;
}

interface NavItemProps {
  label: string;
  to: string;
  icon?: React.ComponentType<{ className?: string }>;
  onClick?: () => void;
  nested?: boolean;
  badge?: BadgeConfig;
  notification?: NotificationConfig;
}

interface NavHeadingProps {
  label: string;
}

const NavigationItem = React.forwardRef<HTMLAnchorElement, NavItemProps>(
  (
    { label, to, icon: Icon, onClick, nested = false, badge, notification },
    ref,
  ) => {
    return (
      <NavLink
        ref={ref}
        to={to}
        end={to === "/"}
        onClick={onClick}
        className={({ isActive }) =>
          cn(
            "flex items-center gap-tight rounded-lg px-compact py-tight body-2 transition-colors",
            nested && "pl-standard",
            isActive
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:bg-accent/20 hover:text-foreground",
          )
        }
      >
        {/* Icon with optional notification indicator */}
        {Icon && (
          <div className="relative shrink-0">
            <Icon className="size-4" />
            {notification && (
              <>
                {notification.dot ? (
                  // Just a dot
                  <span className="absolute -top-0.5 -right-0.5 size-2 rounded-full bg-accent border border-background" />
                ) : (
                  notification.count &&
                  notification.count > 0 && (
                    // Count badge
                    <span className="absolute -top-1.5 -right-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent text-accent-foreground text-[10px] font-bold px-0.5">
                      {notification.count > 9 ? "9+" : notification.count}
                    </span>
                  )
                )}
              </>
            )}
          </div>
        )}

        {/* Label */}
        <span className="flex-1">{label}</span>

        {/* Badge pill */}
        {badge && (
          <span
            className={cn(
              "px-1.5 py-0.5 rounded-full caption font-semibold uppercase",
              {
                "bg-primary-background text-primary-foreground":
                  badge.variant === "primary",
                "bg-accent-background text-accent border border-border-accent/50":
                  badge.variant === "accent",
                "bg-success-background text-success border border-border-success/50":
                  badge.variant === "success",
                "bg-warning-background text-warning border border-border-warning/50":
                  badge.variant === "warning",
                "bg-neutral-background text-neutral-foreground border border-border/50":
                  !badge.variant || badge.variant === "neutral",
              },
            )}
          >
            {badge.label}
          </span>
        )}
      </NavLink>
    );
  },
);
NavigationItem.displayName = "NavigationItem";

const NavigationHeading = React.forwardRef<HTMLDivElement, NavHeadingProps>(
  ({ label }, ref) => {
    return (
      <div
        ref={ref}
        className="px-tight pt-standard overline-text text-muted-foreground"
      >
        {label}
      </div>
    );
  },
);
NavigationHeading.displayName = "NavigationHeading";

const NavigationGroup = React.forwardRef<HTMLDivElement, NavigationGroupProps>(
  ({ items, onItemClick }, ref) => {
    return (
      <div ref={ref} className="flex flex-col">
        {items.map((item, index) => {
          switch (item.type) {
            case "heading":
              return <NavigationHeading key={index} label={item.label} />;

            case "item":
              return (
                <NavigationItem
                  key={item.to}
                  label={item.label}
                  to={item.to}
                  icon={item.icon}
                  badge={item.badge}
                  notification={item.notification}
                  onClick={onItemClick}
                />
              );

            default:
              return null;
          }
        })}
      </div>
    );
  },
);
NavigationGroup.displayName = "NavigationGroup";

export {
  NavigationItem,
  NavigationHeading,
  NavigationGroup,
  type NavItemProps,
  type NavHeadingProps,
  type NavConfig,
  type NavigationGroupProps,
  type BadgeConfig,
  type NotificationConfig,
};
