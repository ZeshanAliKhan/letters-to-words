const RELATED_TOOLS = [
  {
    title: "Unscramble Letters",
    href: "https://zeshan-unscramble-letters-377.netlify.app/",
    description: "Open the sister solver when you want another fast word-finding interface with grouped answers and filters.",
  },
  {
    title: "Word Unscrambler",
    href: "https://zeshan-word-unscrambler-876.netlify.app/",
    description: "Jump into the longer word helper for letter scoring, wildcard work, and another result layout.",
  },
  {
    title: "Live Site Directory",
    href: "https://zeshanalikhan.github.io/creator-app-hub-site/pages/site-directory.html",
    description: "Browse the wider network of live tools, GitHub Pages projects, mirrors, and supporting posts.",
  },
  {
    title: "Blooket Login Guide",
    href: "https://zeshanalikhan.github.io/blooket-login-guide/",
    description: "A live education-focused guide that fits the same quick-help style as this word tool.",
  },
  {
    title: "Google Block Breaker Guide",
    href: "https://zeshanalikhan.github.io/google-block-breaker-guide/",
    description: "Another lightweight puzzle-style page in the same publishing network.",
  },
  {
    title: "App Icon Generator",
    href: "https://zeshanalikhan.github.io/app-icon-generator-site/",
    description: "A separate browser tool in the network for people who also build or ship simple web utilities.",
  },
];

export function RelatedTools() {
  return (
    <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
      <h2 className="text-2xl font-bold text-slate-900">Related tools and live pages</h2>
      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {RELATED_TOOLS.map((tool) => (
          <a
            key={tool.title}
            href={tool.href}
            className="rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:border-blue-300 hover:bg-white hover:shadow-sm"
          >
            <h3 className="text-lg font-semibold text-slate-900">{tool.title}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">{tool.description}</p>
          </a>
        ))}
      </div>
    </section>
  );
}
