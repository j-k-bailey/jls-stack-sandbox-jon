import {
  Home,
  Layers,
  Box,
  CalendarDays,
  FlaskConical,
  ClipboardCheck,
  CircleHelp,
  Settings,
  Mail,
} from "lucide-react";
import type { NavConfig } from "@/components/ui/NavigationItem";

export const NAVIGATION_CONFIG: NavConfig[] = [
  {
    type: "heading",
    label: "Main",
  },
  {
    type: "item",
    label: "Dashboard",
    to: "/",
    icon: Home,
  },
  {
    type: "item",
    label: "Layout Sandbox",
    to: "/layout-sandbox",
    icon: Layers,
  },
  {
    type: "item",
    label: "Components",
    to: "/components",
    icon: Box,
  },
  {
    type: "item",
    label: "Task Manager",
    to: "/create-Task",
    icon: CalendarDays,
  },
  {
    type: "heading",
    label: "Development",
  },
  {
    type: "item",
    label: "Playground",
    to: "/playground",
    icon: FlaskConical,
  },
  {
    type: "item",
    label: "Quality Log",
    to: "/quality-check",
    icon: ClipboardCheck,
  },
  {
    type: "heading",
    label: "System",
  },
  {
    type: "item",
    label: "Help",
    to: "/help",
    icon: CircleHelp,
  },
  {
    type: "item",
    label: "Settings",
    to: "/settings",
    icon: Settings,
  },
  {
    type: "item",
    label: "Inbox",
    to: "/inbox",
    icon: Mail,
    badge: {
      label: "Alpha",
      variant: "accent",
    },
    notification: {
      count: 12,
    },
  },
];
