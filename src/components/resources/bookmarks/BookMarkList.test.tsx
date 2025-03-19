import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import BookMarkList from "./BookMarkList"; // Asegúrate de que el nombre sea correcto
import { IntResource, IntBookmarkElement } from "../../../types";
import { useGetBookmarksList } from "../../../hooks/useBookmarks";
import { describe, it, expect, vi } from "vitest";
import { Mock } from "vitest";

// Mock de hooks
vi.mock("../../../hooks/useBookmarks", () => ({
  useGetBookmarksList: vi.fn(),
}));
vi.mock("../../../assets/edit.svg", () => ({
  default: "mocked-edit-icon",
}));

describe("BookMarkList Component", () => {
  const mockResources: IntResource[] = [
    {
      id: 1,
      title: "Resource 1",
      description: "Description 1",
      url: "http://example.com/1",
      github_id: 12345,
      category: "Node",
      theme: "Todos",
      type: "Video",
    },
    {
      id: 2,
      title: "Resource 2",
      description: "Description 2",
      url: "http://example.com/2",
      github_id: 12346,
      category: "React",
      theme: "Todos",
      type: "Cursos",
    },
  ];

  const mockBookmarks: IntBookmarkElement[] = [
    {
      id: 1,
      github_id: 4567,
      title: "Resource 1",
      description: "Description 1",
      url: "http://example.com/1",
    },
  ];

  it("should render the component and display the correct title", async () => {
    // Mock del hook useGetBookmarksList
    (useGetBookmarksList as Mock).mockReturnValue(mockBookmarks);

    render(
      <MemoryRouter>
        <BookMarkList resources={mockResources} />
      </MemoryRouter>,
    );

    const titleElement = screen.getByText("Lista de lectura");
    expect(titleElement).toBeInTheDocument();
  });

  it("should render 'No hay lista de recursos disponible' when there are no bookmarks", async () => {
    // Mock del hook useGetBookmarksList
    (useGetBookmarksList as Mock).mockReturnValue([]);

    render(
      <MemoryRouter>
        <BookMarkList resources={mockResources} />
      </MemoryRouter>,
    );

    expect(
      screen.getByText("No hay lista de recursos disponible"),
    ).toBeInTheDocument();
  });

  it("should render BookmarkComponent for each bookmark", async () => {
    // Mock del hook useGetBookmarksList
    (useGetBookmarksList as Mock).mockReturnValue(mockBookmarks);

    render(
      <MemoryRouter>
        <BookMarkList resources={mockResources} />
      </MemoryRouter>,
    );

    // Esperamos que el componente BookmarkComponent sea renderizado
    await waitFor(() => {
      expect(screen.getAllByRole("article")).toHaveLength(mockBookmarks.length);
      mockBookmarks.forEach((bookmark) => {
        // Verifica que la descripción esté presente
        expect(screen.getByText(bookmark.description)).toBeInTheDocument();
        // Verifica que el enlace tenga la URL correcta
        expect(screen.getByRole("link")).toHaveAttribute("href", bookmark.url);
      });
    });
  });

  it("should display the correct props in BookmarkComponent", async () => {
    // Mock del hook useGetBookmarksList
    (useGetBookmarksList as Mock).mockReturnValue(mockBookmarks);

    render(
      <MemoryRouter>
        <BookMarkList resources={mockResources} />
      </MemoryRouter>,
    );

    await waitFor(() => {
      mockBookmarks.forEach((bookmark) => {
        // Busca el título dentro del <h4> y verifica el enlace <a> correspondiente
        const titleElement = screen.getByText(bookmark.title);
        expect(titleElement.closest("a")).toHaveAttribute("href", bookmark.url);
      });
    });
  });
});
