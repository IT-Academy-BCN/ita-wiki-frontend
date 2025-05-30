import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import TagInput from "../../create-resources/TagInput";
import { Tag } from "../../../../types";
import { formatText } from "../../../../utils/formatText";

const mockTags: Tag[] = [
  {
    id: 1,
    name: "React",
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },
  {
    id: 2,
    name: "JavaScript",
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },
  {
    id: 3,
    name: "CSS",
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },
];

vi.mock("../../../../api/endPointTags", () => ({
  getTags: vi.fn(() => Promise.resolve(mockTags)),
}));

describe("TagInput component", () => {
  it("muestra los tags disponibles al hacer focus", async () => {
    const setSelectedTags = vi.fn();
  
    render(<TagInput selectedTags={[]} setselectedTags={setSelectedTags} />);
  
    await waitFor(() => {
      expect(screen.getByPlaceholderText("Escribe un tag...")).toBeInTheDocument();
    });
  
    const input = screen.getByPlaceholderText("Escribe un tag...");
  
    fireEvent.focus(input);
    expect(await screen.findByText(formatText("React"))).toBeInTheDocument();
    expect(await screen.findByText(formatText("JavaScript"))).toBeInTheDocument();
    expect(await screen.findByText(formatText("CSS"))).toBeInTheDocument();
  });

  it("filtra los tags al escribir en el input", async () => {
    const setSelectedTags = vi.fn();
  
    render(<TagInput selectedTags={[]} setselectedTags={setSelectedTags} />);

    await waitFor(() => {
      expect(screen.getByPlaceholderText("Escribe un tag...")).toBeInTheDocument();
    });
  
    const input = screen.getByPlaceholderText("Escribe un tag...");
  
    fireEvent.focus(input);

    await screen.findByText("React");
  
    fireEvent.change(input, { target: { value: "Re" } });
  
    await waitFor(() => {
      expect(screen.getByText("React")).toBeInTheDocument();
      expect(screen.queryByText("CSS")).not.toBeInTheDocument();
    });
  });
  
  

  it("agrega un tag al hacer clic en la opción", async () => {
    const setSelectedTags = vi.fn();
  
    render(<TagInput selectedTags={[]} setselectedTags={setSelectedTags} />);
  
    const input = await screen.findByPlaceholderText("Escribe un tag...");
    fireEvent.focus(input);
  
    const tagOption = await screen.findByText(formatText("React"));
    fireEvent.click(tagOption);
    expect(setSelectedTags).toHaveBeenCalledWith([
      {
        id: 1,
        name: "React",
        created_at: "2024-01-01T00:00:00Z",
        updated_at: "2024-01-01T00:00:00Z",
      },
    ]);
  });
  
});
