export interface Filters {
  startsWith: string;
  endsWith: string;
  contains: string;
  wordLength: "any" | number;
  useAllLettersOnly: boolean;
}

export interface ValidationResult {
  error: string;
  wildcardCount: number;
}

export const MAX_LETTERS = 15;
export const MAX_WILDCARDS = 3;

export const defaultFilters: Filters = {
  startsWith: "",
  endsWith: "",
  contains: "",
  wordLength: "any",
  useAllLettersOnly: false,
};

export const exampleInputs = ["listen", "garden", "planet", "school", "orange"];

export function sanitizeLetters(value: string): string {
  return value.toLowerCase().replace(/[^a-z?]/g, "");
}

export function sanitizeFilterValue(value: string): string {
  return value.toLowerCase().replace(/[^a-z]/g, "");
}

export function validateLettersInput(value: string): ValidationResult {
  const wildcardCount = (value.match(/\?/g) || []).length;

  if (value.length > MAX_LETTERS) {
    return {
      error: `Please enter up to ${MAX_LETTERS} letters only so the browser stays fast.`,
      wildcardCount,
    };
  }

  if (wildcardCount > MAX_WILDCARDS) {
    return {
      error: `Please use no more than ${MAX_WILDCARDS} wildcard letters for one search.`,
      wildcardCount,
    };
  }

  return { error: "", wildcardCount };
}

function countLetters(value: string): Record<string, number> {
  const counts: Record<string, number> = {};

  for (const letter of value) {
    counts[letter] = (counts[letter] || 0) + 1;
  }

  return counts;
}

function canBuildWord(word: string, letters: string, wildcardCount: number): boolean {
  const available = countLetters(letters);
  const required = countLetters(word);
  let remainingWildcards = wildcardCount;

  for (const letter in required) {
    const availableCount = available[letter] || 0;
    const requiredCount = required[letter];

    if (availableCount >= requiredCount) {
      continue;
    }

    const deficit = requiredCount - availableCount;
    if (remainingWildcards < deficit) {
      return false;
    }

    remainingWildcards -= deficit;
  }

  return true;
}

export function groupWordsByLength(words: readonly string[]): Array<{ length: number; words: string[] }> {
  const map = new Map<number, string[]>();

  for (const word of words) {
    const existing = map.get(word.length) || [];
    existing.push(word);
    map.set(word.length, existing);
  }

  return [...map.entries()]
    .sort((a, b) => b[0] - a[0])
    .map(([length, groupedWords]) => ({
      length,
      words: groupedWords,
    }));
}

export function findWordsFromLetters(
  input: string,
  wordList: readonly string[],
  filters: Filters,
): string[] {
  const sanitized = sanitizeLetters(input);
  const validation = validateLettersInput(sanitized);

  if (!sanitized || validation.error) {
    return [];
  }

  const wildcardCount = validation.wildcardCount;
  const lettersOnly = sanitized.replace(/\?/g, "");
  const targetLength = filters.wordLength === "any" ? null : filters.wordLength;
  const startsWith = sanitizeFilterValue(filters.startsWith);
  const endsWith = sanitizeFilterValue(filters.endsWith);
  const contains = sanitizeFilterValue(filters.contains);

  const results: string[] = [];

  for (const sourceWord of wordList) {
    const word = sourceWord.toLowerCase();

    if (word.length < 2 || word.length > MAX_LETTERS) continue;
    if (targetLength !== null && word.length !== targetLength) continue;
    if (filters.useAllLettersOnly && word.length !== sanitized.length) continue;
    if (startsWith && !word.startsWith(startsWith)) continue;
    if (endsWith && !word.endsWith(endsWith)) continue;
    if (contains && !word.includes(contains)) continue;
    if (!canBuildWord(word, lettersOnly, wildcardCount)) continue;

    results.push(word);
  }

  return [...new Set(results)].sort((a, b) => {
    if (a.length !== b.length) return b.length - a.length;
    return a.localeCompare(b);
  });
}

export function createCopyText(words: readonly string[]): string {
  return words.join(", ");
}
