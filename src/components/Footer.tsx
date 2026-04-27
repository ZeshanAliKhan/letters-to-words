export function Footer() {
  return (
    <footer className="mt-8 rounded-3xl bg-slate-900 p-6 text-slate-300 md:p-8">
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <h2 className="text-xl font-semibold text-white">Built for quick word checks</h2>
          <p className="mt-3 text-sm leading-7 text-slate-400">
            Letters to Words is designed for puzzle support, spelling practice, vocabulary exercises, and general word exploration. Some games may use different approved dictionaries, so treat the results as a strong helper rather than a universal final list.
          </p>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-white">Why the tool stays lightweight</h2>
          <p className="mt-3 text-sm leading-7 text-slate-400">
            The page uses a local generated word list, runs in the browser, and does not need a backend or paid API. That keeps hosting simple on Netlify and makes future updates predictable.
          </p>
        </div>
      </div>
      <div className="mt-6 border-t border-slate-800 pt-6 text-sm text-slate-500">
        &copy; {new Date().getFullYear()} Letters to Words. Free to use in your browser.
      </div>
    </footer>
  );
}
