import { useState, type FormEvent, type ChangeEvent } from "react";

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
    <div className="max-w-md mx-auto p-6 bg-white text-stone-900 rounded-lg shadow-md">
      <div className="flex gap-2 mb-6">
        <button
          type="button"
          onClick={() => setMode("signin")}
          className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
            mode === "signin"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Sign In
        </button>
        <button
          type="button"
          onClick={() => setMode("signup")}
          className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
            mode === "signup"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Sign Up
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md ${
              errors.password ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}
        </div>

        {isSignUp && (
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium mb-1"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md ${
                errors.confirmPassword ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword}
              </p>
            )}
          </div>
        )}

        {!isSignUp && (
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
                className="rounded"
              />
              Remember me
            </label>
            <button
              type="button"
              className="text-sm text-blue-600 hover:underline"
            >
              Forgot password?
            </button>
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-2 px-4 rounded-md font-medium ${
            isSubmitting
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
        >
          {isSubmitting
            ? "Processing..."
            : isSignUp
              ? "Create Account"
              : "Sign In"}
        </button>
      </form>

      <p className="text-center text-sm text-gray-600 mt-4">
        {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
        <button
          type="button"
          onClick={toggleMode}
          className="text-blue-600 hover:underline font-medium"
        >
          {isSignUp ? "Sign in" : "Sign up"}
        </button>
      </p>
    </div>
  );
}
