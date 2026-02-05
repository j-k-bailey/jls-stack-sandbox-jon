import { seedProductIdeas } from "@/lib/productIdeaSeed";
import { Button } from "@/components/ui/BrandButton";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";

export default function SeedProductIdeasPage() {
  const { user } = useAuth();

  const handleSeed = async () => {
    if (!user) {
      alert("You must be signed in to seed data");
      return;
    }

    try {
      await seedProductIdeas(user.uid);
      alert("Product ideas and notes seeded successfully!");
    } catch (error) {
      console.error("Error seeding data:", error);
      alert("Failed to seed data. Check console for details.");
    }
  };

  return (
    <Card className="m-layout">
      <CardContent className="flex flex-col space-y-stack">
        <Button
          variant="filled"
          semantic="primary"
          onClick={handleSeed}
          disabled={!user}
        >
          Seed Product Ideas & Notes
        </Button>

        {!user && (
          <p className="text-sm text-muted-foreground">
            Sign in to seed product ideas
          </p>
        )}
      </CardContent>
    </Card>
  );
}
