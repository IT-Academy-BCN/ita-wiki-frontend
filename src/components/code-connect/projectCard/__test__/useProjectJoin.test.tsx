import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useProjectJoin } from "../hooks/useProjectJoin";

vi.mock("../../../../api/endPointJoinProject", () => ({
  joinProject: vi.fn().mockResolvedValue({ success: true }),
}));

describe("useProjectJoin", () => {
  const projectId = 1;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("opens join modal and adds pending slot on confirm", async () => {
    const { result } = renderHook(() => useProjectJoin(projectId));

    act(() => {
      result.current.joinModal.open({
        area: "frontend",
        index: 0,
        role: "Frontend Developer",
      });
    });

    expect(result.current.joinModal.isOpen).toBe(true);

    await act(async () => {
      await result.current.joinModal.confirm();
    });

    expect(result.current.joinModal.isOpen).toBe(false);
    expect(result.current.slots.isPending("frontend", 0)).toBe(true);
  });

  it("accepts and rejects a pending contributor", async () => {
    const { result } = renderHook(() => useProjectJoin(projectId));

    act(() => {
      result.current.joinModal.open({
        area: "backend",
        index: 1,
        role: "Backend Developer",
      });
    });

    await act(async () => {
      await result.current.joinModal.confirm();
    });

    act(() => {
      result.current.decisionModal.open("backend", 1);
      result.current.decisionModal.accept();
    });

    expect(result.current.slots.isAccepted("backend", 1)).toBe(true);

    act(() => {
      result.current.decisionModal.open("backend", 1);
      result.current.decisionModal.reject();
    });

    expect(result.current.slots.isPending("backend", 1)).toBe(false);
  });
});
