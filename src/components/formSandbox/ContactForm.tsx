import { useState, type FormEvent, type ChangeEvent } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitSuccess(false);

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setSubmitSuccess(true);

    // Reset form after success
    setTimeout(() => {
      setFormData({ name: "", email: "", message: "" });
      setSubmitSuccess(false);
    }, 3000);
  };

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Contact Us</CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-compact">
          <div>
            <label htmlFor="name" className="block body-2 mb-tight">
              Name
            </label>
            <Input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              aria-invalid={!!errors.name}
              className={errors.name ? "border-error" : ""}
            />
            {errors.name && (
              <p className="text-warning caption mt-tight">{errors.name}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block body-2 mb-tight">
              Email
            </label>
            <Input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              aria-invalid={!!errors.email}
              className={errors.email ? "border-error" : ""}
            />
            {errors.email && (
              <p className="text-warning caption mt-tight">{errors.email}</p>
            )}
          </div>

          <div>
            <label htmlFor="message" className="block body-2 mb-tight">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              aria-invalid={!!errors.message}
              className={`w-full px-compact py-compact bg-background text-foreground border rounded-lg transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] ${
                errors.message
                  ? "border-error aria-invalid:ring-error/20 aria-invalid:border-error"
                  : "border-input"
              }`}
            />
            {errors.message && (
              <p className="text-warning caption mt-tight">{errors.message}</p>
            )}
          </div>

          <Button
            type="submit"
            semantic="primary"
            disabled={isSubmitting}
            className="w-full"
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </Button>

          {submitSuccess && (
            <div className="p-compact bg-accent/10 border border-accent text-foreground rounded-lg">
              Message sent successfully!
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  );
}
