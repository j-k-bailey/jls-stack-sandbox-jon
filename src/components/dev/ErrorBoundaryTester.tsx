import { useState } from "react";
import { Button } from "@/components/ui/BrandButton";

export function ErrorBoundaryTester() {
  const [shouldThrow, setShouldThrow] = useState(false);

  if (shouldThrow) {
    throw new Error("Testing AppErrorBoundary!");
  }

  return (
    <Button onClick={() => setShouldThrow(true)} semantic="warning">
      Test Error Boundary
    </Button>
  );
}
