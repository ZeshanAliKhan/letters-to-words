import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { defaultFilters, findWordsFromLetters } from "./lettersToWords";

describe("generated words.json integration", () => {
  it("finds real words from the generated dictionary", () => {
    const filePath = path.resolve(process.cwd(), "public", "words.json");
    const contents = fs.readFileSync(filePath, "utf8");
    const words = JSON.parse(contents) as string[];

    const results = findWordsFromLetters("aetcr", words, defaultFilters);

    expect(results).toContain("crate");
    expect(results).toContain("trace");
    expect(results).toContain("react");
    expect(results[0].length).toBeGreaterThanOrEqual(results[results.length - 1].length);
  }, 15000);
});
