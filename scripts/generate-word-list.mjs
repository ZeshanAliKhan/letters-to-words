import fs from "node:fs";
import path from "node:path";
import words from "word-list-json";

// This build-time script keeps the tool free and backend-free.
// If you later want broader coverage, replace this source with another
// free English dictionary export and keep the output format as a JSON array.
const filteredWords = [...new Set(
  words
    .map((word) => word.trim().toLowerCase())
    .filter((word) => /^[a-z]+$/.test(word))
    .filter((word) => word.length >= 2 && word.length <= 15)
)].sort((a, b) => a.localeCompare(b));

const jsonOutputPath = path.join(process.cwd(), "public", "words.json");

fs.mkdirSync(path.dirname(jsonOutputPath), { recursive: true });
fs.writeFileSync(jsonOutputPath, JSON.stringify(filteredWords), "utf8");

console.log(`Generated JSON export at ${jsonOutputPath}`);
