import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router";
import { vi, describe, it, expect, beforeEach } from "vitest";
import FormCreateCodeConnect from "../FormCreate";
import { toast } from "sonner";

vi.mock("sonner", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

const mockNavigate = vi.fn();
vi.mock("react-router", async () => {
  const actual = await vi.importActual("react-router");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

vi.mock("../../../api/endPointCodeConnect", () => ({
  createCodeConnect: vi.fn(),
}));

const renderWithRouter = (ui: React.ReactElement) => {
  return render(<MemoryRouter>{ui}</MemoryRouter>);
};

const fillCompleteForm = async (user: ReturnType<typeof userEvent.setup>) => {
  const titleInput = screen.getByRole("textbox", { name: /títol/i });
  await user.type(titleInput, "Test Project");

  const descriptionTextarea = screen.getByRole("textbox", {
    name: /descripció/i,
  });
  await user.type(descriptionTextarea, "Test description");

  const reactCheckbox = screen.getByRole("checkbox", { name: /react/i });
  await user.click(reactCheckbox);

  const nodeCheckbox = screen.getByRole("checkbox", { name: /node/i });
  await user.click(nodeCheckbox);

  const devsFrontInput = screen.getByLabelText(
    /nombre de programadors frontend/i,
  ) as HTMLInputElement;
  fireEvent.change(devsFrontInput, { target: { value: "2" } });

  const devsBackInput = screen.getByLabelText(
    /nombre de programadors backend/i,
  ) as HTMLInputElement;
  fireEvent.change(devsBackInput, { target: { value: "2" } });

  const deadlineInput = screen.getByLabelText(
    /data límit d'inscripció/i,
  ) as HTMLInputElement;
  fireEvent.change(deadlineInput, { target: { value: "2025-11-20" } });

  const timeInput = screen.getByLabelText(
    /durada del projecte/i,
  ) as HTMLInputElement;
  fireEvent.change(timeInput, { target: { value: "2" } });

  const unitTimeSelect = screen.getByLabelText(/tipus durada/i);
  await user.selectOptions(unitTimeSelect, "month");

  await waitFor(() => {
    expect(devsFrontInput.value).toBe("2");
    expect(devsBackInput.value).toBe("2");
    expect(timeInput.value).toBe("2");
  });
};

describe("FormCreateCodeConnect", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("validateForm", () => {
    it("should show error when submitting empty form", async () => {
      const user = userEvent.setup();
      renderWithRouter(<FormCreateCodeConnect />);

      const submitButton = screen.getByRole("button", { name: /publicar/i });
      await user.click(submitButton);
    });

    it("should pass validation with all required fields filled correctly", async () => {
      const user = userEvent.setup();
      renderWithRouter(<FormCreateCodeConnect />);

      await fillCompleteForm(user);

      const submitButton = screen.getByRole("button", { name: /publicar/i });
      await user.click(submitButton);

      expect(toast.error).not.toHaveBeenCalledWith(
        "Completa tots els camps obligatoris.",
      );
    });
  });

  describe("handleSubmit", () => {
    // it("should navigate on successful submission", async () => {
    //   const user = userEvent.setup();
    //   renderWithRouter(<FormCreateCodeConnect />);

    //   await fillCompleteForm(user);

    //   const submitButton = screen.getByRole("button", { name: /publicar/i });
    //   await user.click(submitButton);

    //   await waitFor(() => {
    //     expect(mockNavigate).toHaveBeenCalledWith("/codeconnect");
    //   });
    // });

    it("should prevent form submission when validation fails", async () => {
      const user = userEvent.setup();
      renderWithRouter(<FormCreateCodeConnect />);

      const submitButton = screen.getByRole("button", { name: /publicar/i });
      await user.click(submitButton);

      expect(mockNavigate).not.toHaveBeenCalled();
    });
  });

  describe("Input handling", () => {
    it("should update title when typing", async () => {
      const user = userEvent.setup();
      renderWithRouter(<FormCreateCodeConnect />);

      const titleInput = screen.getByRole("textbox", {
        name: /títol/i,
      }) as HTMLInputElement;

      await user.type(titleInput, "My Test Title");

      expect(titleInput.value).toBe("My Test Title");
    });

    it("should update description when typing", async () => {
      const user = userEvent.setup();
      renderWithRouter(<FormCreateCodeConnect />);

      const descriptionTextarea = screen.getByRole("textbox", {
        name: /descripció/i,
      }) as HTMLTextAreaElement;

      await user.type(descriptionTextarea, "My test description");

      expect(descriptionTextarea.value).toBe("My test description");
    });

    it("should enforce title character limit of 65", async () => {
      const user = userEvent.setup();
      renderWithRouter(<FormCreateCodeConnect />);

      const titleInput = screen.getByRole("textbox", {
        name: /títol/i,
      }) as HTMLInputElement;

      const longTitle = "a".repeat(70);
      await user.type(titleInput, longTitle);

      expect(titleInput.value.length).toBe(65);
    });

    it("should update frontend dev count when typing valid number", async () => {
      const user = userEvent.setup();
      renderWithRouter(<FormCreateCodeConnect />);

      const devsFrontInput = screen.getByLabelText(
        /nombre de programadors frontend/i,
      ) as HTMLInputElement;

      await user.clear(devsFrontInput);
      await user.type(devsFrontInput, "5");

      expect(devsFrontInput.value).toBe("5");
    });

    it("should update backend dev count when typing valid number", async () => {
      const user = userEvent.setup();
      renderWithRouter(<FormCreateCodeConnect />);

      const devsBackInput = screen.getByLabelText(
        /nombre de programadors backend/i,
      ) as HTMLInputElement;

      await user.clear(devsBackInput);
      await user.type(devsBackInput, "3");

      expect(devsBackInput.value).toBe("3");
    });
  });

  describe("Navigation and UI", () => {
    it("should navigate back to code connect when clicking back link", async () => {
      const user = userEvent.setup();
      renderWithRouter(<FormCreateCodeConnect />);

      const backLink = screen.getByText(/tornar a code connect/i);
      await user.click(backLink);

      expect(mockNavigate).toHaveBeenCalledWith("/codeconnect");
    });
  });
});
