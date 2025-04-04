import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router";
import BookMarkList from "./BookMarkList"; // Asegúrate de que la ruta es correcta
import { IntResource, IntBookmarkElement } from "../../../types";
import { useGetBookmarksList } from "../../../hooks/useBookmarks";
import { describe, it, expect, vi } from "vitest";
import { Mock } from "vitest";

// Mock del hook useGetBookmarksList
vi.mock("../../../hooks/useBookmarks", () => ({
  useGetBookmarksList: vi.fn(),
}));

// Mock de assets para los íconos (si es necesario)
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
      votes: 10,
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
      votes: 20,
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

  // it("should render the component and display the correct title", async () => {
  //   (useGetBookmarksList as Mock).mockReturnValue(mockBookmarks);

  //   render(
  //     <BrowserRouter>
  //       <BookMarkList resources={mockResources} />
  //     </BrowserRouter>,
  //   );

  //   const titleElement = screen.getByText("Lista de lectura");
  //   expect(titleElement).toBeInTheDocument();
  // });

  it("should render 'No hay lista de recursos disponible' when there are no bookmarks", async () => {
    (useGetBookmarksList as Mock).mockReturnValue([]);

    render(
      <BrowserRouter>
        <BookMarkList resources={mockResources} />
      </BrowserRouter>
    );

    expect(
      screen.getByText("No hay lista de recursos disponible")
    ).toBeInTheDocument();
  });

  it("should render BookmarkComponent for each bookmark", async () => {
    (useGetBookmarksList as Mock).mockReturnValue(mockBookmarks);

    render(
      <BrowserRouter>
        <BookMarkList resources={mockResources} />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getAllByRole("article")).toHaveLength(mockBookmarks.length);
      mockBookmarks.forEach((bookmark) => {
        expect(screen.getByText(bookmark.description)).toBeInTheDocument();
        expect(screen.getByRole("link")).toHaveAttribute("href", bookmark.url);
      });
    });
  });

  it("should display the correct props in BookmarkComponent", async () => {
    (useGetBookmarksList as Mock).mockReturnValue(mockBookmarks);

    render(
      <BrowserRouter>
        <BookMarkList resources={mockResources} />
      </BrowserRouter>
    );

    await waitFor(() => {
      mockBookmarks.forEach((bookmark) => {
        const titleElement = screen.getByText(bookmark.title);
        expect(titleElement.closest("a")).toHaveAttribute("href", bookmark.url);
      });
    });
  });
});
