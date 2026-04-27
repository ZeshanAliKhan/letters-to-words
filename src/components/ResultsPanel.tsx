import { groupWordsByLength } from "../utils/lettersToWords";

interface ResultsPanelProps {
  words: string[];
  hasSearched: boolean;
  isSearching: boolean;
  input: string;
  onCopy: () => void;
  copied: boolean;
}

export function ResultsPanel({ words, hasSearched, isSearching, input, onCopy, copied }: ResultsPanelProps) {
  if (!hasSearched) {
    return (
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
        <div className="flex min-h-[220px] flex-col items-center justify-center text-center text-slate-500">
          <div className="mb-4 text-5xl font-semibold text-slate-300">A-Z</div>
          <h2 className="text-xl font-semibold text-slate-900">Enter letters to start</h2>
          <p className="mt-2 max-w-xl text-sm leading-7 text-slate-600">
            Type letters such as <strong>aetcr</strong>, click <strong>Find Words</strong>, and the tool will show possible English words grouped by length.
          </p>
        </div>
      </section>
    );
  }

  if (isSearching) {
    return (
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
        <div className="flex min-h-[220px] flex-col items-center justify-center text-center text-slate-500">
          <div className="mb-4 h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-blue-500" />
          <h2 className="text-xl font-semibold text-slate-900">Finding words</h2>
          <p className="mt-2 text-sm text-slate-600">Checking the dictionary against your letters now.</p>
        </div>
      </section>
    );
  }

  if (words.length === 0) {
    return (
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
        <div className="flex min-h-[220px] flex-col items-center justify-center text-center text-slate-500">
          <div className="mb-4 text-5xl font-semibold text-slate-300">?</div>
          <h2 className="text-xl font-semibold text-slate-900">No words found</h2>
          <p className="mt-2 max-w-xl text-sm leading-7 text-slate-600">
            We could not build valid words from <strong>{input}</strong> with the current filters. Try removing a filter, changing one letter, or using a wildcard.
          </p>
        </div>
      </section>
    );
  }

  const groups = groupWordsByLength(words);

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Words from your letters</h2>
          <p className="mt-1 text-sm text-slate-600">
            {words.length} total word{words.length === 1 ? "" : "s"} found from <strong>{input}</strong>
          </p>
        </div>
        <button
          type="button"
          onClick={onCopy}
          className="inline-flex items-center justify-center rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
        >
          {copied ? "Copied" : "Copy Results"}
        </button>
      </div>

      <div className="space-y-8">
        {groups.map((group) => (
          <div key={group.length}>
            <div className="mb-3 flex items-center gap-3">
              <h3 className="text-lg font-semibold text-slate-900">{group.length} Letter Words</h3>
              <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                {group.words.length} result{group.words.length === 1 ? "" : "s"}
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {group.words.map((word) => (
                <span
                  key={`${group.length}-${word}`}
                  className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-800 shadow-sm"
                >
                  {word}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
