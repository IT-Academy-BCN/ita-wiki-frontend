import { describe, it, expect } from "vitest";
import { resolveAsset } from "../resolveAsset";

describe("resolveAsset", () => {
  it("falls back to the original string for unknown files", () => {
    const unknown = "some/path/does-not-exist.png";
    expect(resolveAsset(unknown)).toBe(unknown);
  });
});
