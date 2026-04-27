import { Filters } from "../utils/lettersToWords";

interface FilterPanelProps {
  filters: Filters;
  onChange: (filters: Filters) => void;
}

const LENGTH_OPTIONS = Array.from({ length: 14 }, (_, index) => index + 2);

export function FilterPanel({ filters, onChange }: FilterPanelProps) {
  const update = <K extends keyof Filters>(key: K, value: Filters[K]) => {
    onChange({ ...filters, [key]: value });
  };

  return (
    <section className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-700">Filters</h2>
        <button
          type="button"
          onClick={() =>
            onChange({
              startsWith: "",
              endsWith: "",
              contains: "",
              wordLength: "any",
              useAllLettersOnly: false,
            })
          }
          className="text-sm font-medium text-slate-600 transition hover:text-slate-900"
        >
          Reset filters
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        <div>
          <label htmlFor="starts-with" className="mb-2 block text-sm font-medium text-slate-700">
            Starts with
          </label>
          <input
            id="starts-with"
            type="text"
            value={filters.startsWith}
            onChange={(event) => update("startsWith", event.target.value.replace(/[^a-z]/gi, "").toLowerCase())}
            className="h-11 w-full rounded-xl border border-slate-300 bg-white px-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            placeholder="ex"
          />
        </div>

        <div>
          <label htmlFor="contains" className="mb-2 block text-sm font-medium text-slate-700">
            Contains
          </label>
          <input
            id="contains"
            type="text"
            value={filters.contains}
            onChange={(event) => update("contains", event.target.value.replace(/[^a-z]/gi, "").toLowerCase())}
            className="h-11 w-full rounded-xl border border-slate-300 bg-white px-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            placeholder="ar"
          />
        </div>

        <div>
          <label htmlFor="ends-with" className="mb-2 block text-sm font-medium text-slate-700">
            Ends with
          </label>
          <input
            id="ends-with"
            type="text"
            value={filters.endsWith}
            onChange={(event) => update("endsWith", event.target.value.replace(/[^a-z]/gi, "").toLowerCase())}
            className="h-11 w-full rounded-xl border border-slate-300 bg-white px-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            placeholder="ed"
          />
        </div>

        <div>
          <label htmlFor="word-length" className="mb-2 block text-sm font-medium text-slate-700">
            Word length
          </label>
          <select
            id="word-length"
            value={filters.wordLength === "any" ? "any" : String(filters.wordLength)}
            onChange={(event) =>
              update("wordLength", event.target.value === "any" ? "any" : Number.parseInt(event.target.value, 10))
            }
            className="h-11 w-full rounded-xl border border-slate-300 bg-white px-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
          >
            <option value="any">Any length</option>
            {LENGTH_OPTIONS.map((length) => (
              <option key={length} value={length}>
                {length} letters
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-end">
          <label className="flex h-11 w-full items-center gap-3 rounded-xl border border-slate-300 bg-white px-3 text-sm text-slate-800">
            <input
              type="checkbox"
              checked={filters.useAllLettersOnly}
              onChange={(event) => update("useAllLettersOnly", event.target.checked)}
              className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
            />
            Use all letters only
          </label>
        </div>
      </div>
    </section>
  );
}
