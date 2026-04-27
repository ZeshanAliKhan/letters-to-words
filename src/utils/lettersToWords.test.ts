import { describe, expect, it } from "vitest";
import {
  createCopyText,
  defaultFilters,
  findWordsFromLetters,
  sanitizeLetters,
  validateLettersInput,
} from "./lettersToWords";

describe("lettersToWords", () => {
  it("sanitizes to lowercase letters and question marks only", () => {
    expect(sanitizeLetters("AETcr12$?")).toBe("aetcr?");
  });

  it("respects repeated letters", () => {
    const results = findWordsFromLetters("tap", ["tap", "papa", "apt", "pat"], defaultFilters);
    expect(results).toEqual(["apt", "pat", "tap"]);
  });

  it("supports wildcard matching", () => {
    const results = findWordsFromLetters("ca?", ["cat", "car", "cap", "camp"], defaultFilters);
    expect(results).toEqual(["cap", "car", "cat"]);
  });

  it("supports exact anagram mode", () => {
    const results = findWordsFromLetters("listen", ["listen", "silent", "tile", "tinsel"], {
      ...defaultFilters,
      useAllLettersOnly: true,
    });
    expect(results).toEqual(["listen", "silent", "tinsel"]);
  });

  it("supports filters and exact word length", () => {
    const results = findWordsFromLetters("aetcr", ["trace", "react", "crate", "race", "care"], {
      ...defaultFilters,
      startsWith: "tr",
      contains: "ac",
      endsWith: "e",
      wordLength: 5,
    });
    expect(results).toEqual(["trace"]);
  });

  it("returns a helpful validation error for too many letters", () => {
    expect(validateLettersInput("abcdefghijklmnop").error).toContain("up to 15 letters");
  });

  it("builds copy text from the visible results", () => {
    expect(createCopyText(["crate", "trace", "react"])).toBe("crate, trace, react");
  });
});
