import {
  createContext,
  useContext,
  useReducer,
  useCallback,
  type ReactNode,
} from "react";

type LiveStatus = "live" | "error" | "off";

type State = {
  activeCount: number;
  errorCount: number;
};

type Action =
  | { type: "REGISTER" }
  | { type: "UNREGISTER" }
  | { type: "SET_ERROR" }
  | { type: "CLEAR_ERROR" };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "REGISTER":
      return { ...state, activeCount: state.activeCount + 1 };
    case "UNREGISTER":
      return {
        ...state,
        activeCount: Math.max(0, state.activeCount - 1),
      };
    case "SET_ERROR":
      return { ...state, errorCount: state.errorCount + 1 };
    case "CLEAR_ERROR":
      return { ...state, errorCount: Math.max(0, state.errorCount - 1) };
  }
}

type LiveStatusContextValue = {
  status: LiveStatus;
  activeCount: number; // add this
  registerListener: () => () => void;
  reportError: () => () => void;
};

const LiveStatusContext = createContext<LiveStatusContextValue | null>(null);

export function LiveStatusProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, {
    activeCount: 0,
    errorCount: 0,
  });

  // Returns an unregister function for use in useEffect cleanup
  const registerListener = useCallback(() => {
    dispatch({ type: "REGISTER" });
    return () => dispatch({ type: "UNREGISTER" });
  }, []);

  // Returns a clear function for use in useEffect cleanup
  const reportError = useCallback(() => {
    dispatch({ type: "SET_ERROR" });
    return () => dispatch({ type: "CLEAR_ERROR" });
  }, []);

  const status: LiveStatus =
    state.errorCount > 0 ? "error" : state.activeCount > 0 ? "live" : "off";

  return (
    <LiveStatusContext.Provider
      value={{
        status,
        activeCount: state.activeCount,
        registerListener,
        reportError,
      }}
    >
      {children}
    </LiveStatusContext.Provider>
  );
}

export function useLiveStatus() {
  const ctx = useContext(LiveStatusContext);
  if (!ctx)
    throw new Error("useLiveStatus must be used within LiveStatusProvider");
  return ctx;
}
