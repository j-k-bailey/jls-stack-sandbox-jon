import { useEffect } from "react";
import { useLiveStatus } from "@/contexts/LiveStatusContext";

/**
 * Wraps a subscription effect and automatically registers/deregisters
 * with the global live status registry.
 *
 * Usage:
 *   useLiveSubscription(
 *     () => subscribeToActiveIdeas(onNext, onError),
 *     [dep1, dep2]
 *   );
 */
export function useLiveSubscription(
  subscribe: () => () => void,
  deps: React.DependencyList,
) {
  const { registerListener } = useLiveStatus();

  useEffect(() => {
    const unregister = registerListener();
    const unsubscribe = subscribe();

    return () => {
      unsubscribe();
      unregister();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
