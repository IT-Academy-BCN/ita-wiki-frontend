import { describe, test, expect } from "vitest";
import { contentTechsFrontCodeConnect } from "../languageLabelsContent";

const iconLabelMap = [
  { label: "Node", iconName: "node_vector" },
  { label: "React", iconName: "react_vector" },
  { label: "Angular", iconName: "angular_vector" },
  { label: "JavaScript", iconName: "js_vector" },
  { label: "Java", iconName: "java_vector" },
  { label: "PHP", iconName: "php_vector" },
  { label: "Data Science", iconName: "python_vector" },
  { label: "BBDD", iconName: "sql_vector" },
];

describe("contentResourcesForm Tests", () => {
  test("verifies each technology has the correct icon assigned", () => {
    iconLabelMap.forEach(({ label, iconName }, index) => {
      expect(contentTechsFrontCodeConnect[index].label).toBe(label);

      expect(typeof contentTechsFrontCodeConnect[index].icon).toBe("function");

      expect(
        contentTechsFrontCodeConnect[index].icon,
        `${label} should use ${iconName} icon`,
      ).toBeDefined();
    });
  });

  test("has correct length and all items have required properties", () => {
    expect(contentTechsFrontCodeConnect).toHaveLength(iconLabelMap.length);

    contentTechsFrontCodeConnect.forEach((item) => {
      expect(item).toHaveProperty("icon");
      expect(item).toHaveProperty("label");
      expect(typeof item.icon).toBe("function");
      expect(typeof item.label).toBe("string");
      expect(item.label.length).toBeGreaterThan(0);
    });
  });
});
