import { caseStepIndex, caseSteps, type CaseStatus } from "@/lib/cases";

function choiceLabel(status: CaseStatus) {
  if (status === "accepted_buy") return "Valgte salg til oss";
  if (status === "accepted_sell" || status === "listed") return "Valgte at vi selger";
  if (status === "declined") return "Takket nei";
  return caseSteps[4];
}

export function CaseProgress({ status }: { status: CaseStatus }) {
  const current = caseStepIndex(status);
  const steps = (status === "declined" ? caseSteps.slice(0, 5) : caseSteps).map((step, index) =>
    index === 4 ? choiceLabel(status) : step,
  );

  return (
    <div>
      <p className="text-sm text-stone-dark">
        Steg {current + 1} av {steps.length}
      </p>
      <ol className="mt-3 grid gap-2 sm:grid-flow-col sm:auto-cols-fr">
        {steps.map((step, index) => {
          const done = index < current;
          const active = index === current;
          return (
            <li
              key={step}
              aria-current={active ? "step" : undefined}
              className={`flex items-center gap-3 border-t-4 pt-2 text-sm sm:flex-col sm:items-start sm:gap-1 ${
                active ? "border-brand font-semibold text-ink" : done ? "border-ink text-ink" : "border-line-light text-stone-dark"
              }`}
            >
              <span aria-hidden="true" className="tabular-nums">
                {done ? "✓" : index + 1}
              </span>
              <span>
                {step}
                {done ? <span className="sr-only"> (ferdig)</span> : null}
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
