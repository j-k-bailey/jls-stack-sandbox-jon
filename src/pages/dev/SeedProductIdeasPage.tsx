import { seedProductIdeas } from "@/lib/productIdeaSeed";
import { Button } from "@/components/ui/BrandButton";
import { Card, CardContent } from "@/components/ui/card";
import { seedProductIdeaNotes } from "@/lib/productIdeaNotesSeed";

export default function SeedProductIdeasPage() {
  return (
    <Card className="m-layout">
      <CardContent className="flex flex-col space-y-stack">
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

        <Button
          variant="filled"
          semantic="primary"
          onClick={async () => {
            await seedProductIdeaNotes();
            alert("Product ideas seeded");
          }}
        >
          Seed Idea Notes
        </Button>
      </CardContent>
    </Card>
  );
}
