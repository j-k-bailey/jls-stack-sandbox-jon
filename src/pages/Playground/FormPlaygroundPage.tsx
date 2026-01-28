import ContactForm from "@/components/formSandbox/ContactForm";
import AuthForm from "@/components/formSandbox/AuthForm";
import { PageHeader } from "@/components/common/PageHeader";

export function FormPlaygroundPage() {
  return (
    <div className="space-y-section">
      <PageHeader
        pageTitle="Forms"
        level="h2"
        pageDescription="Exploring common form patterns in React"
      />
      <div className="space-y-section container">
        {/* Pattern 1: Basic Contact Form */}
        <section className="space-y-compact">
          <div>
            <h2>1. Basic Contact Form</h2>
            <p>
              Single-step form with validation, error handling, and loading
              states
            </p>
          </div>
          <ContactForm />
        </section>
        {/* Pattern 2: Auth Toggle Form */}
        <section className="space-y-compact">
          <div>
            <h2>2. Login/Register Toggle</h2>
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
