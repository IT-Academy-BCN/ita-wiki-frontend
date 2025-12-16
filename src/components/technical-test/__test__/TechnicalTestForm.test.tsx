import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TechnicalTestForm } from "../TechnicalTestForm";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

const navigateMock = vi.fn();
vi.mock("react-router", () => ({
  useNavigate: () => navigateMock,
}));

const toastErrorMock = vi.fn();
vi.mock("sonner", () => ({
  toast: {
    error: (msg: string) => toastErrorMock(msg),
    success: vi.fn(),
  },
}));

const createTechnicalTestMock = vi.fn();
vi.mock("../../../api/endPointTechnicalTests", () => ({
  createTechnicalTest: (fd: FormData) => createTechnicalTestMock(fd),
}));

vi.mock("../../Layout/aside/asideContent", () => ({
  asideContentForTechnicalTest: [
    { label: "JavaScript", icon: () => <span>JS</span> },
    { label: "TypeScript", icon: () => <span>TS</span> },
  ],
}));

vi.mock("../../ui/Container", () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

vi.mock("../../atoms/PdfUploadComponent", () => ({
  __esModule: true,
  default: () => <div>PdfUploadComponent</div>,
}));

let appendSpy: ReturnType<typeof vi.spyOn> | null = null;

beforeEach(() => {
  navigateMock.mockReset();
  toastErrorMock.mockReset();
  createTechnicalTestMock.mockReset();
  appendSpy = vi.spyOn(FormData.prototype, "append");
});

afterEach(() => {
  appendSpy?.mockRestore();
  appendSpy = null;
});

describe("TechnicalTestForm UI", () => {
  it("renders heading and back link", () => {
    render(<TechnicalTestForm />);
    expect(screen.getByText("Nova prova tècnica")).toBeTruthy();
    expect(screen.getByText("Tornar a proves tècniques")).toBeTruthy();
  });

  it("renders title input", () => {
    render(<TechnicalTestForm />);
    expect(screen.getByText("Títol *")).toBeTruthy();
  });

  it("renders language selection buttons", () => {
    render(<TechnicalTestForm />);
    expect(screen.getByText("Llenguatge *")).toBeTruthy();
    expect(screen.getByText("JavaScript")).toBeTruthy();
    expect(screen.getByText("TypeScript")).toBeTruthy();
  });

  it("renders content type toggle buttons", () => {
    render(<TechnicalTestForm />);
    expect(screen.getByRole("button", { name: "Text" })).toBeTruthy();
    expect(screen.getByRole("button", { name: "Fitxer" })).toBeTruthy();
  });

  it("renders Cancel and Publicar buttons", () => {
    render(<TechnicalTestForm />);
    expect(screen.getByRole("button", { name: "Cancel·lar" })).toBeTruthy();
    expect(screen.getByRole("button", { name: "Publicar" })).toBeTruthy();
  });

  it("renders duration input field", () => {
    render(<TechnicalTestForm />);
    expect(screen.getByText("Durada (minuts)")).toBeTruthy();
    expect(screen.getByRole("spinbutton")).toBeTruthy();
  });

  it("changes difficulty level when selecting from dropdown", async () => {
    const user = userEvent.setup();
    render(<TechnicalTestForm />);
    const difficultySelect = screen.getByLabelText("Dificultat");
    await user.selectOptions(difficultySelect, "hard");
    expect((difficultySelect as HTMLSelectElement).value).toBe("hard");
  });

  it("renders exercises section with 4 textareas", () => {
    render(<TechnicalTestForm />);
    expect(screen.getByText("Exercicis")).toBeTruthy();
    const exerciseTextareas = screen.getAllByPlaceholderText(/Exercici \d/);
    expect(exerciseTextareas).toHaveLength(4);
  });
});

describe("TechnicalTestForm behavior", () => {
  it("shows validation error when title is empty", async () => {
    const user = userEvent.setup();
    render(<TechnicalTestForm />);
    await user.click(screen.getByRole("button", { name: "Publicar" }));
    await waitFor(() => {
      expect(toastErrorMock).toHaveBeenCalled();
    });
  });

  it("submits and appends difficulty to FormData", async () => {
    const user = userEvent.setup();
    createTechnicalTestMock.mockResolvedValueOnce({ data: {} });

    render(<TechnicalTestForm />);

    const titleInput = document.querySelector(
      'input[type="text"]',
    ) as HTMLInputElement;
    await user.type(titleInput, "My Test");

    const languageButton = screen.getByRole("button", { name: /JavaScript/i });
    await user.click(languageButton);

    const durationInput = screen.getByRole("spinbutton");
    await user.clear(durationInput);
    await user.type(durationInput, "30");

    const difficultySelect = screen.getByLabelText("Dificultat");
    await user.selectOptions(difficultySelect, "hard");

    const descriptionTextarea = Array.from(
      document.querySelectorAll("textarea"),
    ).find((t) => !t.getAttribute("placeholder")) as HTMLTextAreaElement;

    await user.type(descriptionTextarea, "Some description");

    await user.click(screen.getByRole("button", { name: "Publicar" }));

    await waitFor(() => {
      expect(createTechnicalTestMock).toHaveBeenCalledTimes(1);
    });

    expect(appendSpy).toHaveBeenCalledWith("difficulty", "hard");
    expect(navigateMock).toHaveBeenCalled();
  });
});
