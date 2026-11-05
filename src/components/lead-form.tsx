"use client";

import { useActionState, useId } from "react";
import { submitLead, type LeadState } from "@/app/actions/lead";
import { buttonClasses } from "@/components/button-link";
import type { LeadFormConfig, LeadField } from "@/content/forms";

const initialState: LeadState = { status: "idle", message: "", fieldErrors: {} };

const toneStyles = {
  dark: {
    label: "text-paper",
    muted: "text-stone",
    input: "border-line-dark bg-ink text-paper placeholder:text-stone/70 focus:border-paper",
    error: "text-brand-bright",
    errorBorder: "border-brand-bright",
  },
  light: {
    label: "text-ink",
    muted: "text-stone-dark",
    input: "border-line-light bg-surface text-ink placeholder:text-stone-dark/70 focus:border-ink",
    error: "text-brand-deep",
    errorBorder: "border-brand-deep",
  },
} as const;

type Tone = keyof typeof toneStyles;

type LeadFormProps = {
  config: LeadFormConfig;
  tone?: Tone;
};

export function LeadForm({ config, tone = "light" }: LeadFormProps) {
  const [state, formAction, pending] = useActionState(submitLead.bind(null, config.kind), initialState);
  const formId = useId();
  const styles = toneStyles[tone];

  if (state.status === "success") {
    return (
      <div role="status" className="flex min-h-64 flex-col justify-center gap-5 border-l-4 border-brand pl-6">
        <p className="font-display text-display-md">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={formAction} noValidate className="grid grid-cols-2 gap-x-4 gap-y-5">
      {config.fields.map((field) => (
        <Field
          key={field.name}
          field={field}
          id={`${formId}-${field.name}`}
          error={state.fieldErrors[field.name]}
          defaultValue={state.values?.[field.name] ?? ""}
          tone={tone}
        />
      ))}

      <div aria-hidden="true" className="hidden">
        <label htmlFor={`${formId}-firma`}>Firma</label>
        <input id={`${formId}-firma`} name="firma" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="col-span-2 flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
        <button type="submit" disabled={pending} className={`${buttonClasses("primary")} disabled:opacity-60`}>
          {pending ? "Sender …" : config.submitLabel}
        </button>
        <p aria-live="polite" className={`text-sm ${state.status === "error" ? styles.error : styles.muted}`}>
          {state.message}
        </p>
      </div>
    </form>
  );
}

type FieldProps = {
  field: LeadField;
  id: string;
  error?: string;
  defaultValue: string;
  tone: Tone;
};

function Field({ field, id, error, defaultValue, tone }: FieldProps) {
  const styles = toneStyles[tone];
  const base = `w-full rounded-control border-2 px-4 py-3 text-base outline-none transition-colors ${styles.input} ${
    error ? styles.errorBorder : ""
  }`;
  const errorId = `${id}-feil`;
  const shared = {
    id,
    name: field.name,
    required: field.required,
    defaultValue,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error ? errorId : undefined,
  };

  return (
    <div className={field.span === "half" ? "col-span-2 sm:col-span-1" : "col-span-2"}>
      <label htmlFor={id} className={`mb-2 block text-sm font-semibold ${styles.label}`}>
        {field.label}
        {field.required ? <span aria-hidden="true" className="text-brand"> *</span> : null}
      </label>
      {field.type === "select" ? (
        <select {...shared} className={base}>
          <option value="" disabled>
            Velg …
          </option>
          {field.options?.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      ) : field.type === "textarea" ? (
        <textarea {...shared} rows={3} placeholder={field.placeholder} className={base} />
      ) : (
        <input
          {...shared}
          type={field.type}
          placeholder={field.placeholder}
          autoComplete={field.autoComplete}
          inputMode={field.inputMode}
          className={base}
        />
      )}
      {error ? (
        <p id={errorId} className={`mt-2 text-sm ${styles.error}`}>
          {error}
        </p>
      ) : null}
    </div>
  );
}
