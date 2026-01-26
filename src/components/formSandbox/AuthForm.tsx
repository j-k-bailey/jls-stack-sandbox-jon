import { useState, type FormEvent, type ChangeEvent } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/Card";

type AuthMode = "signin" | "signup";

interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
  rememberMe: boolean;
}

interface FormErrors {
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export default function AuthForm() {
  const [mode, setMode] = useState<AuthMode>("signin");
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    confirmPassword: "",
    rememberMe: false,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const isSignUp = mode === "signup";

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (isSignUp && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    console.log(`${isSignUp ? "Sign Up" : "Sign In"} data:`, formData);

    setIsSubmitting(false);
    alert(`${isSignUp ? "Account created" : "Logged in"} successfully!`);
  };

  const toggleMode = () => {
    setMode((prev) => (prev === "signin" ? "signup" : "signin"));
    setErrors({});
    setFormData({
      email: "",
      password: "",
      confirmPassword: "",
      rememberMe: false,
    });
  };

  return (
    <Card className="max-w-md mx-auto">
      <div className="flex gap-tight mb-compact">
        <Button
          type="button"
          onClick={() => setMode("signin")}
          variant={mode === "signin" ? "default" : "outline"}
          className="flex-1"
        >
          Sign In
        </Button>
        <Button
          type="button"
          onClick={() => setMode("signup")}
          variant={mode === "signup" ? "default" : "outline"}
          className="flex-1"
        >
          Sign Up
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-compact">
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
          <label htmlFor="password" className="block body-2 mb-tight">
            Password
          </label>
          <Input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            aria-invalid={!!errors.password}
            className={errors.password ? "border-error" : ""}
          />
          {errors.password && (
            <p className="text-warning caption mt-tight">{errors.password}</p>
          )}
        </div>

        {isSignUp && (
          <div>
            <label htmlFor="confirmPassword" className="block body-2 mb-tight">
              Confirm Password
            </label>
            <Input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              aria-invalid={!!errors.confirmPassword}
              className={errors.confirmPassword ? "border-error" : ""}
            />
            {errors.confirmPassword && (
              <p className="text-warning caption mt-tight">
                {errors.confirmPassword}
              </p>
            )}
          </div>
        )}

        {!isSignUp && (
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-tight body-2">
              <input
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
                className="rounded"
              />
              Remember me
            </label>
            <Button type="button" variant="link" className="p-0 h-auto">
              Forgot password?
            </Button>
          </div>
        )}

        <Button
          type="submit"
          semantic="primary"
          disabled={isSubmitting}
          className="w-full"
        >
          {isSubmitting
            ? "Processing..."
            : isSignUp
              ? "Create Account"
              : "Sign In"}
        </Button>
      </form>

      <p className="text-center body-2 mt-compact">
        {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
        <Button
          type="button"
          onClick={toggleMode}
          variant="link"
          semantic="primary"
          className="p-0 h-auto"
        >
          {isSignUp ? "Sign in" : "Sign up"}
        </Button>
      </p>
    </Card>
  );
}
