import { PageHeader } from "@/components/common/PageHeader";
import { SectionCard } from "@/components/common/SectionCard";
import { StatsRow } from "@/components/dashboard/StatsRow";
import { ActivityItem } from "@/components/layoutSandbox/ActivityItem";
import { SimpleFeatureCard } from "@/components/layoutSandbox/SimpleFeatureCard";
import { SelectInput } from "@/components/layoutSandbox/SelectInput";
import { StatCard } from "@/components/layoutSandbox/StatCard";
import { TaskItem } from "@/components/layoutSandbox/TaskItem";
import {
  ComponentHighlight,
  ComponentHighlightDescription,
  ComponentHighlightProps,
  ComponentHighlightShowcase,
  ComponentHighlightTitle,
} from "@/components/common/ComponentHighlight";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import {
  UpdateCard,
  UpdateCardContent,
  UpdateCardDate,
  UpdateCardHeader,
  UpdateCardItem,
  UpdateCardTitle,
  UpdateCardVersion,
} from "@/components/common/UpdateCard";
import AppLogo from "@/components/common/AppLogo";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { ResponsiveGrid } from "@/components/layout/ResponsiveGrid";
import { InlineAlert } from "@/components/ui/InlineAlert";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CardAction,
} from "@/components/ui/Card";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/Dialog";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverDescription,
} from "@/components/ui/Popover";
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
  CommandShortcut,
  CommandDialog,
} from "@/components/ui/Command";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/Form";
import {
  FaCircleInfo,
  FaBell,
  FaFaceSmile,
  FaCircleCheck,
  FaTriangleExclamation,
  FaLightbulb,
  FaCode,
  FaRocket,
  FaGears,
  FaMagnifyingGlass,
  FaCalendar,
} from "react-icons/fa6";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import React from "react";

// Form schema for the example form
const formSchema = z
  .object({
    username: z.string().min(3, "Username must be at least 3 characters"),
    email: z.string().email("Please enter a valid email"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
    bio: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type FormValues = z.infer<typeof formSchema>;

export function ComponentsPage() {
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [commandOpen, setCommandOpen] = React.useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      bio: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log("Form submitted:", data);
    alert("Form submitted successfully! Check console for data.");
  };

  return (
    <div className="space-y-section container px-standard pb-section">
      <PageHeader
        pageTitle="Component Gallery"
        pageDescription="A showcase of UI components created for JLS Stack Sandbox"
        hr
      />

      {/* ActivityItem Section */}
      <ComponentHighlight>
        <ComponentHighlightTitle>ActivityItem</ComponentHighlightTitle>
        <ComponentHighlightDescription>
          Helper component to keep styling of various text consistent when
          displaying recent activity
        </ComponentHighlightDescription>
        <ComponentHighlightShowcase>
          <SectionCard title="Activity Items">
            <div className="space-y-4">
              <ActivityItem
                name="John Doe"
                action="Created new project"
                timestamp="2 hours ago"
              />
              <ActivityItem
                name="Jane Smith"
                action="Updated component library"
                timestamp="1 hour ago"
              />
              <ActivityItem
                name="Bob Johnson"
                action="Deployed to production"
                timestamp="30 minutes ago"
                isLast
              />
            </div>
          </SectionCard>
          <ComponentHighlightProps>
            name (string), action (string), timestamp (string), isLast (boolean)
          </ComponentHighlightProps>
        </ComponentHighlightShowcase>
      </ComponentHighlight>
      <hr />

      {/* AppLogo Section */}
      <ComponentHighlight>
        <ComponentHighlightTitle>AppLogo</ComponentHighlightTitle>
        <ComponentHighlightDescription>
          Brand logo component displaying the app name and current section with
          visual icon indicator.
        </ComponentHighlightDescription>
        <ComponentHighlightShowcase>
          <SectionCard title="App Logo">
            <div className="flex items-center justify-center p-8 bg-surface-1 rounded-lg">
              <AppLogo />
            </div>
          </SectionCard>
          <ComponentHighlightProps>No props required</ComponentHighlightProps>
        </ComponentHighlightShowcase>
      </ComponentHighlight>

      <hr />

      {/* Button Section */}
      <ComponentHighlight>
        <ComponentHighlightTitle>Button</ComponentHighlightTitle>
        <ComponentHighlightDescription>
          Versatile button system with semantic color variants and multiple
          styles. Use FilledButton, OutlineButton, GhostButton, and LinkButton
          directly for static UIs, or use the Button wrapper with variant prop
          for dynamic rendering.
        </ComponentHighlightDescription>
        <ComponentHighlightShowcase>
          <SectionCard title="Buttons">
            <div className="space-y-section">
              {/* Semantic Variants */}
              <div>
                <h3 className="font-heading text-base font-semibold mb-compact">
                  Semantic Variants
                </h3>
                <div className="flex flex-wrap gap-2">
                  <Button semantic="primary">Primary</Button>
                  <Button semantic="accent">Accent</Button>
                  <Button semantic="success">Success</Button>
                  <Button semantic="warning">Warning</Button>
                  <Button semantic="neutral">Neutral</Button>
                </div>
              </div>

              {/* Style Variants */}
              <div>
                <h3 className="font-heading text-base font-semibold mb-compact">
                  Style Variants
                </h3>
                <div className="flex flex-wrap gap-2">
                  <Button semantic="primary">Default</Button>
                  <Button variant="outline" semantic="primary">
                    Outline
                  </Button>
                  <Button variant="ghost" semantic="primary">
                    Ghost
                  </Button>
                  <Button variant="link" semantic="primary">
                    Link
                  </Button>
                </div>
              </div>

              {/* Sizes */}
              <div>
                <h3 className="font-heading text-base font-semibold mb-compact">
                  Sizes
                </h3>
                <div className="flex flex-wrap gap-2 items-center">
                  <Button size="sm">Small</Button>
                  <Button size="default">Default</Button>
                  <Button size="lg">Large</Button>
                </div>
              </div>

              {/* Combined Variants */}
              <div>
                <h3 className="font-heading text-base font-semibold mb-compact">
                  Combined Variants
                </h3>
                <div className="space-y-standard">
                  <div className="flex flex-wrap gap-2">
                    <Button semantic="primary">Primary Default</Button>
                    <Button variant="outline" semantic="primary">
                      Primary Outline
                    </Button>
                    <Button variant="ghost" semantic="primary">
                      Primary Ghost
                    </Button>
                    <Button variant="link" semantic="primary">
                      Primary Link
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button semantic="success" size="sm">
                      Success Sm
                    </Button>
                    <Button variant="outline" semantic="success" size="default">
                      Success Default
                    </Button>
                    <Button variant="ghost" semantic="success" size="lg">
                      Success Ghost Lg
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2 items-center">
                    <Button semantic="warning" size="icon">
                      🗑️
                    </Button>
                    <Button semantic="accent" size="icon-lg">
                      →
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </SectionCard>
          <ComponentHighlightProps>
            Button: variant ("default" | "filled" | "outline" | "ghost" |
            "link"), semantic ("default" | "primary" | "accent" | "success" |
            "warning" | "neutral"), size ("default" | "sm" | "lg" | "icon" |
            "icon-sm" | "icon-lg"). FilledButton, OutlineButton, GhostButton,
            LinkButton: semantic and size only (no variant prop needed).
          </ComponentHighlightProps>
        </ComponentHighlightShowcase>
      </ComponentHighlight>

      <hr />

      {/* Card Section */}
      <ComponentHighlight>
        <ComponentHighlightTitle>Card</ComponentHighlightTitle>
        <ComponentHighlightDescription>
          Compound card component with surface-1 background elevation. Built
          with CardHeader, CardTitle, CardDescription, CardAction, CardContent,
          and CardFooter subcomponents for flexible layouts.
        </ComponentHighlightDescription>
        <ComponentHighlightShowcase>
          <SectionCard title="Card Structures">
            <div className="space-y-compact">
              {/* Full Card with All Parts */}
              <Card>
                <CardHeader>
                  <CardTitle>Complete Card Example</CardTitle>
                  <CardDescription>
                    This card demonstrates all available subcomponents working
                    together
                  </CardDescription>
                  <CardAction>
                    <Button variant="ghost" size="icon-sm">
                      <FaGears />
                    </Button>
                  </CardAction>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">
                    Card content goes here. This is the main body area for your
                    card's information.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline">Cancel</Button>
                  <Button semantic="primary">Save</Button>
                </CardFooter>
              </Card>

              {/* Card Without Action */}
              <Card>
                <CardHeader>
                  <CardTitle>Card Without Action Button</CardTitle>
                  <CardDescription>
                    A simpler card without the action slot
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">
                    Content can include any React components or text
                  </p>
                </CardContent>
              </Card>

              {/* Minimal Card */}
              <Card>
                <CardContent>
                  <p className="text-sm">
                    Minimal card with only content - no header or footer
                  </p>
                </CardContent>
              </Card>
            </div>
          </SectionCard>
          <ComponentHighlightProps>
            Card (className?: string), CardHeader (className?: string),
            CardTitle (className?: string, children: ReactNode), CardDescription
            (className?: string, children: ReactNode), CardAction (className?:
            string, children: ReactNode), CardContent (className?: string,
            children: ReactNode), CardFooter (className?: string, children:
            ReactNode)
          </ComponentHighlightProps>
        </ComponentHighlightShowcase>
      </ComponentHighlight>

      <hr />

      {/* Command Section */}
      <ComponentHighlight>
        <ComponentHighlightTitle>Command</ComponentHighlightTitle>
        <ComponentHighlightDescription>
          Command palette component with search, groups, keyboard shortcuts, and
          dialog mode. Perfect for command menus, search interfaces, and quick
          actions.
        </ComponentHighlightDescription>
        <ComponentHighlightShowcase>
          <SectionCard title="Command Component">
            <div className="space-y-compact">
              {/* Static Command */}
              <div>
                <h3 className="font-heading text-base font-semibold mb-compact">
                  Static Command Palette
                </h3>
                <Command className="rounded-lg border">
                  <CommandInput placeholder="Type a command or search..." />
                  <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup heading="Suggestions">
                      <CommandItem>
                        <FaCalendar className="mr-2" />
                        <span>Calendar</span>
                      </CommandItem>
                      <CommandItem>
                        <FaMagnifyingGlass className="mr-2" />
                        <span>Search Emoji</span>
                      </CommandItem>
                      <CommandItem>
                        <FaGears className="mr-2" />
                        <span>Settings</span>
                      </CommandItem>
                    </CommandGroup>
                    <CommandSeparator />
                    <CommandGroup heading="Settings">
                      <CommandItem>
                        <span>Profile</span>
                        <CommandShortcut>⌘P</CommandShortcut>
                      </CommandItem>
                      <CommandItem>
                        <span>Billing</span>
                        <CommandShortcut>⌘B</CommandShortcut>
                      </CommandItem>
                      <CommandItem>
                        <span>Settings</span>
                        <CommandShortcut>⌘S</CommandShortcut>
                      </CommandItem>
                    </CommandGroup>
                  </CommandList>
                </Command>
              </div>

              {/* Command Dialog */}
              <div>
                <h3 className="font-heading text-base font-semibold mb-compact">
                  Command Dialog (Full-screen)
                </h3>
                <Button variant="outline" onClick={() => setCommandOpen(true)}>
                  Open Command Dialog
                </Button>
                <CommandDialog open={commandOpen} onOpenChange={setCommandOpen}>
                  <CommandInput placeholder="Type a command or search..." />
                  <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup heading="Actions">
                      <CommandItem>Create New Document</CommandItem>
                      <CommandItem>Open File</CommandItem>
                      <CommandItem>Save All</CommandItem>
                    </CommandGroup>
                    <CommandSeparator />
                    <CommandGroup heading="Recent">
                      <CommandItem>Project Alpha</CommandItem>
                      <CommandItem>Design System</CommandItem>
                      <CommandItem>Documentation</CommandItem>
                    </CommandGroup>
                  </CommandList>
                </CommandDialog>
              </div>
            </div>
          </SectionCard>
          <ComponentHighlightProps>
            Command (className?: string), CommandInput (placeholder?: string),
            CommandList (children: ReactNode), CommandEmpty (children:
            ReactNode), CommandGroup (heading?: string, children: ReactNode),
            CommandItem (onSelect?: () =&gt; void, disabled?: boolean, children:
            ReactNode), CommandSeparator (), CommandShortcut (children:
            ReactNode), CommandDialog (open: boolean, onOpenChange: (open:
            boolean) =&gt; void)
          </ComponentHighlightProps>
        </ComponentHighlightShowcase>
      </ComponentHighlight>

      <hr />

      {/* Dialog Section */}
      <ComponentHighlight>
        <ComponentHighlightTitle>Dialog</ComponentHighlightTitle>
        <ComponentHighlightDescription>
          Modal dialog component with overlay, customizable close button, and
          structured header/footer sections. Uses surface-4 elevation for
          prominent modals.
        </ComponentHighlightDescription>
        <ComponentHighlightShowcase>
          <SectionCard title="Dialog Component">
            <div className="space-y-compact">
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline">Open Dialog</Button>
                </DialogTrigger>
                <DialogContent showCloseButton={true}>
                  <DialogHeader>
                    <DialogTitle>Edit Profile</DialogTitle>
                    <DialogDescription>
                      Make changes to your profile here. Click save when you're
                      done.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-standard py-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" placeholder="Enter your name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="email@example.com"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      variant="outline"
                      onClick={() => setDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button semantic="primary">Save Changes</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </SectionCard>
          <ComponentHighlightProps>
            Dialog (open?: boolean, onOpenChange?: (open: boolean) =&gt; void),
            DialogTrigger (asChild?: boolean, children: ReactNode),
            DialogContent (showCloseButton?: boolean, className?: string,
            children: ReactNode), DialogHeader (className?: string, children:
            ReactNode), DialogTitle (className?: string, children: ReactNode),
            DialogDescription (className?: string, children: ReactNode),
            DialogFooter (className?: string, children: ReactNode)
          </ComponentHighlightProps>
        </ComponentHighlightShowcase>
      </ComponentHighlight>

      <hr />

      {/* FeatureCard Section */}
      <ComponentHighlight>
        <ComponentHighlightTitle>FeatureCard</ComponentHighlightTitle>
        <ComponentHighlightDescription>
          A flexible card component for showcasing features, services, or
          content with support for images, icons, badges, and CTAs. Supports
          both vertical and horizontal layouts with subtle or bold emphasis
          variants.
        </ComponentHighlightDescription>
        <ComponentHighlightShowcase className="space-y-compact">
          {/* Core Layouts */}
          <SectionCard title="Layout Variants">
            <ResponsiveGrid maxColumns="two">
              {/* Vertical - Default */}
              <FeatureCard
                heading="Vertical Layout"
                description="Default vertical layout with image, description, CTA, and multiple badges."
                image={{
                  src: "https://picsum.photos/seed/vertical/800/450",
                  alt: "Vertical layout example",
                }}
                cta={{
                  label: "Learn More",
                  href: "#",
                }}
                badges={[
                  { text: "New", variant: "accent" },
                  { text: "Featured", variant: "primary" },
                ]}
              />

              {/* Horizontal - Bold */}
              <FeatureCard
                layout="horizontal"
                emphasis="bold"
                icon={<FaRocket />}
                heading="Horizontal Bold"
                headingLevel="h3"
                description="Horizontal layout with bold emphasis, icon, and accent CTA variant."
                cta={{
                  label: "Get Started",
                  href: "#",
                  variant: "accent",
                }}
              />
            </ResponsiveGrid>
          </SectionCard>

          {/* Content Flexibility */}
          <SectionCard title="Content Variations">
            <ResponsiveGrid maxColumns="three">
              {/* Icon Only */}
              <FeatureCard
                icon={<FaCode />}
                heading="Icon-Based"
                description="Card with icon instead of image, perfect for abstract concepts."
                cta={{
                  label: "Explore",
                  onClick: () => console.log("Clicked"),
                }}
              />

              {/* Text Only */}
              <FeatureCard
                heading="Text-Only Card"
                headingLevel="h4"
                description="No image or icon needed. Useful for documentation or simple feature lists."
                cta={{
                  label: "Read Docs",
                  href: "#",
                  variant: "neutral",
                }}
              />

              {/* Clickable Card */}
              <FeatureCard
                icon={<FaLightbulb />}
                heading="Entire Card Clickable"
                description="Using onClick makes the whole card interactive with hover effects."
                badges={[{ text: "Interactive", variant: "accent" }]}
                onClick={() => alert("Card clicked!")}
              />
            </ResponsiveGrid>
          </SectionCard>

          {/* Advanced Usage */}
          <SectionCard title="Advanced Features">
            <FeatureCard
              layout="horizontal"
              emphasis="bold"
              image={{
                src: "https://picsum.photos/seed/advanced/800/800",
                alt: "Advanced example",
              }}
              heading="Rich Content Support"
              headingLevel="h2"
              description={
                <>
                  Description supports ReactNode for complex layouts:
                  <ul className="list-disc ml-5 mt-2 space-y-1">
                    <li>Custom HTML elements</li>
                    <li>Nested lists and formatting</li>
                    <li>Any valid React content</li>
                  </ul>
                </>
              }
              cta={{
                label: "View Example",
                href: "#",
                variant: "primary",
              }}
              badges={[
                { text: "Advanced", variant: "primary" },
                { text: "Popular", variant: "accent" },
              ]}
            />
          </SectionCard>

          <ComponentHighlightProps>
            layout ("vertical" | "horizontal"), emphasis ("subtle" | "bold"),
            image ({"{ src: string, alt: string }"}), icon (ReactNode), heading
            (string), headingLevel ("h2" | "h3" | "h4"), description (string |
            ReactNode), cta (
            {
              "{ label: string, href?: string, onClick?: () => void, variant?: 'primary' | 'accent' | 'neutral' }"
            }
            ), badges (Array
            {"<{ text: string, variant?: 'primary' | 'accent' }>"}), onClick (()
            =&gt; void), className (string)
          </ComponentHighlightProps>
        </ComponentHighlightShowcase>
      </ComponentHighlight>

      <hr />

      {/* Form Section */}
      <ComponentHighlight>
        <ComponentHighlightTitle>Form</ComponentHighlightTitle>
        <ComponentHighlightDescription>
          Form components built on react-hook-form with built-in validation,
          error handling, and accessibility. Uses FormField, FormItem,
          FormLabel, FormControl, FormDescription, and FormMessage for
          structured field layouts.
        </ComponentHighlightDescription>
        <ComponentHighlightShowcase>
          <SectionCard title="Form Example">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-standard"
              >
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input placeholder="johndoe" {...field} />
                      </FormControl>
                      <FormDescription>
                        Your public display name. Min 3 characters.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="john@example.com"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        We'll use this for account notifications
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="••••••••"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Must be at least 8 characters
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="••••••••"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>Re-enter your password</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="bio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bio (Optional)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Tell us about yourself..."
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>Maximum 200 characters</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex gap-2 pt-4">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => form.reset()}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" semantic="primary">
                    Create Account
                  </Button>
                </div>
              </form>
            </Form>
          </SectionCard>
          <ComponentHighlightProps>
            Form (Spread react-hook-form methods), FormField (control: Control,
            name: string, render: (field) =&gt; ReactNode), FormItem
            (className?: string), FormLabel (className?: string, children:
            ReactNode), FormControl (children: ReactNode - wraps input),
            FormDescription (className?: string, children: ReactNode),
            FormMessage (className?: string - auto-displays errors)
          </ComponentHighlightProps>
        </ComponentHighlightShowcase>
      </ComponentHighlight>

      <hr />

      {/* InlineAlert Section */}
      <ComponentHighlight>
        <ComponentHighlightTitle>InlineAlert</ComponentHighlightTitle>
        <ComponentHighlightDescription>
          Container component for displaying contextual notifications and
          messages with visual emphasis via top accent border. Fills parent
          container width.
        </ComponentHighlightDescription>
        <ComponentHighlightShowcase>
          <SectionCard title="Inline Alert Variants">
            <div className="space-y-standard">
              {/* Primary Alert */}
              <InlineAlert variant="primary">
                <div className="shrink-0 py-1">
                  <FaCircleInfo className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <p className="font-bold">New Feature Available</p>
                  <p className="text-sm mt-1">
                    Check out our latest automation tools in the dashboard.
                  </p>
                </div>
              </InlineAlert>

              {/* Neutral Alert with Dismissal */}
              <InlineAlert variant="neutral">
                <div className="shrink-0 py-1">
                  <FaBell className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <p className="font-bold">System Maintenance Scheduled</p>
                  <p className="text-sm mt-1">
                    We'll be performing routine maintenance on Saturday from 2-4
                    AM EST.
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  semantic="neutral"
                  onClick={() => console.log("Dismissed")}
                  aria-label="Dismiss"
                >
                  ×
                </Button>
              </InlineAlert>

              {/* Accent Alert with Action */}
              <InlineAlert variant="accent">
                <div className="shrink-0 py-1">
                  <FaFaceSmile className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <p className="font-bold">Welcome to the JLS Stack Sandbox!</p>
                  <p className="text-sm mt-1">
                    Explore our design system and component library. Start with
                    the navigation above.
                  </p>
                </div>
                <Button semantic="accent" size="sm">
                  Get Started
                </Button>
              </InlineAlert>

              {/* Success Alert */}
              <InlineAlert variant="success">
                <div className="shrink-0 py-1">
                  <FaCircleCheck className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <p className="font-bold">Changes Saved Successfully</p>
                  <p className="text-sm mt-1">
                    Your preferences have been updated and are now active.
                  </p>
                </div>
              </InlineAlert>

              {/* Warning Alert with Link */}
              <InlineAlert variant="warning">
                <div className="shrink-0 py-1">
                  <FaTriangleExclamation className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <p className="font-bold">API Rate Limit Approaching</p>
                  <p className="text-sm mt-1">
                    You've used 85% of your monthly API quota.
                    <Button
                      variant="link"
                      semantic="warning"
                      size="sm"
                      className="ml-1 p-0 h-auto"
                    >
                      Upgrade your plan
                    </Button>
                  </p>
                </div>
              </InlineAlert>
            </div>
          </SectionCard>
          <ComponentHighlightProps>
            variant ("primary" | "neutral" | "accent" | "success" | "warning"),
            children (ReactNode), className (string)
          </ComponentHighlightProps>
        </ComponentHighlightShowcase>
      </ComponentHighlight>
      <hr />

      {/* Input Section */}
      <ComponentHighlight>
        <ComponentHighlightTitle>Input</ComponentHighlightTitle>
        <ComponentHighlightDescription>
          Text input component with brand-aligned styling, file upload support,
          focus states with cyan ring, error states with coral warning color,
          and accessibility features. Features fuchsia accent hover glow and
          cyan focus ring.
        </ComponentHighlightDescription>
        <ComponentHighlightShowcase>
          <SectionCard title="Input Variants">
            <div className="space-y-standard max-w-sm">
              <div className="space-y-2">
                <Label htmlFor="text">Text Input</Label>
                <Input id="text" placeholder="Enter text here..." />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Input</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="email@example.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password Input</Label>
                <Input id="password" type="password" placeholder="••••••••" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="number">Number Input</Label>
                <Input id="number" type="number" placeholder="0" />
              </div>

              <div className="group space-y-2">
                <Label htmlFor="disabled">Disabled Input</Label>
                <Input
                  id="disabled"
                  type="text"
                  disabled
                  placeholder="Disabled field"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="error">Input with Error</Label>
                <Input
                  id="error"
                  type="text"
                  aria-invalid={true}
                  placeholder="Invalid input"
                />
                <p className="text-warning text-sm">This field has an error</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="file">File Upload</Label>
                <Input id="file" type="file" />
              </div>
            </div>
          </SectionCard>
          <ComponentHighlightProps>
            type (string - "text" | "email" | "password" | "number" | "file" |
            etc.), placeholder (string), disabled (boolean), aria-invalid
            (boolean), className (string), ...standard input props
          </ComponentHighlightProps>
        </ComponentHighlightShowcase>
      </ComponentHighlight>
      <hr />

      {/* Label Section */}
      <ComponentHighlight>
        <ComponentHighlightTitle>Label</ComponentHighlightTitle>
        <ComponentHighlightDescription>
          Form label component with subtitle-2 typography (14px, 500 weight),
          proper spacing, and support for disabled state styling when used with
          group wrapper.
        </ComponentHighlightDescription>
        <ComponentHighlightShowcase>
          <SectionCard title="Label Examples">
            <div className="space-y-standard max-w-sm">
              <div className="space-y-2">
                <Label htmlFor="example1">Standard Label</Label>
                <Input id="example1" placeholder="Associated input" />
              </div>

              <div className="group space-y-2">
                <Label htmlFor="example2">Label with Disabled Input</Label>
                <Input id="example2" placeholder="Disabled" disabled />
              </div>

              <div className="space-y-2">
                <Label htmlFor="example3">
                  Label with Required Indicator *
                </Label>
                <Input id="example3" placeholder="Required field" required />
              </div>
            </div>
          </SectionCard>
          <ComponentHighlightProps>
            htmlFor (string - associates with input id), className (string),
            children (ReactNode)
          </ComponentHighlightProps>
        </ComponentHighlightShowcase>
      </ComponentHighlight>

      <hr />

      {/* PageHeader Section */}
      <ComponentHighlight>
        <ComponentHighlightTitle>PageHeader</ComponentHighlightTitle>
        <ComponentHighlightDescription>
          Header component for page sections with title, subtitle, description,
          and optional actions.
        </ComponentHighlightDescription>
        <ComponentHighlightShowcase>
          <SectionCard title="Page Header Preview">
            <PageHeader
              pageTitle="Example Page"
              pageSubtitle="Subtitle text"
              pageDescription="This is a longer description of the page content."
              level="h2"
            />
          </SectionCard>
          <ComponentHighlightProps>
            pageTitle (string), pageSubtitle (string), pageDescription (string),
            actions (ReactNode), hr (boolean), level ("h1" - "h6")
          </ComponentHighlightProps>
        </ComponentHighlightShowcase>
      </ComponentHighlight>

      <hr />

      {/* Popover Section */}
      <ComponentHighlight>
        <ComponentHighlightTitle>Popover</ComponentHighlightTitle>
        <ComponentHighlightDescription>
          Floating popover component with surface-3 elevation, structured
          header/title/description sections, and customizable positioning.
          Perfect for tooltips, dropdown menus, and contextual information.
        </ComponentHighlightDescription>
        <ComponentHighlightShowcase>
          <SectionCard title="Popover Examples">
            <div className="flex flex-wrap gap-4">
              {/* Simple Popover */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline">Simple Popover</Button>
                </PopoverTrigger>
                <PopoverContent>
                  <p className="text-sm">
                    This is a simple popover with just text content.
                  </p>
                </PopoverContent>
              </Popover>

              {/* Popover with Header */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline">Popover with Header</Button>
                </PopoverTrigger>
                <PopoverContent>
                  <PopoverHeader>
                    <PopoverTitle>Popover Title</PopoverTitle>
                    <PopoverDescription>
                      This popover includes a structured header with title and
                      description.
                    </PopoverDescription>
                  </PopoverHeader>
                  <div className="mt-4 space-y-2">
                    <Input placeholder="Input in popover" />
                    <Button semantic="primary" className="w-full">
                      Submit
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>

              {/* Popover with Form */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline">
                    <FaCalendar className="mr-2" />
                    Date Picker Example
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <PopoverHeader>
                    <PopoverTitle>Select Date</PopoverTitle>
                    <PopoverDescription>
                      Choose a date from the options
                    </PopoverDescription>
                  </PopoverHeader>
                  <div className="mt-4">
                    <p className="text-sm text-muted-foreground">
                      Calendar component would go here
                    </p>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </SectionCard>
          <ComponentHighlightProps>
            Popover (open?: boolean, onOpenChange?: (open: boolean) =&gt; void),
            PopoverTrigger (asChild?: boolean, children: ReactNode),
            PopoverContent (align?: "center" | "start" | "end", sideOffset?:
            number, className?: string, children: ReactNode), PopoverHeader
            (className?: string, children: ReactNode), PopoverTitle (className?:
            string, children: ReactNode), PopoverDescription (className?:
            string, children: ReactNode)
          </ComponentHighlightProps>
        </ComponentHighlightShowcase>
      </ComponentHighlight>

      <hr />

      {/* ResponsiveGrid Section */}
      <ComponentHighlight>
        <ComponentHighlightTitle>ResponsiveGrid</ComponentHighlightTitle>
        <ComponentHighlightDescription>
          Opinionated layout primitive for consistent responsive grid behavior.
          Always starts at 1 column (mobile), expands to 2 columns at md
          breakpoint, then to 2, 3, or 4 columns at lg based on maxColumns
          variant.
        </ComponentHighlightDescription>
        <ComponentHighlightShowcase className="space-y-standard">
          {/* Default Grid - 4 columns */}
          <SectionCard title="Default Grid (1 → 2 → 4)">
            <ResponsiveGrid>
              {Array.from({ length: 8 }, (_, i) => (
                <div key={i} className="bg-primary/10 p-4 rounded">
                  Item {i + 1}
                </div>
              ))}
            </ResponsiveGrid>
          </SectionCard>

          {/* maxColumns Variants */}
          <SectionCard title="Max Columns Variants">
            <div className="space-y-section">
              <div>
                <h3 className="font-heading text-base font-semibold mb-compact text-muted-foreground">
                  Three Columns (1 → 2 → 3)
                </h3>
                <ResponsiveGrid maxColumns="three">
                  {Array.from({ length: 6 }, (_, i) => (
                    <div key={i} className="bg-accent/10 p-4 rounded">
                      Item {i + 1}
                    </div>
                  ))}
                </ResponsiveGrid>
              </div>
              <div>
                <h3 className="font-heading text-base font-semibold mb-compact text-muted-foreground">
                  Two Columns (1 → 2)
                </h3>
                <ResponsiveGrid maxColumns="two">
                  {Array.from({ length: 4 }, (_, i) => (
                    <div key={i} className="bg-accent/10 p-4 rounded">
                      Item {i + 1}
                    </div>
                  ))}
                </ResponsiveGrid>
              </div>
            </div>
          </SectionCard>

          {/* Gap Variants */}
          <SectionCard title="Gap Variants">
            <div className="space-y-section">
              <div>
                <h3 className="font-heading text-base font-semibold mb-compact text-muted-foreground">
                  Tight Gap
                </h3>
                <ResponsiveGrid gap="tight">
                  {Array.from({ length: 4 }, (_, i) => (
                    <div key={i} className="bg-primary/10 p-2 rounded text-xs">
                      Item
                    </div>
                  ))}
                </ResponsiveGrid>
              </div>
              <div>
                <h3 className="font-heading text-base font-semibold mb-compact text-muted-foreground">
                  Compact Gap
                </h3>
                <ResponsiveGrid gap="compact">
                  {Array.from({ length: 4 }, (_, i) => (
                    <div key={i} className="bg-primary/10 p-2 rounded text-xs">
                      Item
                    </div>
                  ))}
                </ResponsiveGrid>
              </div>
              <div>
                <h3 className="font-heading text-base font-semibold mb-compact text-muted-foreground">
                  Section Gap
                </h3>
                <ResponsiveGrid gap="section">
                  {Array.from({ length: 4 }, (_, i) => (
                    <div key={i} className="bg-primary/10 p-2 rounded text-xs">
                      Item
                    </div>
                  ))}
                </ResponsiveGrid>
              </div>
            </div>
          </SectionCard>

          {/* Alignment Variants */}
          <SectionCard title="Alignment Variants">
            <div className="space-y-section">
              <div>
                <h3 className="font-heading text-base font-semibold mb-compact text-muted-foreground">
                  Align Start
                </h3>
                <ResponsiveGrid align="start" maxColumns="three">
                  <div className="bg-accent/10 p-4 rounded h-16">Short</div>
                  <div className="bg-accent/10 p-4 rounded h-32">
                    Tall Content
                  </div>
                  <div className="bg-accent/10 p-4 rounded h-20">Medium</div>
                </ResponsiveGrid>
              </div>
              <div>
                <h3 className="font-heading text-base font-semibold mb-compact text-muted-foreground">
                  Align Center
                </h3>
                <ResponsiveGrid align="center" maxColumns="three">
                  <div className="bg-accent/10 p-4 rounded h-16">Short</div>
                  <div className="bg-accent/10 p-4 rounded h-32">
                    Tall Content
                  </div>
                  <div className="bg-accent/10 p-4 rounded h-20">Medium</div>
                </ResponsiveGrid>
              </div>
              <div>
                <h3 className="font-heading text-base font-semibold mb-compact text-muted-foreground">
                  Align Stretch
                </h3>
                <ResponsiveGrid align="stretch" maxColumns="three">
                  <div className="bg-accent/10 p-4 rounded">Short</div>
                  <div className="bg-accent/10 p-4 rounded h-32">
                    Tall Content
                  </div>
                  <div className="bg-accent/10 p-4 rounded">Medium</div>
                </ResponsiveGrid>
              </div>
              <div>
                <h3 className="font-heading text-base font-semibold mb-compact text-muted-foreground">
                  Align End
                </h3>
                <ResponsiveGrid align="end" maxColumns="three">
                  <div className="bg-accent/10 p-4 rounded h-16">Short</div>
                  <div className="bg-accent/10 p-4 rounded h-32">
                    Tall Content
                  </div>
                  <div className="bg-accent/10 p-4 rounded h-20">Medium</div>
                </ResponsiveGrid>
              </div>
            </div>
          </SectionCard>

          <ComponentHighlightProps>
            maxColumns ("two" | "three" | "four"), gap ("tight" | "compact" |
            "standard" | "section"), align ("start" | "center" | "stretch" |
            "end"), className (string)
          </ComponentHighlightProps>
        </ComponentHighlightShowcase>
      </ComponentHighlight>

      <hr />

      {/* SectionCard Section */}
      <ComponentHighlight>
        <ComponentHighlightTitle>SectionCard</ComponentHighlightTitle>
        <ComponentHighlightDescription>
          Card component for organizing content in sections with a title and
          optional description.
        </ComponentHighlightDescription>
        <ComponentHighlightShowcase>
          <SectionCard
            title="Card Title"
            description="Optional description of the card content"
          >
            <p>Card content goes here</p>
          </SectionCard>
          <ComponentHighlightProps>
            title (string), description (string), className (string), children
            (ReactNode)
          </ComponentHighlightProps>
        </ComponentHighlightShowcase>
      </ComponentHighlight>

      <hr />

      {/* SelectInput Section */}
      <ComponentHighlight>
        <ComponentHighlightTitle>SelectInput</ComponentHighlightTitle>
        <ComponentHighlightDescription>
          Helper component to make simple selection boxes blend in with the
          brand kit theming.
        </ComponentHighlightDescription>
        <ComponentHighlightShowcase>
          <SectionCard title="Select Inputs">
            <ResponsiveGrid maxColumns="two">
              <SelectInput
                label="Select a Framework"
                options={["React", "Vue", "Angular", "Svelte"]}
              />
              <SelectInput
                label="Select a Priority"
                options={["Low", "Medium", "High", "Critical"]}
              />
            </ResponsiveGrid>
          </SectionCard>
          <ComponentHighlightProps>
            label (string), options (string[])
          </ComponentHighlightProps>
        </ComponentHighlightShowcase>
      </ComponentHighlight>

      <hr />
      {/* SimpleFeatureCard Section */}
      <ComponentHighlight>
        <ComponentHighlightTitle>SimpleFeatureCard</ComponentHighlightTitle>
        <ComponentHighlightDescription>
          A simple card that can look like a "emphasized feature — description"
          format on larger screens.
        </ComponentHighlightDescription>
        <ComponentHighlightShowcase>
          <SectionCard title="Feature Cards">
            <ResponsiveGrid maxColumns="two">
              <SimpleFeatureCard
                title="Responsive Design"
                description="Automatically adapts to different screen sizes"
              />
              <SimpleFeatureCard
                title="Light & Dark Themes"
                description="Built with semantic color tokens that adapt to both modes"
              />
              <SimpleFeatureCard
                title="Accessible"
                description="Follows WCAG guidelines for accessibility"
              />
              <SimpleFeatureCard
                title="Customizable"
                description="Accept className props for additional styling"
              />
            </ResponsiveGrid>
          </SectionCard>
          <ComponentHighlightProps>
            title (string), description (string)
          </ComponentHighlightProps>
        </ComponentHighlightShowcase>
      </ComponentHighlight>

      <hr />

      {/* StatCard Section */}
      <ComponentHighlight>
        <ComponentHighlightTitle>StatCard</ComponentHighlightTitle>
        <ComponentHighlightDescription>
          Used to emphasize a stat, with featured and error variants.
        </ComponentHighlightDescription>
        <ComponentHighlightShowcase>
          <SectionCard title="Stat Cards">
            <ResponsiveGrid maxColumns="three">
              <StatCard
                label="Default Variant"
                value="1,234"
                description="Standard stat card with neutral styling"
              />
              <StatCard
                label="Featured Variant"
                value="5,678"
                description="Highlighted with cyan accent colors"
                variant="featured"
              />
              <StatCard
                label="Error Variant"
                value="42"
                description="Used for alerts or warning statistics"
                variant="error"
              />
            </ResponsiveGrid>
          </SectionCard>
          <ComponentHighlightProps>
            label (string), value (string | number), description (string),
            variant ("default" | "featured" | "error"), className (string)
          </ComponentHighlightProps>
        </ComponentHighlightShowcase>
      </ComponentHighlight>

      <hr />

      {/* StatsRow Section */}
      <ComponentHighlight>
        <ComponentHighlightTitle>StatsRow</ComponentHighlightTitle>
        <ComponentHighlightDescription>
          Displays a grid of statistics with labels, values, and optional hints.
        </ComponentHighlightDescription>
        <ComponentHighlightShowcase>
          <StatsRow />
          <ComponentHighlightProps>
            stats (Array of {"{label, value, hint?}"})
          </ComponentHighlightProps>
        </ComponentHighlightShowcase>
      </ComponentHighlight>

      <hr />

      {/* TaskItem Section */}
      <ComponentHighlight>
        <ComponentHighlightTitle>TaskItem</ComponentHighlightTitle>
        <ComponentHighlightDescription>
          Card to mark lists of items with high priority tasks visually
          emphasized.
        </ComponentHighlightDescription>
        <ComponentHighlightShowcase>
          <SectionCard title="Task Items">
            <div className="space-y-compact">
              <TaskItem
                title="Low Priority Task"
                metadata="Due: Tomorrow"
                priority="low"
              />
              <TaskItem
                title="Medium Priority Task"
                metadata="Due: This week"
                priority="medium"
              />
              <TaskItem
                title="High Priority Task"
                metadata="Due: Today"
                priority="high"
              />
            </div>
          </SectionCard>
          <ComponentHighlightProps>
            title (string), metadata (string), priority ("high" | "medium" |
            "low")
          </ComponentHighlightProps>
        </ComponentHighlightShowcase>
      </ComponentHighlight>

      <hr />

      {/* ThemeToggle Section */}
      <ComponentHighlight>
        <ComponentHighlightTitle>ThemeToggle</ComponentHighlightTitle>
        <ComponentHighlightDescription>
          Button component for switching between light and dark theme modes with
          persistent localStorage support.
        </ComponentHighlightDescription>
        <ComponentHighlightShowcase>
          <SectionCard title="Theme Toggle">
            <div className="flex items-center gap-standard">
              <ThemeToggle />
              <p className="text-sm text-muted-foreground">
                Click to toggle between light and dark themes
              </p>
            </div>
          </SectionCard>
          <ComponentHighlightProps>No props required</ComponentHighlightProps>
        </ComponentHighlightShowcase>
      </ComponentHighlight>

      <hr />

      {/* UpdateCard Section */}
      <ComponentHighlight>
        <ComponentHighlightTitle>UpdateCard</ComponentHighlightTitle>
        <ComponentHighlightDescription>
          Compound card component for displaying update information with
          version, date, title, and content list.
        </ComponentHighlightDescription>
        <ComponentHighlightShowcase>
          <SectionCard title="Update Cards">
            <UpdateCard>
              <UpdateCardHeader>
                <UpdateCardVersion>v2.1.0</UpdateCardVersion>
                <UpdateCardDate>March 15, 2024</UpdateCardDate>
              </UpdateCardHeader>
              <UpdateCardTitle>New Features Released</UpdateCardTitle>
              <UpdateCardContent>
                <UpdateCardItem>Added dark mode support</UpdateCardItem>
                <UpdateCardItem>Improved performance</UpdateCardItem>
                <UpdateCardItem>Fixed accessibility issues</UpdateCardItem>
              </UpdateCardContent>
            </UpdateCard>
          </SectionCard>
          <ComponentHighlightProps>
            UpdateCard, UpdateCardHeader, UpdateCardVersion, UpdateCardDate,
            UpdateCardTitle, UpdateCardContent, UpdateCardItem
          </ComponentHighlightProps>
        </ComponentHighlightShowcase>
      </ComponentHighlight>
    </div>
  );
}
