import ContactForm from "@/components/ui/formSandbox/ContactForm";
import AuthForm from "@/components/ui/formSandbox/AuthForm";
import { SimpleHeader } from "@/components/ui/simpleHeader";

export function FormPlaygroundPage() {
  return (
    <div className="space-y-4 text-slate-300">
      <SimpleHeader
        pageTitle="Forms"
        pageDescription="Exploring common form patterns in React"
      />

      <div className="space-y-16">
        {/* Pattern 1: Basic Contact Form */}
        <section>
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">1. Basic Contact Form</h2>
            <p>
              Single-step form with validation, error handling, and loading
              states
            </p>
          </div>
          <ContactForm />
        </section>

        {/* Pattern 2: Auth Toggle Form */}
        <section>
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">
              2. Login/Register Toggle
            </h2>
            <p>
              Mode-switching form with conditional fields and state management
            </p>
          </div>
          <AuthForm />
        </section>
      </div>
    </div>
  );
}
