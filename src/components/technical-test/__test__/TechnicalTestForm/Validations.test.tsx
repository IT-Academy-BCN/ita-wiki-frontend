import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TechnicalTestForm } from "../../TechnicalTestForm";
import { vi } from "vitest";
import "@testing-library/jest-dom";
import * as endPointTechnicalTests from "../../../../api/endPointTechnicalTests";

const mockNavigate = vi.fn();

vi.mock("react-router", () => ({
  useNavigate: () => mockNavigate,
}));

vi.mock("../../../../api/endPointTechnicalTests", () => ({
  createTechnicalTest: vi.fn(),
}));

vi.mock("sonner", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

interface Tag {
  id: number;
  name: string;
  category: string;
}

interface TagInputProps {
  selectedTags?: Tag[];
  setselectedTags: (tags: Tag[]) => void;
  selectedCategory?: string;
}

interface PdfUploadComponentProps {
  value?: File[];
  onFileSelect: (file: File | null) => void;
}

vi.mock("../../resources/create-resources/TagInput", () => ({
  default: ({ setselectedTags }: TagInputProps) => (
    <div data-testid="tag-input">
      <button
        onClick={() =>
          setselectedTags([{ id: 1, name: "Test Tag", category: "React" }])
        }
      >
        Add Tag
      </button>
    </div>
  ),
}));

vi.mock("../../atoms/PdfUploadComponent", () => ({
  default: ({ onFileSelect }: PdfUploadComponentProps) => (
    <div data-testid="pdf-upload">
      <button
        onClick={() =>
          onFileSelect(
            new File(["test content"], "test.pdf", {
              type: "application/pdf",
            }),
          )
        }
      >
        Upload PDF
      </button>
    </div>
  ),
}));

describe("TechnicalTestForm Validation", () => {
  it("shows validation error when title is empty", async () => {
    const user = userEvent.setup();
    render(<TechnicalTestForm />);

    const submitButton = screen.getByRole("button", { name: /Publicar/i });
    await user.click(submitButton);

    await waitFor(() => {
      const errorMessage = screen.getByText(
        /El títol ha de tenir almenys 10 caràcters/i,
      );
      expect(errorMessage).toBeInTheDocument();
    });
  });

  it("shows validation error when language is not selected", async () => {
    const user = userEvent.setup();
    render(<TechnicalTestForm />);

    const titleInput = screen.getAllByRole("textbox")[0];
    await user.type(titleInput, "Test Title with enough characters");

    const submitButton = screen.getByRole("button", { name: /Publicar/i });
    await user.click(submitButton);

    await waitFor(() => {
      const errorMessage = screen.getByText(
        /Si us plau, selecciona un llenguatge vàlid/i,
      );
      expect(errorMessage).toBeInTheDocument();
    });
  });

  it("shows validation error when duration is empty", async () => {
    const user = userEvent.setup();
    render(<TechnicalTestForm />);

    const titleInput = screen.getAllByRole("textbox")[0];
    await user.type(titleInput, "Test Title with enough characters");

    const reactButton = screen.getByRole("button", { name: /React/i });
    await user.click(reactButton);

    const submitButton = screen.getByRole("button", { name: /Publicar/i });
    await user.click(submitButton);

    await waitFor(() => {
      const errorMessage = screen.getByText(/La durada ha de ser un número/i);
      expect(errorMessage).toBeInTheDocument();
    });
  });

  it("does not submit form when difficulty is not selected", async () => {
    const user = userEvent.setup();
    const mockCreateTechnicalTest = vi.spyOn(
      endPointTechnicalTests,
      "createTechnicalTest",
    );

    render(<TechnicalTestForm />);

    const titleInput = screen.getAllByRole("textbox")[0];
    await user.type(titleInput, "Test Title with enough characters");

    const reactButton = screen.getByRole("button", { name: /React/i });
    await user.click(reactButton);

    const durationInput = screen.getByRole("spinbutton");
    await user.type(durationInput, "60");

    const submitButton = screen.getByRole("button", { name: /Publicar/i });
    await user.click(submitButton);

    // Verify form is not submitted when difficulty is missing
    expect(mockCreateTechnicalTest).not.toHaveBeenCalled();
  });

  it("shows validation error for invalid duration (negative number)", async () => {
    const user = userEvent.setup();
    render(<TechnicalTestForm />);

    const titleInput = screen.getAllByRole("textbox")[0];
    await user.type(titleInput, "Test Title with enough characters");

    const reactButton = screen.getByRole("button", { name: /React/i });
    await user.click(reactButton);

    const durationInput = screen.getByRole("spinbutton");
    await user.clear(durationInput);
    await user.type(durationInput, "-10");

    const difficultySelect = screen.getByRole("combobox");
    await user.selectOptions(difficultySelect, "Easy");

    const submitButton = screen.getByRole("button", { name: /Publicar/i });
    await user.click(submitButton);

    await waitFor(() => {
      const errorMessage = screen.getByText(/La durada ha de ser major que 0/i);
      expect(errorMessage).toBeInTheDocument();
    });
  });

  it("shows validation error for invalid duration (zero)", async () => {
    const user = userEvent.setup();
    render(<TechnicalTestForm />);

    const titleInput = screen.getAllByRole("textbox")[0];
    await user.type(titleInput, "Test Title with enough characters");

    const reactButton = screen.getByRole("button", { name: /React/i });
    await user.click(reactButton);

    const durationInput = screen.getByRole("spinbutton");
    await user.clear(durationInput);
    await user.type(durationInput, "0");

    const difficultySelect = screen.getByRole("combobox");
    await user.selectOptions(difficultySelect, "Easy");

    const submitButton = screen.getByRole("button", { name: /Publicar/i });
    await user.click(submitButton);

    await waitFor(() => {
      const errorMessage = screen.getByText(/La durada ha de ser major que 0/i);
      expect(errorMessage).toBeInTheDocument();
    });
  });

  it("does not submit form when validation fails", async () => {
    const user = userEvent.setup();
    const mockCreateTechnicalTest = vi.spyOn(
      endPointTechnicalTests,
      "createTechnicalTest",
    );

    render(<TechnicalTestForm />);

    const submitButton = screen.getByRole("button", { name: /Publicar/i });
    await user.click(submitButton);

    await waitFor(() => {
      const errorMessage = screen.getByText(
        /El títol ha de tenir almenys 10 caràcters/i,
      );
      expect(errorMessage).toBeInTheDocument();
    });

    expect(mockCreateTechnicalTest).not.toHaveBeenCalled();
  });
});
