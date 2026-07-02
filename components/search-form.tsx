"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { createSearchId } from "@/lib/demand-scout/utils";

type SearchFormProps = {
  defaultValue?: string;
  submitLabel?: string;
  compact?: boolean;
};

export function SearchForm({
  defaultValue = "",
  submitLabel = "Run demand scan",
  compact = false,
}: SearchFormProps) {
  const router = useRouter();
  const [niche, setNiche] = useState(defaultValue);

  return (
    <form
      className={`glass-panel rounded-3xl ${
        compact ? "p-3" : "p-4 sm:p-5"
      }`}
      onSubmit={(event) => {
        event.preventDefault();

        const value = niche.trim();
        if (!value) {
          return;
        }

        const searchId = createSearchId(value);
        router.push(`/results/${searchId}?niche=${encodeURIComponent(value)}`);
      }}
    >
      <div
        className={`flex ${
          compact ? "flex-col gap-3 md:flex-row" : "flex-col gap-4 md:flex-row"
        }`}
      >
        <label className="flex-1">
          <span className="mb-2 block text-sm text-slate-400">
            Niche to analyze
          </span>
          <input
            value={niche}
            onChange={(event) => setNiche(event.target.value)}
            placeholder="e.g. home services dispatch, creator finance, B2B HVAC"
            className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/60"
          />
        </label>
        <button
          type="submit"
          className="mt-auto rounded-2xl bg-cyan-300 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200"
        >
          {submitLabel}
        </button>
      </div>
    </form>
  );
}
