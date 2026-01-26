import { PageHeader } from "@/components/common/PageHeader";
import { SectionCard } from "@/components/common/SectionCard";
import { StatsRow } from "@/components/dashboard/StatsRow";
import { StatCard } from "@/components/layoutSandbox/StatCard";
import { ResponsiveGrid } from "@/components/layout/ResponsiveGrid";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { InlineAlert } from "@/components/ui/InlineAlert";
import { ActivityItem } from "@/components/layoutSandbox/ActivityItem";
import {
  FaRocket,
  FaCode,
  FaPalette,
  FaCircleInfo,
  FaChartLine,
} from "react-icons/fa6";

export function DashboardPage() {
  return (
    <div className="space-y-section container px-standard pb-section">
      <PageHeader
        pageTitle="JLS Stack Dashboard"
        pageDescription="Your central hub for metrics, quick links, and key actions."
      />

      <InlineAlert variant="primary">
        <div className="shrink-0 py-1">
          <FaCircleInfo className="h-6 w-6" />
        </div>
        <div className="flex-1">
          <p className="font-bold">Dashboard System Online</p>
          <p className="text-sm mt-1">
            All systems operational. Routing, theming, and component library
            fully functional.
          </p>
        </div>
      </InlineAlert>

      <div className="space-y-section">
        <ResponsiveGrid maxColumns="three">
          <StatCard
            label="Active Users"
            value="1234"
            description="Users online right now"
            variant="featured"
          />
          <StatCard
            label="Failed Requests"
            value="12"
            description="Errors in last 24h"
            variant="error"
          />
          <StatCard
            label="System Health"
            value="98.5%"
            description="Overall uptime"
          />
        </ResponsiveGrid>

        <ResponsiveGrid maxColumns="three">
          <div className="lg:col-span-2">
            <SectionCard title="Performance Metrics">
              <div className="h-64 bg-muted-background border border-border-muted rounded-lg flex items-center justify-center text-muted-foreground">
                <div className="text-center">
                  <FaChartLine className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>Graph placeholder</p>
                </div>
              </div>
            </SectionCard>
          </div>

          <div className="lg:col-span-1">
            <SectionCard title="Recent Activity" className="h-full">
              <div className="space-y-compact">
                <ActivityItem
                  name="System"
                  action="Dashboard loaded"
                  timestamp="Just now"
                />
                <ActivityItem
                  name="Theme"
                  action="Mode switched"
                  timestamp="2 min ago"
                />
                <ActivityItem
                  name="Router"
                  action="Navigation updated"
                  timestamp="5 min ago"
                  isLast
                />
              </div>
            </SectionCard>
          </div>
        </ResponsiveGrid>

        <StatsRow
          stats={[
            {
              label: "Routes",
              value: "3+",
            },
            {
              label: "Shell",
              value: "Online",
            },
            {
              label: "UI System",
              value: "Growing",
            },
          ]}
        />

        <SectionCard
          title="Quick Actions"
          description="Explore the key features of the JLS Stack Sandbox"
        >
          <ResponsiveGrid maxColumns="three">
            <FeatureCard
              icon={<FaPalette />}
              heading="Design System"
              description="Explore the brand kit, typography, and spacing utilities that power the interface."
              cta={{
                label: "View Brand Kit",
                href: "/playground/brand-kit",
                variant: "primary",
              }}
            />
            <FeatureCard
              icon={<FaCode />}
              heading="Components"
              description="Browse the full component library with live examples and usage documentation."
              cta={{
                label: "View Components",
                href: "/components",
                variant: "accent",
              }}
            />
            <FeatureCard
              icon={<FaRocket />}
              heading="Layout Sandbox"
              description="Test different layout patterns and responsive behaviors in the sandbox."
              cta={{
                label: "Open Sandbox",
                href: "/layout-sandbox",
                variant: "neutral",
              }}
            />
          </ResponsiveGrid>
        </SectionCard>
      </div>
    </div>
  );
}
