import { seedProductIdeas } from "@/lib/productIdeaSeed";
import { Button } from "@/components/ui/BrandButton";

export default function SeedProductIdeasPage() {
  return (
    <Button
      variant="filled"
      semantic="primary"
      onClick={async () => {
        await seedProductIdeas();
        alert("Product ideas seeded");
      }}
    >
      Seed Product Ideas
    </Button>
  );
}
