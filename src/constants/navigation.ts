import {
  Home,
  Layers,
  Box,
  FilePlus2,
  FlaskConical,
  ClipboardCheck,
  CircleHelp,
  Settings,
  Lightbulb,
  Mail,
  TrainTrack,
  Paintbrush,
} from "lucide-react";
import type { NavConfig } from "@/components/layout/NavigationItem";

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
    label: "Product Ideas",
    to: "/ideas",
    end: true,
    icon: Lightbulb,
  },
  {
    type: "item",
    label: "Create Product Idea",
    to: "/ideas/new",
    icon: FilePlus2,
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
    type: "item",
    label: "Change Log",
    to: "/change-log",
    icon: TrainTrack,
  },
  {
    type: "item",
    label: "Contrast Check",
    to: "/contrast-check",
    icon: Paintbrush,
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
