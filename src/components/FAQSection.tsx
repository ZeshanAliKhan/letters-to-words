import { useState } from "react";

const FAQ_DATA = [
  {
    question: "What does letters to words mean?",
    answer: "It means turning a group of letters into possible real words.",
  },
  {
    question: "Is this Letters to Words tool free?",
    answer: "Yes, it is completely free to use.",
  },
  {
    question: "Can I make words from random letters?",
    answer: "Yes, enter your letters and the tool will show possible words.",
  },
  {
    question: "Can I find words by length?",
    answer: "Yes, you can filter and browse words by length.",
  },
  {
    question: "Can I find words that start with a specific letter?",
    answer: "Yes, use the starts with filter.",
  },
  {
    question: "Can I find words that end with a specific letter?",
    answer: "Yes, use the ends with filter.",
  },
  {
    question: "Can I find words that contain specific letters?",
    answer: "Yes, use the contains filter.",
  },
  {
    question: "Does this tool support wildcards?",
    answer: "Yes, you can use ? as a wildcard letter.",
  },
  {
    question: "Does this tool work on mobile?",
    answer: "Yes, it works on mobile, tablet, and desktop browsers.",
  },
  {
    question: "Do I need to install anything?",
    answer: "No, the tool works online in your browser.",
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="letters-to-words-faq" className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
      <h2 className="text-2xl font-bold text-slate-900">Frequently asked questions</h2>
      <div className="mt-6 space-y-3">
        {FAQ_DATA.map((item, index) => {
          const isOpen = openIndex === index;

          return (
            <div key={item.question} className="overflow-hidden rounded-2xl border border-slate-200">
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="flex w-full items-center justify-between gap-4 bg-white px-5 py-4 text-left transition hover:bg-slate-50"
                aria-expanded={isOpen}
              >
                <span className="font-semibold text-slate-800">{item.question}</span>
                <span className={`text-lg text-slate-500 transition ${isOpen ? "rotate-45" : ""}`}>+</span>
              </button>
              {isOpen ? (
                <div className="border-t border-slate-200 px-5 py-4 text-sm leading-7 text-slate-600">{item.answer}</div>
              ) : null}
            </div>
          );
        })}
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: FAQ_DATA.map((item) => ({
              "@type": "Question",
              name: item.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: item.answer,
              },
            })),
          }),
        }}
      />
    </section>
  );
}
