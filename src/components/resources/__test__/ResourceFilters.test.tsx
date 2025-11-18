import { render, screen, fireEvent, act } from "@testing-library/react";
import { ResourcesFilters } from "../ResourcesFilters";
import { resourceTypes } from "../../../data/resourceTypes";
import { asideContent } from "../../Layout/aside/asideContent";
import { describe, expect, vi, beforeEach, afterEach } from "vitest";
import "@testing-library/jest-dom";

const mockNavigate = vi.fn();
vi.mock("react-router", () => ({
  useLocation: () => ({ pathname: "/resources/JavaScript" }),
  useNavigate: () => mockNavigate,
  useParams: () => ({}),
}));

const mockToggleResourceType = vi.fn();
const mockToggleCategory = vi.fn();
const mockSetSelectedResourceTypes = vi.fn();
const mockSetSelectedTags = vi.fn();
const mockSetExpandedCategories = vi.fn();

vi.mock("../../../context/ResourcesFiltersContext", () => ({
  useResourcesFilters: () => ({
    selectedResourceTypes: [],
    selectedTags: [],
    expandedCategories: new Set(["JavaScript"]), // Match the current pathname
    toggleResourceType: mockToggleResourceType,
    toggleCategory: mockToggleCategory,
    setSelectedResourceTypes: mockSetSelectedResourceTypes,
    setSelectedTags: mockSetSelectedTags,
    setExpandedCategories: mockSetExpandedCategories,
  }),
}));

describe("ResourcesFilters", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.clearAllTimers();
  });

  it("renders filter headings", () => {
    render(<ResourcesFilters />);
    expect(screen.getByText("Filtros")).toBeInTheDocument();
    expect(screen.getByText("Llenguatge")).toBeInTheDocument();
    expect(screen.getByText("Tipo")).toBeInTheDocument();
  });

  it("renders all resource types as checkboxes", () => {
    render(<ResourcesFilters />);
    resourceTypes.forEach((type) => {
      expect(screen.getByText(type)).toBeInTheDocument();
    });
  });

  it("calls toggleResourceType when a resource type is clicked", () => {
    render(<ResourcesFilters />);
    const label = screen.getByText(resourceTypes[0]);
    act(() => {
      fireEvent.click(label);
    });
    expect(mockToggleResourceType).toHaveBeenCalledWith(resourceTypes[0]);
  });

  it("renders all aside categories", () => {
    render(<ResourcesFilters />);
    asideContent.forEach((item) => {
      expect(screen.getByText(item.label)).toBeInTheDocument();
    });
  });

  it("renders mobile version when isMobile prop is true", () => {
    const { container } = render(<ResourcesFilters isMobile={true} />);
    const mobileDiv = container.querySelector(".sm\\:hidden");
    expect(mobileDiv).toBeInTheDocument();
  });

  it("renders desktop version by default", () => {
    const { container } = render(<ResourcesFilters />);
    const desktopDiv = container.querySelector(".hidden");
    expect(desktopDiv).toBeInTheDocument();
  });

  it("calls navigate when clicking on an inactive category", () => {
    render(<ResourcesFilters />);
    const categoryLabel =
      asideContent.find((item) => item.label !== "JavaScript")?.label ||
      "React";
    const categoryButton = screen.getByText(categoryLabel);

    act(() => {
      fireEvent.click(categoryButton);
    });

    expect(mockNavigate).toHaveBeenCalledWith(
      `/resources/${encodeURIComponent(categoryLabel)}`,
      { replace: false },
    );
  });

  it("calls toggleCategory when clicking on the currently active category", () => {
    render(<ResourcesFilters />);
    const activeCategory = "JavaScript"; // Matches the mocked pathname
    const categoryButton = screen.getByText(activeCategory);

    act(() => {
      fireEvent.click(categoryButton);
    });

    expect(mockToggleCategory).toHaveBeenCalledWith(activeCategory);
    expect(mockNavigate).not.toHaveBeenCalled();
  });
});
