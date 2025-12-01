import { describe, test, expect } from "vitest";
import { contentResourcesForm } from "./languagesLabels";

describe("contentResourcesForm Tests", () => {
  test("verifies each technology has the correct icon assigned", () => {
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

    iconLabelMap.forEach(({ label, iconName }, index) => {
      expect(contentResourcesForm[index].label).toBe(label);

      expect(typeof contentResourcesForm[index].icon).toBe("function");

      expect(
        contentResourcesForm[index].icon,
        `${label} should use ${iconName} icon`,
      ).toBeDefined();
    });
  });

  test("has correct length and all items have required properties", () => {
    expect(contentResourcesForm).toHaveLength(8);

    contentResourcesForm.forEach((item, index) => {
      expect(item).toHaveProperty("icon");
      expect(item).toHaveProperty("label");
      expect(typeof item.icon).toBe("function");
      expect(typeof item.label).toBe("string");
      expect(item.label.length).toBeGreaterThan(0);
    });
  });
});
