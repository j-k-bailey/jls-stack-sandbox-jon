import {
  FaLayerGroup,
  FaCube,
  FaFlask,
  FaClipboardCheck,
  FaQuestion,
  FaHouse,
  FaGear,
  FaEnvelope,
} from "react-icons/fa6";
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
    icon: FaHouse,
  },
  {
    type: "item",
    label: "Layout Sandbox",
    to: "/layout-sandbox",
    icon: FaLayerGroup,
  },
  {
    type: "item",
    label: "Components",
    to: "/components",
    icon: FaCube,
  },
  {
    type: "heading",
    label: "Development",
  },
  {
    type: "item",
    label: "Playground",
    to: "/playground",
    icon: FaFlask,
  },
  {
    type: "item",
    label: "Quality Log",
    to: "/quality-check",
    icon: FaClipboardCheck,
  },
  {
    type: "heading",
    label: "System",
  },
  {
    type: "item",
    label: "Help",
    to: "/help",
    icon: FaQuestion,
  },
  {
    type: "item",
    label: "Settings",
    to: "/settings",
    icon: FaGear,
  },
  {
    type: "item",
    label: "Inbox",
    to: "/inbox",
    icon: FaEnvelope,
    badge: {
      label: "Alpha",
      variant: "accent",
    },
    notification: {
      count: 12,
    },
  },
];
