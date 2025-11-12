import { render, screen } from "@testing-library/react";
import ContentTypeBadge from "../ContentTypeBadge";
import { resourceTypes } from "../../../data/resourceTypes";

describe("ContentTypeBadge", () => {
  it("renders the correct type text for each resource type", () => {
    resourceTypes.forEach((type) => {
      render(<ContentTypeBadge type={type} />);
      expect(screen.getByText(type)).toBeInTheDocument();
    });
  });

  it("renders the correct icon for each resource type", () => {
    resourceTypes.forEach((type) => {
      render(<ContentTypeBadge type={type} />);
      const img = screen.getByAltText(`${type} icon`);
      expect(img).toBeInTheDocument();
      expect(img).toHaveAttribute("src");
    });
  });

  it("applies the correct size to the icon", () => {
    render(<ContentTypeBadge type="Vídeo" size={16} />);
    const img = screen.getByAltText("Vídeo icon");
    expect(img).toHaveAttribute("width", "16");
    expect(img).toHaveAttribute("height", "16");
  });

  it("does not render an icon if type is invalid", () => {
    // @ts-expect-error: purposely passing invalid type
    render(<ContentTypeBadge type="InvalidType" />);
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
    expect(screen.getByText("InvalidType")).toBeInTheDocument();
  });
});
