import { SimpleHeader } from "@/components/ui/simpleHeader";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { StatCard } from "@/components/ui/layoutSandbox/StatCard";

export function DashboardPage() {
  return (
    <div className="section-spacing container px-standard pb-section">
      <SimpleHeader
        pageTitle="JLS Stack Dashboard (Placeholder)"
        pageDescription="This is your future home for metrics, quick links, and key actions. For now, it just proves that routing works."
      />
      <div className="grid grid-cols-12 gap-6 mt-8">
        {/* Quick Stats Section */}

        <div className="col-span-12 md:col-span-6 lg:col-span-3">
          <StatCard
            label="Total Revenue"
            value="$45K"
            description="This month's revenue"
            variant="featured"
            className="h-full"
          />
        </div>
        <div className="col-span-12 md:col-span-6 lg:col-span-3">
          <StatCard
            label="Active Users"
            value={1234}
            description="Users online right now"
            variant="default"
            className="h-full"
          />
        </div>
        <div className="col-span-12 md:col-span-6 lg:col-span-3">
          <StatCard
            label="Failed Requests"
            value={23}
            description="Errors in last 24h"
            variant="error"
            className="h-full"
          />
        </div>
        <div className="col-span-12 md:col-span-6 lg:col-span-3">
          <StatCard
            label="System Health"
            value="98.5%"
            description="Overall uptime"
            variant="default"
            className="h-full"
          />
        </div>

        {/* Main Content Area */}
        <Card className="col-span-12 lg:col-span-9 flex flex-col">
          <CardHeader>
            <CardTitle>Primary Graph</CardTitle>
          </CardHeader>
          <CardContent className="flex-1">
            <div className="h-64 bg-muted rounded flex items-center justify-center text-muted-foreground">
              Graph placeholder
            </div>
          </CardContent>
        </Card>

        {/* Sidebar */}
        <Card className="col-span-12 lg:col-span-3 flex flex-col">
          <CardHeader>
            <CardTitle>Secondary Content</CardTitle>
          </CardHeader>
          <CardContent className="flex-1">
            <div className="space-y-4"></div>
          </CardContent>
        </Card>

        {/* Recent Activity Section */}
        <Card className="col-span-12 flex flex-col">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="flex-1">
            <div className="space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-border">
                <span className="text-body-2 text-muted-foreground">
                  No recent activity
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
