import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { CodeConnectFiltersComponent } from "./CodeConnectFiltersComponent";

describe("CodeConnectFiltersComponent", () => {
  it("renders all filter buttons", () => {
    render(<CodeConnectFiltersComponent />);
    expect(screen.getByText("Java")).toBeInTheDocument();
    expect(screen.getByText("PHP")).toBeInTheDocument();
    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("Angular")).toBeInTheDocument();
  });

  it("changes selection when a button is clicked", () => {
    render(<CodeConnectFiltersComponent />);
    const javaButton = screen.getByText("Java");
    fireEvent.click(javaButton);
    expect(javaButton.getAttribute("aria-pressed")).toBe("true");
  });
});
