import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

export function HelpPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-8 p-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">
          Help & Documentation
        </h1>
        <p className="text-muted-foreground">
          Find resources and guidance to help you succeed in the JLS Academy
          program.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-1">
        <Card>
          <CardHeader>
            <CardTitle>Week 1 Documentation</CardTitle>
            <CardDescription>
              Getting started with the fundamentals
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm">
              Access Week 1 materials covering the basics of React, TypeScript,
              and modern web development practices. These foundational docs will
              guide you through setting up your development environment and
              understanding core concepts.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Week 2 UI/UX Documentation</CardTitle>
            <CardDescription>
              Design principles and component libraries
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm">
              Explore Week 2 resources focused on user interface design, user
              experience principles, Tailwind CSS, and component-based
              architecture. Learn how to build accessible and responsive
              interfaces using modern design patterns.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Ask for Help from Mentors</CardTitle>
            <CardDescription>Get support when you need it</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm">
              Our mentors are here to support your learning journey. Reach out
              through the dedicated Slack channels, schedule office hours, or
              submit questions through the support portal. Don't hesitate to ask
              questions—we're here to help you succeed!
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
