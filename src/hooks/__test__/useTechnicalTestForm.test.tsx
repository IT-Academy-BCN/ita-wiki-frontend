import { renderHook, waitFor } from "@testing-library/react";
import { useTechnicalTestForm } from "../useTechnicalTestForm";
import { vi, describe, it, expect, beforeEach } from "vitest";
import { toast } from "sonner";
import * as endPointTechnicalTests from "../../api/endPointTechnicalTests";
import type { TechnicalTestFormData } from "../../types/TechnicalTest";

const mockNavigate = vi.fn();

vi.mock("react-router", () => ({
  useNavigate: () => mockNavigate,
}));

vi.mock("sonner", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

vi.mock("../../api/endPointTechnicalTests", () => ({
  createTechnicalTest: vi.fn(),
}));

describe("useTechnicalTestForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("onSubmit with valid data", () => {
    it("calls API with correct FormData for text content type", async () => {
      const mockCreateTechnicalTest = vi.spyOn(
        endPointTechnicalTests,
        "createTechnicalTest",
      );
      mockCreateTechnicalTest.mockResolvedValueOnce(undefined);

      const { result } = renderHook(() => useTechnicalTestForm());

      const validData: TechnicalTestFormData = {
        title: "Valid Test Title",
        language: "React",
        duration: 60,
        difficulty: "medium",
        description: "This is a valid description",
        tags: [
          {
            id: 1,
            name: "Test Tag",
            created_at: "2024-01-01",
            updated_at: "2024-01-01",
          },
        ],
        contentType: "text",
        file: [],
      };

      await result.current.onSubmit(validData);

      await waitFor(() => {
        expect(mockCreateTechnicalTest).toHaveBeenCalledTimes(1);
      });

      const formDataArg = mockCreateTechnicalTest.mock.calls[0][0];
      expect(formDataArg).toBeInstanceOf(FormData);

      expect(formDataArg.get("title")).toBe("Valid Test Title");
      expect(formDataArg.get("language")).toBe("React");
      expect(formDataArg.get("duration")).toBe("60");
      expect(formDataArg.get("difficulty_level")).toBe("medium");
      expect(formDataArg.get("description")).toBe(
        "This is a valid description",
      );
      expect(formDataArg.getAll("tags[]")).toEqual(["1"]);
    });

    it("shows success toast and navigates on successful submission", async () => {
      const mockCreateTechnicalTest = vi.spyOn(
        endPointTechnicalTests,
        "createTechnicalTest",
      );
      mockCreateTechnicalTest.mockResolvedValueOnce(undefined);

      const { result } = renderHook(() => useTechnicalTestForm());

      const validData: TechnicalTestFormData = {
        title: "Valid Test Title",
        language: "TypeScript",
        duration: 30,
        difficulty: "hard",
        description: "Test description",
        tags: [],
        contentType: "text",
        file: [],
      };

      await result.current.onSubmit(validData);

      await waitFor(() => {
        expect(toast.success).toHaveBeenCalledWith(
          "Prova tècnica publicada amb èxit!",
        );
        expect(mockNavigate).toHaveBeenCalledWith(
          "/resources/technical-test/all-tech-tests",
        );
      });
    });

    it("handles tags array correctly when tags are present", async () => {
      const mockCreateTechnicalTest = vi.spyOn(
        endPointTechnicalTests,
        "createTechnicalTest",
      );
      mockCreateTechnicalTest.mockResolvedValueOnce(undefined);

      const { result } = renderHook(() => useTechnicalTestForm());

      const validData: TechnicalTestFormData = {
        title: "Valid Test Title",
        language: "Python",
        duration: 90,
        difficulty: "expert",
        description: "Test description",
        tags: [
          {
            id: 1,
            name: "Tag 1",
            created_at: "2024-01-01",
            updated_at: "2024-01-01",
          },
          {
            id: 2,
            name: "Tag 2",
            created_at: "2024-01-01",
            updated_at: "2024-01-01",
          },
          {
            id: 3,
            name: "Tag 3",
            created_at: "2024-01-01",
            updated_at: "2024-01-01",
          },
        ],
        contentType: "text",
        file: [],
      };

      await result.current.onSubmit(validData);

      await waitFor(() => {
        expect(mockCreateTechnicalTest).toHaveBeenCalledTimes(1);
      });

      const formDataArg = mockCreateTechnicalTest.mock.calls[0][0];
      expect(formDataArg.getAll("tags[]")).toEqual(["1", "2", "3"]);
    });
  });

  describe("handleCancel", () => {
    it("navigates to all technical tests page", () => {
      const { result } = renderHook(() => useTechnicalTestForm());

      result.current.handleCancel();

      expect(mockNavigate).toHaveBeenCalledWith(
        "/resources/technical-test/all-tech-tests",
      );
    });
  });
});
