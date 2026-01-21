export function PlaygroundPage() {
  return (
    <div className="mt-8 p-6 border-2 border-dashed border-border rounded-lg bg-muted/50">
      <div className="flex items-start gap-2">
        <div className="text-6xl">🚧</div>
        <div>
          <h2 className="font-semibold text-foreground mb-2">
            Under Construction
          </h2>
          <p className="text-sm text-foreground">
            This space is reserved for experiments and creative ideas. As
            inspiration strikes, new interactive demos and playground features
            will appear here to help explore and learn.
          </p>
        </div>
      </div>
    </div>
  );
}
