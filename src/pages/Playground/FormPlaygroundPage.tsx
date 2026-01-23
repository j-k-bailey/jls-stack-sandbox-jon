import ContactForm from "@/components/formSandbox/ContactForm";
import AuthForm from "@/components/formSandbox/AuthForm";
import { PageHeader } from "@/components/common/PageHeader";

export function FormPlaygroundPage() {
  return (
    <div className="section-spacing">
      {" "}
      {/* ✅ Changed from space-y-4 to section-spacing */}
      <PageHeader
        pageTitle="Forms"
        level="h2"
        pageDescription="Exploring common form patterns in React"
      />
      <div className="section-spacing">
        {" "}
        {/* ✅ Changed from space-y-16 to section-spacing */}
        {/* Pattern 1: Basic Contact Form */}
        <section className="section-spacing">
          <div>
            <h2>1. Basic Contact Form</h2>
            <p>
              {" "}
              {/* ✅ <p> tags are auto-styled, no need for text-slate-300 */}
              Single-step form with validation, error handling, and loading
              states
            </p>
          </div>
          <ContactForm />
        </section>
        {/* Pattern 2: Auth Toggle Form */}
        <section className="section-spacing">
          <div>
            <h2>2. Login/Register Toggle</h2>
            <p>
              {" "}
              {/* ✅ <p> tags are auto-styled */}
              Mode-switching form with conditional fields and state management
            </p>
          </div>
          <AuthForm />
        </section>
      </div>
    </div>
  );
}
