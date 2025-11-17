import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import CodeConnectFiltersComponent from "./CodeConnectFiltersComponent";

describe("CodeConnectFiltersComponent", () => {
  it("renders all filter buttons", () => {
    render(<CodeConnectFiltersComponent selected={null} onChange={() => {}} />);
    expect(screen.getByText("Java")).toBeInTheDocument();
    expect(screen.getByText("PHP")).toBeInTheDocument();
    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("Angular")).toBeInTheDocument();
  });

  it("calls onChange with the selected label and supports controlled toggle", () => {
    const onChange = vi.fn();
    const { rerender } = render(
      <CodeConnectFiltersComponent selected={null} onChange={onChange} />,
    );

    const javaButton = screen.getByRole("button", { name: /java/i });
    expect(javaButton.getAttribute("aria-pressed")).toBe("false");

    fireEvent.click(javaButton);
    expect(onChange).toHaveBeenCalledWith("Java");

    rerender(
      <CodeConnectFiltersComponent selected="Java" onChange={onChange} />,
    );
    expect(javaButton.getAttribute("aria-pressed")).toBe("true");

    fireEvent.click(javaButton);
    expect(onChange).toHaveBeenCalledWith(null);

    rerender(
      <CodeConnectFiltersComponent selected={null} onChange={onChange} />,
    );
    expect(javaButton.getAttribute("aria-pressed")).toBe("false");
  });
});
