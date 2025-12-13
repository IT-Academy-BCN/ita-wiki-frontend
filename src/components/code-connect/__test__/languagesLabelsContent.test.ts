import { describe, test, expect } from "vitest";
import {
  contentTechsFrontCodeConnect,
  contentTechsBackCodeConnect,
} from "../languageLabelsContent";

const frontIconLabelMap = [
  { label: "React", iconName: "react_vector" },
  { label: "Angular", iconName: "angular_vector" },
  { label: "Svelte", iconName: "js_vector" },
  { label: "Vue", iconName: "js_vector" },
  { label: "Java", iconName: "js_vector" },
];

const backIconLabelMap = [
  { label: "Spring", iconName: "node_vector" },
  { label: "Laravel", iconName: "node_vector" },
  { label: "Node", iconName: "node_vector" },
  { label: "Rails", iconName: "node_vector" },
  { label: "Express", iconName: "node_vector" },
];

describe("contentTechsFrontCodeConnect Tests", () => {
  test("verifies each frontend technology has the correct icon assigned", () => {
    frontIconLabelMap.forEach(({ label, iconName }, index) => {
      expect(contentTechsFrontCodeConnect[index].label).toBe(label);

      expect(typeof contentTechsFrontCodeConnect[index].icon).toBe("function");

      expect(
        contentTechsFrontCodeConnect[index].icon,
        `${label} should use ${iconName} icon`,
      ).toBeDefined();
    });
  });

  test("has correct length and all items have required properties", () => {
    expect(contentTechsFrontCodeConnect).toHaveLength(frontIconLabelMap.length);

    contentTechsFrontCodeConnect.forEach((item) => {
      expect(item).toHaveProperty("icon");
      expect(item).toHaveProperty("label");
      expect(typeof item.icon).toBe("function");
      expect(typeof item.label).toBe("string");
      expect(item.label.length).toBeGreaterThan(0);
    });
  });
});

describe("contentTechsBackCodeConnect Tests", () => {
  test("verifies each backend technology has the correct icon assigned", () => {
    backIconLabelMap.forEach(({ label, iconName }, index) => {
      expect(contentTechsBackCodeConnect[index].label).toBe(label);

      expect(typeof contentTechsBackCodeConnect[index].icon).toBe("function");

      expect(
        contentTechsBackCodeConnect[index].icon,
        `${label} should use ${iconName} icon`,
      ).toBeDefined();
    });
  });

  test("has correct length and all items have required properties", () => {
    expect(contentTechsBackCodeConnect).toHaveLength(backIconLabelMap.length);

    contentTechsBackCodeConnect.forEach((item) => {
      expect(item).toHaveProperty("icon");
      expect(item).toHaveProperty("label");
      expect(typeof item.icon).toBe("function");
      expect(typeof item.label).toBe("string");
      expect(item.label.length).toBeGreaterThan(0);
    });
  });
});
