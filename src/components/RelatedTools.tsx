const RELATED_TOOLS = [
  { title: "Unscramble Letters", href: "/unscramble-letters", description: "Placeholder internal link for another letter-solving page." },
  { title: "Word Unscrambler", href: "/word-unscrambler", description: "Placeholder internal link for a broader word helper page." },
  { title: "Random Word Generator", href: "/random-word-generator", description: "Placeholder internal link for random word ideas." },
  { title: "Word Counter", href: "/word-counter", description: "Placeholder internal link for counting words fast." },
  { title: "Character Counter", href: "/character-counter", description: "Placeholder internal link for character length checks." },
  { title: "Text Case Converter", href: "/text-case-converter", description: "Placeholder internal link for switching sentence, lower, and upper case." },
];

export function RelatedTools() {
  return (
    <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
      <h2 className="text-2xl font-bold text-slate-900">Related tools</h2>
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
