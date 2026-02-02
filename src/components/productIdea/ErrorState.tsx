export function ErrorState({ message }: { message: string }) {
  return (
    <div className="text-center py-inset text-destructive">
      <p className="text-sm">{message}</p>
    </div>
  );
}
