import { useForm, type SubmitHandler, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ResponsiveGrid } from "@/components/layout/ResponsiveGrid";
import { useState } from "react";
import { fakerApi } from "@/lib/fakerApi";
import { InlineAlert } from "@/components/ui/InlineAlert";
import {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field";
import { PageHeader } from "@/components/common/PageHeader";

// Validation schemas
const displayNameSchema = z
  .string()
  .min(2, "Display name must be at least 2 characters")
  .max(50, "Display name must be 50 characters or less");

const emailSchema = z.email("Please enter a valid email address");

const bioSchema = z
  .string()
  .max(200, "Bio must be 200 characters or less")
  .optional();

const languageSchema = z.enum(["en"], {
  message: "Please select a language",
});

const timezoneSchema = z.enum(
  [
    "America/New_York",
    "America/Chicago",
    "America/Denver",
    "America/Los_Angeles",
    "Europe/London",
    "Europe/Paris",
    "Asia/Tokyo",
  ],
  {
    message: "Please select a timezone",
  },
);

const themeSchema = z.enum(["light", "dark", "system"], {
  message: "Please select a theme preference",
});

const notificationsSchema = z.enum(["all", "important", "none"], {
  message: "Please select notification preference",
});

const settingsSchema = z.object({
  displayName: displayNameSchema,
  email: emailSchema,
  bio: bioSchema,
  language: languageSchema,
  timezone: timezoneSchema,
  theme: themeSchema,
  notifications: notificationsSchema,
});

type SettingsFormFields = z.infer<typeof settingsSchema>;

export const SettingsPage = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isDirty, isSubmitting },
    setError,
  } = useForm<SettingsFormFields>({
    resolver: zodResolver(settingsSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: {
      displayName: "John Doe",
      email: "john.doe@example.com",
      bio: "Product designer and developer",
      language: "en",
      timezone: "America/New_York",
      theme: "system",
      notifications: "all",
    },
  });

  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(
    null,
  );

  const onSubmit: SubmitHandler<SettingsFormFields> = async (data) => {
    setSubmitStatus(null);
    try {
      await fakerApi({ data });
      setSubmitStatus("success");
    } catch (error) {
      setSubmitStatus("error");
      setError("root", {
        type: "server",
        message:
          error instanceof Error
            ? error.message
            : "Failed to update settings. Please try again.",
      });
    }
  };

  return (
    <div className="space-y-section container px-standard pb-section">
      <PageHeader
        pageTitle="Settings"
        pageDescription="Manage your account preferences and profile information"
      />

      <Card>
        <CardTitle level="h2">Account Settings</CardTitle>

        <CardContent className="space-y-section">
          {/* Success Alert */}
          {submitStatus === "success" && (
            <InlineAlert variant="success" dismissible>
              <p className="font-bold">Settings Updated Successfully</p>
              <p className="text-sm mt-1">
                Your preferences have been saved and are now active.
              </p>
            </InlineAlert>
          )}

          {/* Error Alert */}
          {submitStatus === "error" && errors.root?.message && (
            <InlineAlert variant="warning" dismissible>
              <p className="font-bold">Update Failed</p>
              <p className="text-sm mt-1">{errors.root.message}</p>
            </InlineAlert>
          )}

          <form onSubmit={handleSubmit(onSubmit)}>
            <FieldSet>
              {/* Profile Section */}
              <FieldGroup>
                <FieldLegend>Profile Information</FieldLegend>

                <Controller
                  control={control}
                  name="displayName"
                  render={({ field }) => (
                    <Field invalid={!!errors.displayName}>
                      <FieldLabel htmlFor="displayName" required>
                        Display Name
                      </FieldLabel>
                      <Input
                        id="displayName"
                        placeholder="Enter your display name"
                        {...field}
                      />
                      <div className="flex items-center justify-between gap-2">
                        <FieldError errors={[errors.displayName]} />
                        <span className="caption text-muted-foreground shrink-0">
                          {field.value.length}/50
                        </span>
                      </div>
                    </Field>
                  )}
                />

                <Controller
                  control={control}
                  name="email"
                  render={({ field }) => (
                    <Field invalid={!!errors.email}>
                      <FieldLabel htmlFor="email" required>
                        Email Address
                      </FieldLabel>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your.email@example.com"
                        {...field}
                      />
                      <FieldError errors={[errors.email]} />
                    </Field>
                  )}
                />

                <Controller
                  control={control}
                  name="bio"
                  render={({ field }) => (
                    <Field invalid={!!errors.bio}>
                      <FieldLabel htmlFor="bio">Bio</FieldLabel>
                      <FieldDescription>
                        A short description about yourself
                      </FieldDescription>
                      <Textarea
                        id="bio"
                        placeholder="Tell us about yourself..."
                        className="min-h-24 resize-none"
                        {...field}
                        value={field.value || ""}
                      />
                      <div className="flex items-center justify-between gap-2">
                        <FieldError errors={[errors.bio]} />
                        <span className="caption text-muted-foreground shrink-0">
                          {field.value?.length || 0}/200
                        </span>
                      </div>
                    </Field>
                  )}
                />
              </FieldGroup>

              <FieldSeparator />

              {/* Preferences Section */}
              <FieldGroup>
                <FieldLegend>Preferences</FieldLegend>

                <ResponsiveGrid maxColumns="two" align="start">
                  <Controller
                    control={control}
                    name="language"
                    render={({ field }) => (
                      <Field invalid={!!errors.language}>
                        <FieldLabel htmlFor="language" required>
                          Language
                        </FieldLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                          name={field.name}
                        >
                          <SelectTrigger id="language">
                            <SelectValue placeholder="Select language" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="en">English</SelectItem>
                          </SelectContent>
                        </Select>
                        <FieldError errors={[errors.language]} />
                      </Field>
                    )}
                  />

                  <Controller
                    control={control}
                    name="timezone"
                    render={({ field }) => (
                      <Field invalid={!!errors.timezone}>
                        <FieldLabel htmlFor="timezone" required>
                          Timezone
                        </FieldLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                          name={field.name}
                        >
                          <SelectTrigger id="timezone">
                            <SelectValue placeholder="Select timezone" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="America/New_York">
                              Eastern Time (ET)
                            </SelectItem>
                            <SelectItem value="America/Chicago">
                              Central Time (CT)
                            </SelectItem>
                            <SelectItem value="America/Denver">
                              Mountain Time (MT)
                            </SelectItem>
                            <SelectItem value="America/Los_Angeles">
                              Pacific Time (PT)
                            </SelectItem>
                            <SelectItem value="Europe/London">
                              London (GMT)
                            </SelectItem>
                            <SelectItem value="Europe/Paris">
                              Paris (CET)
                            </SelectItem>
                            <SelectItem value="Asia/Tokyo">
                              Tokyo (JST)
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FieldError errors={[errors.timezone]} />
                      </Field>
                    )}
                  />
                </ResponsiveGrid>

                <ResponsiveGrid maxColumns="two" align="start">
                  <Controller
                    control={control}
                    name="theme"
                    render={({ field }) => (
                      <Field invalid={!!errors.theme}>
                        <FieldLabel htmlFor="theme" required>
                          Theme
                        </FieldLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                          name={field.name}
                        >
                          <SelectTrigger id="theme">
                            <SelectValue placeholder="Select theme" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="light">Light</SelectItem>
                            <SelectItem value="dark">Dark</SelectItem>
                            <SelectItem value="system">
                              System Default
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FieldDescription>
                          Choose your preferred color scheme
                        </FieldDescription>
                        <FieldError errors={[errors.theme]} />
                      </Field>
                    )}
                  />

                  <Controller
                    control={control}
                    name="notifications"
                    render={({ field }) => (
                      <Field invalid={!!errors.notifications}>
                        <FieldLabel htmlFor="notifications" required>
                          Notifications
                        </FieldLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                          name={field.name}
                        >
                          <SelectTrigger id="notifications">
                            <SelectValue placeholder="Select preference" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">
                              All Notifications
                            </SelectItem>
                            <SelectItem value="important">
                              Important Only
                            </SelectItem>
                            <SelectItem value="none">None</SelectItem>
                          </SelectContent>
                        </Select>
                        <FieldDescription>
                          Control what notifications you receive
                        </FieldDescription>
                        <FieldError errors={[errors.notifications]} />
                      </Field>
                    )}
                  />
                </ResponsiveGrid>
              </FieldGroup>
            </FieldSet>

            {/* Actions */}
            <div className="flex justify-end items-center pt-section border-t border-border mt-section">
              <Button type="submit" disabled={!isDirty || isSubmitting}>
                {isSubmitting ? "Updating Settings…" : "Save Changes"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
