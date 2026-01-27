import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/Button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent,
  CardFooter,
} from "@/components/ui/Card";
import {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
} from "@/components/ui/Command";
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
  Form,
  FormItem,
  FormField,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/Form";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverDescription,
} from "@/components/ui/Popover";
import { FaGears, FaCalendar, FaMagnifyingGlass } from "react-icons/fa6";

type CreateTaskFormFields = {
  taskName: string;
  visibility: "team" | "personal";
  description?: string;
  priority?: "high" | "medium" | "low";
  category?: string;
  tags?: string[];
};

// export const CreateTaskPage = () => {
//   //   const { register } = useForm<CreateTaskFormFields>();

//   //   return (
//   //     <div>
//   //       <Card>
//   //         <CardTitle>Create Task</CardTitle>
//   //         <CardContent className="space-y-section">
//   //           <form>
//   //             <input
//   //               {...register("taskName")}
//   //               type="text"
//   //               placeholder="Task Name"
//   //             />
//   //             <p>visibility</p>
//   //             <p>description</p>

//   //             <p>Priority</p>
//   //             <p>category selection</p>
//   //             <p>tags</p>
//   //           </form>

//   //           <Command className="max-w-sm rounded-lg border">
//   //             <CommandInput placeholder="Type a command or search..." />
//   //             <CommandList>
//   //               <CommandEmpty>No results found.</CommandEmpty>
//   //               <CommandGroup heading="Suggestions">
//   //                 <CommandItem>Calendar</CommandItem>
//   //                 <CommandItem>Search Emoji</CommandItem>
//   //                 <CommandItem>Calculator</CommandItem>
//   //               </CommandGroup>
//   //               <CommandSeparator />
//   //               <CommandGroup heading="Settings">
//   //                 <CommandItem>Profile</CommandItem>
//   //                 <CommandItem>Billing</CommandItem>
//   //                 <CommandItem>Settings</CommandItem>
//   //               </CommandGroup>
//   //             </CommandList>
//   //           </Command>

//   //           <Dialog>
//   //             <DialogTrigger>Open</DialogTrigger>
//   //             <DialogContent>
//   //               <DialogHeader>
//   //                 <DialogTitle>Are you absolutely sure?</DialogTitle>
//   //                 <DialogDescription>
//   //                   This action cannot be undone. This will permanently delete
//   //                   your account and remove your data from our servers.
//   //                 </DialogDescription>
//   //               </DialogHeader>
//   //             </DialogContent>
//   //           </Dialog>

//   //         </CardContent>
//   //       </Card>
//   //     </div>
//   );
// };

// Minimal validation schema
const formSchema = z
  .object({
    username: z.string().min(3, "Username must be at least 3 characters"),
    email: z.string().email("Please enter a valid email"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
    bio: z.string().optional(),
    fullName: z.string().min(1, "Name is required"),
    testField: z.string().min(1, "This field is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type FormValues = z.infer<typeof formSchema>;

export function CreateTaskPage() {
  const [commandOpen, setCommandOpen] = React.useState(false);
  const [dialogOpen, setDialogOpen] = React.useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      bio: "",
      fullName: "",
      testField: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log("Form submitted:", data);
    alert("Form submitted successfully! Check console for data.");
  };

  const triggerErrors = () => {
    form.trigger(); // Validate all fields to show errors
  };

  return (
    <div className="min-h-screen bg-background p-8 space-y-12">
      {/* BUTTONS SECTION */}
      <section className="space-y-6">
        <h1 className="text-3xl font-bold">Button Component Variants</h1>

        <Card>
          <CardHeader>
            <CardTitle>Filled Variants (All Semantics)</CardTitle>
            <CardDescription>
              Default button style with all semantic colors
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-4">
            <Button variant="filled" semantic="neutral">
              Neutral
            </Button>
            <Button variant="filled" semantic="primary">
              Primary
            </Button>
            <Button variant="filled" semantic="accent">
              Accent
            </Button>
            <Button variant="filled" semantic="success">
              Success
            </Button>
            <Button variant="filled" semantic="warning">
              Warning
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Outline Variants (All Semantics)</CardTitle>
            <CardDescription>
              Outline style with all semantic colors
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-4">
            <Button variant="outline" semantic="neutral">
              Neutral
            </Button>
            <Button variant="outline" semantic="primary">
              Primary
            </Button>
            <Button variant="outline" semantic="accent">
              Accent
            </Button>
            <Button variant="outline" semantic="success">
              Success
            </Button>
            <Button variant="outline" semantic="warning">
              Warning
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Ghost Variants (All Semantics)</CardTitle>
            <CardDescription>
              Ghost style with all semantic colors
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-4">
            <Button variant="ghost" semantic="neutral">
              Neutral
            </Button>
            <Button variant="ghost" semantic="primary">
              Primary
            </Button>
            <Button variant="ghost" semantic="accent">
              Accent
            </Button>
            <Button variant="ghost" semantic="success">
              Success
            </Button>
            <Button variant="ghost" semantic="warning">
              Warning
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Link Variants (All Semantics)</CardTitle>
            <CardDescription>
              Link style with all semantic colors
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-4">
            <Button variant="link" semantic="neutral">
              Neutral
            </Button>
            <Button variant="link" semantic="primary">
              Primary
            </Button>
            <Button variant="link" semantic="accent">
              Accent
            </Button>
            <Button variant="link" semantic="success">
              Success
            </Button>
            <Button variant="link" semantic="warning">
              Warning
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Button Sizes</CardTitle>
            <CardDescription>All available size variants</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap items-center gap-4">
            <Button size="sm">Small</Button>
            <Button size="default">Default</Button>
            <Button size="lg">Large</Button>
            <Button size="icon-sm">
              <FaGears />
            </Button>
            <Button size="icon">
              <FaGears />
            </Button>
            <Button size="icon-lg">
              <FaGears />
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Disabled States</CardTitle>
            <CardDescription>Buttons in disabled state</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-4">
            <Button variant="filled" disabled>
              Filled Disabled
            </Button>
            <Button variant="outline" disabled>
              Outline Disabled
            </Button>
            <Button variant="ghost" disabled>
              Ghost Disabled
            </Button>
            <Button variant="link" disabled>
              Link Disabled
            </Button>
          </CardContent>
        </Card>
      </section>

      {/* CARD SECTION */}
      <section className="space-y-6">
        <h1 className="text-3xl font-bold">Card Component Structure</h1>

        <Card>
          <CardHeader>
            <CardTitle>Card with Header and Description</CardTitle>
            <CardDescription>
              This shows the header area with title and description
            </CardDescription>
            <CardAction>
              <Button variant="ghost" size="icon-sm">
                <FaGears />
              </Button>
            </CardAction>
          </CardHeader>
          <CardContent>
            <p>
              This is the main content area of the card. It can contain any
              content.
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="outline">Cancel</Button>
            <Button variant="filled" semantic="primary">
              Save
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Card Without Action</CardTitle>
            <CardDescription>A simpler card layout</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Content goes here without a footer.</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <p>Minimal card with only content, no header or footer.</p>
          </CardContent>
        </Card>
      </section>

      {/* INPUT & LABEL SECTION */}
      <section className="space-y-6">
        <h1 className="text-3xl font-bold">
          Input & Label Components (Static)
        </h1>

        <Card>
          <CardHeader>
            <CardTitle>Input States</CardTitle>
            <CardDescription>
              Various input field states without form context
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="normal">Normal Input</Label>
              <Input id="normal" type="text" placeholder="Enter text..." />
            </div>

            <div className="space-y-2">
              <Label htmlFor="filled">Input with Value</Label>
              <Input id="filled" type="text" defaultValue="Some text content" />
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
              <Label htmlFor="error">Input with Error State</Label>
              <Input
                id="error"
                type="text"
                aria-invalid={true}
                placeholder="Invalid input"
              />
              <p className="text-destructive text-sm">
                This field has an error
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Input</Label>
              <Input id="email" type="email" placeholder="email@example.com" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password Input</Label>
              <Input id="password" type="password" placeholder="••••••••" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="number">Number Input</Label>
              <Input id="number" type="number" placeholder="0" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="file">File Input</Label>
              <Input id="file" type="file" />
            </div>
          </CardContent>
        </Card>
      </section>

      {/* DIALOG SECTION */}
      <section className="space-y-6">
        <h1 className="text-3xl font-bold">Dialog Component</h1>

        <Card>
          <CardHeader>
            <CardTitle>Dialog Trigger</CardTitle>
            <CardDescription>Click to see dialog variations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline">Open Dialog</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Dialog Title</DialogTitle>
                  <DialogDescription>
                    This is a description that explains what the dialog is
                    about.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label>Name</Label>
                    <Input placeholder="Enter your name" />
                  </div>
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input type="email" placeholder="email@example.com" />
                  </div>
                </div>
                <DialogFooter showCloseButton={true}>
                  <Button variant="filled" semantic="primary">
                    Save Changes
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      </section>

      {/* POPOVER SECTION */}
      <section className="space-y-6">
        <h1 className="text-3xl font-bold">Popover Component</h1>

        <Card>
          <CardHeader>
            <CardTitle>Popover Examples</CardTitle>
            <CardDescription>Various popover configurations</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-4">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">Simple Popover</Button>
              </PopoverTrigger>
              <PopoverContent>
                <p>This is a simple popover with just text content.</p>
              </PopoverContent>
            </Popover>

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
                  <Button
                    variant="filled"
                    semantic="primary"
                    className="w-full"
                  >
                    Submit
                  </Button>
                </div>
              </PopoverContent>
            </Popover>

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
                    Calendar would go here
                  </p>
                </div>
              </PopoverContent>
            </Popover>
          </CardContent>
        </Card>
      </section>

      {/* COMMAND SECTION */}
      <section className="space-y-6">
        <h1 className="text-3xl font-bold">Command Component</h1>

        <Card>
          <CardHeader>
            <CardTitle>Command Palette (Static)</CardTitle>
            <CardDescription>Command menu structure showcase</CardDescription>
          </CardHeader>
          <CardContent>
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
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Command Dialog</CardTitle>
            <CardDescription>Full-screen command palette</CardDescription>
          </CardHeader>
          <CardContent>
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
          </CardContent>
        </Card>
      </section>

      {/* FUNCTIONAL FORM SECTION */}
      <section className="space-y-6">
        <h1 className="text-3xl font-bold">Form Components (Functional)</h1>

        <Card>
          <CardHeader>
            <CardTitle>Form Testing Area</CardTitle>
            <CardDescription>
              Try submitting empty or invalid data to see error states
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4 flex gap-2">
              <Button variant="outline" onClick={triggerErrors}>
                Trigger All Errors
              </Button>
              <Button variant="outline" onClick={() => form.reset()}>
                Reset Form
              </Button>
            </div>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormDescription>
                        Enter your first and last name
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

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
                        This is your public display name. Min 3 characters.
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
                      <FormLabel>Email Address</FormLabel>
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

                <FormField
                  control={form.control}
                  name="testField"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Required Test Field</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="This field is required"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Test required field validation
                      </FormDescription>
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
                  <Button type="button" variant="outline">
                    Save Draft
                  </Button>
                  <Button type="submit" variant="filled" semantic="primary">
                    Create Account
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
