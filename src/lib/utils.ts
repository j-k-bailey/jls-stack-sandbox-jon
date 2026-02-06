import { clsx, type ClassValue } from "clsx";
import { twMergeExtended } from "@/lib/twMerge";

export function cn(...inputs: ClassValue[]) {
  return twMergeExtended(clsx(inputs));
}
