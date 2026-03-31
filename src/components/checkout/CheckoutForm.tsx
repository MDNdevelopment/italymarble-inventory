"use client";

import { useState, FormEvent } from "react";

interface CustomerFields {
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
}

interface CheckoutFormProps {
  onSubmit: (fields: CustomerFields) => void;
  loading: boolean;
  error: string | null;
}

const EMPTY: CustomerFields = { name: "", email: "", phone: "", company: "", message: "" };

export default function CheckoutForm({ onSubmit, loading, error }: CheckoutFormProps) {
  const [fields, setFields] = useState<CustomerFields>(EMPTY);

  function set(key: keyof CustomerFields) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setFields((prev) => ({ ...prev, [key]: e.target.value }));
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    onSubmit(fields);
  }

  const inputClass =
    "w-full bg-surface-variant border border-outline text-on-surface text-sm px-4 py-3 placeholder:text-on-surface-variant/50 focus:outline-none focus:border-primary transition-colors";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <h2 className="text-xs tracking-[0.2em] uppercase font-semibold text-on-surface-variant">
        Your Details
      </h2>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <label className="block text-xs text-on-surface-variant mb-1.5">
            Full Name <span className="text-error">*</span>
          </label>
          <input
            type="text"
            required
            value={fields.name}
            onChange={set("name")}
            placeholder="John Smith"
            className={inputClass}
          />
        </div>
        <div className="flex-1">
          <label className="block text-xs text-on-surface-variant mb-1.5">
            Email <span className="text-error">*</span>
          </label>
          <input
            type="email"
            required
            value={fields.email}
            onChange={set("email")}
            placeholder="john@example.com"
            className={inputClass}
          />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <label className="block text-xs text-on-surface-variant mb-1.5">Phone</label>
          <input
            type="tel"
            value={fields.phone}
            onChange={set("phone")}
            placeholder="+1 234 567 890"
            className={inputClass}
          />
        </div>
        <div className="flex-1">
          <label className="block text-xs text-on-surface-variant mb-1.5">Company</label>
          <input
            type="text"
            value={fields.company}
            onChange={set("company")}
            placeholder="Company name"
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label className="block text-xs text-on-surface-variant mb-1.5">Message</label>
        <textarea
          value={fields.message}
          onChange={set("message")}
          placeholder="Additional details, dimensions needed, timeline..."
          rows={4}
          className={`${inputClass} resize-none`}
        />
      </div>

      {error && (
        <p className="text-error text-sm border border-error/30 bg-error/10 px-4 py-3">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-primary text-on-primary text-xs tracking-[0.2em] uppercase font-semibold py-4 px-6 hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <span className="material-symbols-outlined text-sm animate-spin">progress_activity</span>
            Sending…
          </>
        ) : (
          "Submit Quote Request"
        )}
      </button>
    </form>
  );
}
