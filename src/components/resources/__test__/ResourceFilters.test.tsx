import { render, screen, fireEvent } from "@testing-library/react";
import { ResourcesFilters } from "../ResourcesFilters";
import { resourceTypes } from "../../../data/resourceTypes";
import { asideContent } from "../../Layout/aside/asideContent";

// Mock hooks and navigation
vi.mock("react-router", () => ({
  useLocation: () => ({ pathname: "/resources/JavaScript" }),
  useNavigate: () => vi.fn(),
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
    expandedCategories: new Set(),
    toggleResourceType: mockToggleResourceType,
    toggleCategory: mockToggleCategory,
    setSelectedResourceTypes: mockSetSelectedResourceTypes,
    setSelectedTags: mockSetSelectedTags,
    setExpandedCategories: mockSetExpandedCategories,
  }),
}));

describe("ResourcesFilters", () => {
  it("renders filter headings", () => {
    render(<ResourcesFilters />);
    expect(screen.getByText("Filtros")).toBeInTheDocument();
    expect(screen.getByText("Lenguaje")).toBeInTheDocument();
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
    fireEvent.click(label);
    expect(mockToggleResourceType).toHaveBeenCalledWith(resourceTypes[0]);
  });

  it("renders all aside categories", () => {
    render(<ResourcesFilters />);
    asideContent.forEach((item) => {
      expect(screen.getByText(item.label)).toBeInTheDocument();
    });
  });

  it("expands category on hover", () => {
    render(<ResourcesFilters />);
    const categoryLabel = asideContent[0].label;
    const categoryDiv = screen.getByText(categoryLabel).closest("div");
    fireEvent.mouseEnter(categoryDiv!);
    expect(mockSetExpandedCategories).toHaveBeenCalledWith(
      new Set([categoryLabel]),
    );
    fireEvent.mouseLeave(categoryDiv!);
    expect(mockSetExpandedCategories).toHaveBeenCalled();
  });
});
