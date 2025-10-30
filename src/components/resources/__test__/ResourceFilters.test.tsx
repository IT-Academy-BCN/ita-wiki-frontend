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

  it("shows dropdown on hover without affecting context state", async () => {
    vi.useFakeTimers();

    render(<ResourcesFilters />);

    const nonActiveCategory = asideContent.find(
      (item) => item.label !== "JavaScript",
    );

    if (nonActiveCategory) {
      const categoryItem = screen
        .getByText(nonActiveCategory.label)
        .closest(".mb-2");

      act(() => {
        fireEvent.mouseEnter(categoryItem!);
      });

      expect(screen.getByText(nonActiveCategory.label)).toBeInTheDocument();

      const contextCallsForHovered =
        mockSetExpandedCategories.mock.calls.filter(
          (call) =>
            call[0] instanceof Set && call[0].has(nonActiveCategory.label),
        );
      expect(contextCallsForHovered.length).toBe(0);
    }

    vi.useRealTimers();
  });

  it("collapses dropdown after mouse leave with delay", async () => {
    vi.useFakeTimers();

    render(<ResourcesFilters />);
    const nonActiveCategory = asideContent.find(
      (item) => item.label !== "JavaScript",
    );

    if (nonActiveCategory) {
      const categoryItem = screen
        .getByText(nonActiveCategory.label)
        .closest(".mb-2");

      act(() => {
        fireEvent.mouseEnter(categoryItem!);
      });

      const dropdown = categoryItem!.querySelector('[class*="transition-all"]');
      expect(dropdown).toBeInTheDocument();

      act(() => {
        fireEvent.mouseLeave(categoryItem!);
      });

      act(() => {
        vi.advanceTimersByTime(150);
      });

      const collapsedDropdown =
        categoryItem!.querySelector('[class*="max-h-0"]');
      expect(collapsedDropdown).toBeInTheDocument();
    }

    vi.useRealTimers();
  });

  it("navigates and locks category open on click", () => {
    render(<ResourcesFilters />);
    const nonActiveCategory = asideContent.find(
      (item) => item.label !== "JavaScript",
    );

    if (nonActiveCategory) {
      const categoryLabel = screen.getByText(nonActiveCategory.label);
      const clickableDiv = categoryLabel.closest(
        '[class*="flex items-center justify-between"]',
      );

      act(() => {
        fireEvent.click(clickableDiv!);
      });

      expect(mockNavigate).toHaveBeenCalledWith(
        `/resources/${encodeURIComponent(nonActiveCategory.label)}`,
        { replace: false },
      );

      expect(mockToggleCategory).toHaveBeenCalled();
    }
  });

  it("shows active category as expanded from context", () => {
    render(<ResourcesFilters />);

    const activeCategory = screen.getByText("JavaScript");
    const activeCategoryContainer = activeCategory.closest(
      '[class*="flex items-center justify-between"]',
    );

    expect(activeCategoryContainer).toHaveClass("text-[var(--color-primary)]");

    const activeCategoryItem = activeCategory.closest(".mb-2");
    const icon = activeCategoryItem!.querySelector("svg");
    expect(icon).toBeInTheDocument();
  });

  it("toggles active category on click", () => {
    render(<ResourcesFilters />);
    const activeCategory = screen.getByText("JavaScript");
    const clickableDiv = activeCategory.closest(
      '[class*="flex items-center justify-between"]',
    );

    act(() => {
      fireEvent.click(clickableDiv!);
    });

    expect(mockToggleCategory).toHaveBeenCalledWith("JavaScript");
    expect(mockNavigate).not.toHaveBeenCalled();
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

  it("cleans up hover timeout on unmount", () => {
    vi.useFakeTimers();

    const { unmount } = render(<ResourcesFilters />);
    const categoryItem = screen
      .getByText(asideContent[0].label)
      .closest(".mb-2");

    act(() => {
      fireEvent.mouseEnter(categoryItem!);
      fireEvent.mouseLeave(categoryItem!);
    });

    unmount();

    expect(() => {
      act(() => {
        vi.advanceTimersByTime(150);
      });
    }).not.toThrow();

    vi.useRealTimers();
  });
});
