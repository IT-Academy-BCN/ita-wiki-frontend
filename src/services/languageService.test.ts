// src/services/languageService.test.ts

import { getLanguages } from "./languageService";

describe("languageService (mock version)", () => {
  test("should return a list of languages", async () => {
    const result = await getLanguages();

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
  });

  test("each language should have id, code and name", async () => {
    const result = await getLanguages();

    result.forEach((lang) => {
      expect(lang).toHaveProperty("id");
      expect(lang).toHaveProperty("code");
      expect(lang).toHaveProperty("name");
    });
  });

  test("should include some expected languages", async () => {
    const result = await getLanguages();
    const languageNames = result.map((lang) => lang.name);

    expect(languageNames).toContain("React");
    expect(languageNames).toContain("JavaScript");
    expect(languageNames).toContain("Python");
  });

  test("should simulate async delay", async () => {
    const start = Date.now();
    await getLanguages();
    const duration = Date.now() - start;

    // Roughly expect a delay of at least 250ms due to setTimeout(300)
    expect(duration).toBeGreaterThanOrEqual(250);
  });
});
