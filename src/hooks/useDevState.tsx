import { useState } from "react";
import { Bug } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// ============================================================================
// TYPES
// ============================================================================

export type DevStateOption =
  | "normal"
  | "loading"
  | "filtering"
  | "error"
  | "empty"
  | "empty-filtered";

type DevStateConfig = {
  label: string;
  value: DevStateOption;
};

const DEFAULT_STATES: DevStateConfig[] = [
  { label: "Normal (Real Data)", value: "normal" },
  { label: "Loading State", value: "loading" },
  { label: "Filtering State", value: "filtering" },
  { label: "Error State", value: "error" },
  { label: "Empty State", value: "empty" },
  { label: "Empty (Filtered)", value: "empty-filtered" },
];

// ============================================================================
// HOOK
// ============================================================================

export function useDevState(
  customStates?: DevStateConfig[],
): [DevStateOption, (state: DevStateOption) => void] {
  const [devState, setDevState] = useState<DevStateOption>("normal");
  return [devState, setDevState];
}

// ============================================================================
// COMPONENT
// ============================================================================

type DevStateControlsProps = {
  currentState: DevStateOption;
  onStateChange: (state: DevStateOption) => void;
  customStates?: DevStateConfig[];
  className?: string;
};

export function DevStateControls({
  currentState,
  onStateChange,
  customStates,
  className = "",
}: DevStateControlsProps) {
  const isDev = import.meta.env.DEV;

  if (!isDev) return null;

  const states = customStates || DEFAULT_STATES;

  return (
    <Card className={`border-warning/40 bg-warning/5 ${className}`}>
      <CardContent className="pt-6">
        <div className="flex items-center gap-3">
          <Bug className="h-4 w-4 text-warning" />
          <span className="text-sm font-medium text-warning">Dev Mode</span>
          <Select
            value={currentState}
            onValueChange={(v) => onStateChange(v as DevStateOption)}
          >
            <SelectTrigger className="h-8 w-48 text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {states.map((state) => (
                <SelectItem key={state.value} value={state.value}>
                  {state.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}

// ============================================================================
// HELPER UTILITIES
// ============================================================================

type StateOverrides<T> = {
  loading?: Partial<T>;
  filtering?: Partial<T>;
  error?: Partial<T>;
  empty?: Partial<T>;
  "empty-filtered"?: Partial<T>;
};

/**
 * Apply dev state overrides to your actual state
 *
 * @example
 * const displayState = applyDevStateOverrides(
 *   devState,
 *   { initialLoading, filtering, fetchError, ideas },
 *   {
 *     loading: { initialLoading: true, ideas: [] },
 *     error: { fetchError: "Failed to load", ideas: [] },
 *     empty: { ideas: [] },
 *   }
 * );
 */
export function applyDevStateOverrides<T extends Record<string, unknown>>(
  devState: DevStateOption,
  actualState: T,
  overrides: StateOverrides<T>,
): T {
  if (devState === "normal" || import.meta.env.PROD) {
    return actualState;
  }

  const override = overrides[devState];
  return override ? { ...actualState, ...override } : actualState;
}
