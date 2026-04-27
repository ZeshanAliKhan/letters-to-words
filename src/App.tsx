import { useEffect, useMemo, useState } from "react";
import { Header } from "./components/Header";
import { FilterPanel } from "./components/FilterPanel";
import { ResultsPanel } from "./components/ResultsPanel";
import { SEOContent } from "./components/SEOContent";
import { FAQSection } from "./components/FAQSection";
import { RelatedTools } from "./components/RelatedTools";
import { Footer } from "./components/Footer";
import { getWordList, preloadWordList } from "./data/wordListClient";
import {
  createCopyText,
  defaultFilters,
  exampleInputs,
  Filters,
  findWordsFromLetters,
  MAX_LETTERS,
  MAX_WILDCARDS,
  sanitizeLetters,
  validateLettersInput,
} from "./utils/lettersToWords";

export default function App() {
  const [letters, setLetters] = useState("");
  const [filters, setFilters] = useState<Filters>(defaultFilters);
  const [results, setResults] = useState<string[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [copyState, setCopyState] = useState(false);
  const [wordListError, setWordListError] = useState("");

  const validation = useMemo(() => validateLettersInput(letters), [letters]);
  const sanitizedLetters = useMemo(() => sanitizeLetters(letters), [letters]);

  useEffect(() => {
    preloadWordList();
  }, []);

  async function handleSearch() {
    const nextInput = sanitizeLetters(letters);
    const nextValidation = validateLettersInput(nextInput);

    setLetters(nextInput);
    setHasSearched(true);
    setCopyState(false);

    if (!nextInput || nextValidation.error) {
      setResults([]);
      return;
    }

    setIsSearching(true);

    try {
      setWordListError("");
      const wordList = await getWordList();
      const nextResults = findWordsFromLetters(nextInput, wordList, filters);
      setResults(nextResults);
    } catch (error) {
      console.error(error);
      setWordListError("The dictionary could not be loaded right now. Please try again in a moment.");
      setResults([]);
    } finally {
      setIsSearching(false);
    }
  }

  function handleClear() {
    setLetters("");
    setFilters(defaultFilters);
    setResults([]);
    setHasSearched(false);
    setCopyState(false);
    setWordListError("");
  }

  async function handleCopyResults() {
    try {
      await navigator.clipboard.writeText(createCopyText(results));
      setCopyState(true);
      window.setTimeout(() => setCopyState(false), 1500);
    } catch {
      setCopyState(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Header />

      <main className="mx-auto max-w-6xl px-4 py-8 md:px-6">
        <section
          id="letters-to-words-tool"
          className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.08)]"
        >
          <div className="border-b border-slate-200 bg-gradient-to-br from-blue-50 via-indigo-50 to-white px-6 py-8 md:px-8">
            <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
              <div>
                <div className="mb-3 inline-flex rounded-full border border-blue-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-blue-700">
                  Make words from letters
                </div>
                <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
                  Find possible words from your letters
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600 md:text-base">
                  Enter letters such as <strong>aetcr</strong> and the tool will generate possible English words like <strong>crate</strong>, <strong>trace</strong>, <strong>react</strong>, and shorter matches built from the same letters.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {exampleInputs.map((example) => (
                    <button
                      key={example}
                      type="button"
                      onClick={() => {
                        setLetters(example);
                        setHasSearched(false);
                        setResults([]);
                        setCopyState(false);
                      }}
                      className="rounded-full border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:border-blue-300 hover:text-blue-700"
                    >
                      {example}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid gap-3 text-sm text-slate-600 sm:grid-cols-3 lg:grid-cols-1">
                <div className="rounded-2xl border border-slate-200 bg-white p-4">
                  <div className="font-semibold text-slate-900">Free and fast</div>
                  <div className="mt-1 text-xs leading-6">No signup, no install, and no backend required.</div>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white p-4">
                  <div className="font-semibold text-slate-900">Wildcard support</div>
                  <div className="mt-1 text-xs leading-6">Use ? for blank tiles or missing letters.</div>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white p-4">
                  <div className="font-semibold text-slate-900">Grouped results</div>
                  <div className="mt-1 text-xs leading-6">Scan words by length from longest to shortest.</div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 md:p-8">
            <label htmlFor="letters-input" className="mb-2 block text-sm font-semibold text-slate-800">
              Enter letters
            </label>
            <textarea
              id="letters-input"
              rows={3}
              value={letters}
              onChange={(event) => {
                setLetters(sanitizeLetters(event.target.value));
                setCopyState(false);
              }}
              placeholder="Type letters like aetcr or ca?"
              className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-4 text-lg font-medium text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
              aria-describedby="letters-help letters-error"
            />

            <div id="letters-help" className="mt-3 flex flex-wrap items-center gap-3 text-xs text-slate-500">
              <span>Only letters and ? are allowed.</span>
              <span>Maximum {MAX_LETTERS} characters.</span>
              <span>Maximum {MAX_WILDCARDS} wildcard letters.</span>
              <span className="rounded-full bg-slate-100 px-2.5 py-1 font-medium text-slate-700">
                {sanitizedLetters.length}/{MAX_LETTERS}
              </span>
            </div>

            {validation.error ? (
              <div id="letters-error" className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
                {validation.error}
              </div>
            ) : null}

            {wordListError ? (
              <div className="mt-4 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm leading-6 text-red-700">
                {wordListError}
              </div>
            ) : null}

            <div className="mt-6">
              <FilterPanel filters={filters} onChange={setFilters} />
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => void handleSearch()}
                disabled={!sanitizedLetters || Boolean(validation.error) || isSearching}
                className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSearching ? "Finding..." : "Find Words"}
              </button>
              <button
                type="button"
                onClick={handleClear}
                className="inline-flex items-center justify-center rounded-xl border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
              >
                Clear
              </button>
            </div>
          </div>
        </section>

        <div className="mt-8">
          <ResultsPanel
            words={results}
            hasSearched={hasSearched}
            isSearching={isSearching}
            input={sanitizedLetters}
            onCopy={handleCopyResults}
            copied={copyState}
          />
        </div>

        <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          <h2 className="text-2xl font-bold text-slate-900">Letters to Words in simple terms</h2>
          <p className="mt-4 text-sm leading-7 text-slate-600 md:text-base">
            Letters to Words helps you turn a loose set of letters into possible English words. It is practical for word games, general anagrams, spelling drills, vocabulary practice, and puzzle-solving sessions where you need quick letter combinations.
          </p>
        </section>

        <SEOContent />
        <FAQSection />
        <RelatedTools />
        <Footer />
      </main>
    </div>
  );
}
