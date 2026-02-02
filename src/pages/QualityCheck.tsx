import { PageHeader } from "@/components/common/PageHeader";
import {
  ChecklistCard,
  ChecklistCardHeader,
  ChecklistCardTitle,
  ChecklistCardDescription,
  ChecklistCardContent,
  ChecklistCardItem,
} from "@/components/common/ChecklistCard";
import { Link } from "@/components/common/Link";

export function QualityCheckPage() {
  return (
    <div className="space-y-section container p-inset-2xl">
      <PageHeader
        pageTitle="Quality Check & Changelog"
        pageDescription="Polish validation, accessibility self-audit, and design system updates."
      />

      <div className="space-y-section">
        <div className="space-y-stack">
          <p>
            The overall direction of the brand kit has been realizing where
            development speed, efficiency, and consistency could be improved
            with a refined token system where the token names are intuitive
            about what gets used where.
          </p>
          <p>
            On top of that, checks have been made to update to meet WCAG AA as
            things gets edited. Also have moved from hard-coded sizes to rem so
            everything can rescale responsively.
          </p>
        </div>
        {/* Basic Checklist */}
        <ChecklistCard>
          <ChecklistCardHeader>
            <ChecklistCardTitle>UI Polish Rules</ChecklistCardTitle>
          </ChecklistCardHeader>
          <ChecklistCardContent>
            <ChecklistCardItem checked>
              Update classNames on pages as they get updated. Mostly watch for
              size-based tokens, then color misuse, then styling that doesn't
              follow brand kit system.
            </ChecklistCardItem>
            <ChecklistCardItem checked>
              Update components that look off when updating a page (if the
              component will likely be reused elsewhere or possibly repurposed
              for future uses).
            </ChecklistCardItem>
            <ChecklistCardItem checked>
              Keep an eye on browser console and axe devTools when
              updating/creating any page to watch for issues as they arise.
            </ChecklistCardItem>
            <ChecklistCardItem checked>
              Watch out for anything that looks "off" and check Elements &gt;
              Computed if needed to get things consistent across primitives and
              composed components
            </ChecklistCardItem>
            <ChecklistCardItem checked>
              Refer to brand kit doc render if unsure on "right call" for
              styling
            </ChecklistCardItem>
          </ChecklistCardContent>
        </ChecklistCard>

        {/* Component Migration */}
        <ChecklistCard>
          <ChecklistCardHeader>
            <ChecklistCardTitle>Accessibility Checks</ChecklistCardTitle>
            <ChecklistCardDescription>
              The tests being used to make sure accessibility is baked in as a
              core, required feature and not as an afterthought
            </ChecklistCardDescription>
          </ChecklistCardHeader>

          <ChecklistCardContent>
            <ChecklistCardItem checked>
              WebAIM Contrast Checker for initial background/foreground semantic
              pairs
            </ChecklistCardItem>
            <ChecklistCardItem checked>
              <Link to="/contrast-check">Contrast Check</Link> too if tweaking
              values in index.css
            </ChecklistCardItem>
            <ChecklistCardItem checked>Add spacing utilities</ChecklistCardItem>
            <ChecklistCardItem checked>
              <strong>axe DevTools Full Page Scan</strong> completed with Best
              Practices on in mobile and desktop sizes (Aesthetic cards in
              playground have numerous contrast failures, and disable state
              cards on Contrast check have contrast failure)
            </ChecklistCardItem>
            <ChecklistCardItem checked>
              <strong>axe DevTools Full Page Scan</strong> completed with Best
              Practices on in mobile and desktop sizes (Aesthetic cards in
              playground have numerous contrast failures, and disable state
              cards on Contrast check have contrast failure)
            </ChecklistCardItem>
          </ChecklistCardContent>
        </ChecklistCard>
      </div>
    </div>
  );
}
