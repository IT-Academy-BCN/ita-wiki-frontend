import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import CodeConnectFiltersComponent from "./CodeConnectFiltersComponent";

describe("CodeConnectFiltersComponent", () => {
  it("renders all filter buttons", () => {
    render(<CodeConnectFiltersComponent />);
    expect(screen.getByText("Java")).toBeInTheDocument();
    expect(screen.getByText("PHP")).toBeInTheDocument();
    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("Angular")).toBeInTheDocument();
  });

  it("changes selection when a button is clicked", async () => {
    render(<CodeConnectFiltersComponent />);
    const javaButton = screen.getByRole("button", { name: /java/i });
    fireEvent.click(javaButton);
    await waitFor(() =>
      expect(javaButton).toHaveAttribute("aria-pressed", "true"),
    );
  });
});
