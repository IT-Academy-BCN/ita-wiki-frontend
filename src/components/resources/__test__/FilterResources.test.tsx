import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { describe, it, expect, vi } from "vitest";
import { FilterResources } from "../FilterResources";
import moock from "../../../moock/filters.json";

const { categories, types } = moock;

describe("FilterResources Component", () => {
  let selectedCategory = categories[0];
  let selectedTypes: string[] = [];

  const setSelectedCategory = vi.fn((category: string) => {
    selectedCategory = category;
  });

  const setSelectedTypes = vi.fn((updateFn) => {
    selectedTypes = updateFn(selectedTypes);
  });

  it("should render categories and types from filter.json", () => {
    render(
      <MemoryRouter>
        <FilterResources
          categories={categories}
          types={types}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedTypes={selectedTypes}
          setSelectedTypes={setSelectedTypes}
        />
      </MemoryRouter>,
    );

    categories.forEach((category) => {
      expect(screen.getByText(category)).toBeInTheDocument();
    });

    types.forEach((type) => {
      expect(screen.getByText(type)).toBeInTheDocument();
    });
  });

  it("should update selected category when clicked", () => {
    render(
      <MemoryRouter>
        <FilterResources
          categories={categories}
          types={types}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedTypes={selectedTypes}
          setSelectedTypes={setSelectedTypes}
        />
      </MemoryRouter>,
    );

    const eventCategory = screen.getByText("Eventos");
    fireEvent.click(eventCategory);

    expect(setSelectedCategory).toHaveBeenCalledWith("Eventos");
  });

  it("should toggle type checkboxes when clicked", () => {
    render(
      <MemoryRouter>
        <FilterResources
          categories={categories}
          types={types}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedTypes={selectedTypes}
          setSelectedTypes={setSelectedTypes}
        />
      </MemoryRouter>,
    );

    const videosCheckbox = screen.getByText("Videos")
      .previousSibling as HTMLInputElement;
    fireEvent.click(videosCheckbox);

    expect(setSelectedTypes).toHaveBeenCalled();
    expect(setSelectedTypes).toHaveBeenCalledWith(expect.any(Function));
  });
});
