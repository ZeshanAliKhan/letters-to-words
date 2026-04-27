const BONUS_LINK = "https://www.profitablecpmratenetwork.com/j9f627innq?key=be46e17df9e34aa3b5b8e77e88a34740";

export function Header() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-8 md:px-6">
        <div className="max-w-3xl">
          <div className="mb-3 inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-700">
            Free browser tool
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
            Letters to Words
          </h1>
          <p className="mt-4 text-base leading-7 text-slate-600 md:text-lg">
            Turn random letters into real words for word games, anagrams, spelling practice, vocabulary learning, and puzzle solving. The tool runs fully in your browser and stays fast enough for mobile and desktop.
          </p>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href="#letters-to-words-tool"
              className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Jump to tool
            </a>
            <a
              href={BONUS_LINK}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="inline-flex items-center justify-center rounded-xl bg-amber-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-amber-600"
            >
              Explore Bonus Offers
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
