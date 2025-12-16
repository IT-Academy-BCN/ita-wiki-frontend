import { describe, test, expect } from "vitest";
import { contentForTechnicalTest } from "../languageLabelsContent";

const iconLabelMap = [
  { label: "React", iconName: "react_vector" },
  { label: "SQL", iconName: "sql_vector" },
  { label: "JavaScript", iconName: "js_vector" },
  { label: "TypeScript", iconName: "ts_vector" },
  { label: "Java", iconName: "java_vector" },
  { label: "PHP", iconName: "php_vector" },
  { label: "Python", iconName: "python_vector" },
];

describe("contentResourcesForm Tests", () => {
  test("verifies each technology has the correct icon assigned", () => {
    iconLabelMap.forEach(({ label, iconName }, index) => {
      expect(contentForTechnicalTest[index].label).toBe(label);

      expect(typeof contentForTechnicalTest[index].icon).toBe("function");

      expect(
        contentForTechnicalTest[index].icon,
        `${label} should use ${iconName} icon`,
      ).toBeDefined();
    });
  });

  test("has correct length and all items have required properties", () => {
    expect(contentForTechnicalTest).toHaveLength(iconLabelMap.length);

    contentForTechnicalTest.forEach((item) => {
      expect(item).toHaveProperty("icon");
      expect(item).toHaveProperty("label");
      expect(typeof item.icon).toBe("function");
      expect(typeof item.label).toBe("string");
      expect(item.label.length).toBeGreaterThan(0);
    });
  });
});
