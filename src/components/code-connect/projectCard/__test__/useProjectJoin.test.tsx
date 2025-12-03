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
      result.current.handleOpenModal({
        area: "frontend",
        index: 0,
        role: "Frontend Developer",
      });
    });

    expect(result.current.joinModalOpen).toBe(true);

    await act(async () => {
      await result.current.handleConfirmJoin();
    });

    expect(result.current.joinModalOpen).toBe(false);
    expect(result.current.isSlotPending("frontend", 0)).toBe(true);
  });

  it("accepts and rejects a pending contributor", async () => {
    const { result } = renderHook(() => useProjectJoin(projectId));

    act(() => {
      result.current.handleOpenModal({
        area: "backend",
        index: 1,
        role: "Backend Developer",
      });
    });

    await act(async () => {
      await result.current.handleConfirmJoin();
    });

    act(() => {
      result.current.handleOpenDecisionModal("backend", 1);
    });

    act(() => {
      result.current.handleAcceptContributor();
    });

    expect(result.current.isSlotAccepted("backend", 1)).toBe(true);

    act(() => {
      result.current.handleOpenDecisionModal("backend", 1);
    });

    act(() => {
      result.current.handleRejectContributor();
    });

    expect(result.current.isSlotPending("backend", 1)).toBe(false);
  });
});
