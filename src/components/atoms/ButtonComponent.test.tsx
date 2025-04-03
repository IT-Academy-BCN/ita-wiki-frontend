import { fireEvent, render, screen } from "@testing-library/react";
import ButtonComponent from "./ButtonComponent";
import { vi } from "vitest";
import closeIcon from "../../assets/close.svg";
import addIcon from "../../assets/add.svg";

describe("Render Button", () => {
  it("should render the button", () => {
    render(<ButtonComponent text="boton" />);
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
  });

  it("should have text: boton principal", () => {
    render(<ButtonComponent text="boton principal" />);
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("boton principal");
  });

  it("should call onClick when button is clicked", () => {
    const handleClick = vi.fn();

    render(<ButtonComponent text="Click me" onClick={handleClick} />);
    const button = screen.getByRole("button", { name: "Click me" });

    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
  it("should be submit button", () => {
    render(<ButtonComponent type="submit" text="send" />);
    const button = screen.getByRole("button");

    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("type", "submit");
  });
  it("should be reset button", () => {
    render(<ButtonComponent type="reset" text="send" />);
    const button = screen.getByRole("button");

    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("type", "reset");
  });
  it("should have primary classes", () => {
    render(<ButtonComponent variant="primary" text="send" />);
    const button = screen.getByRole("button");

    expect(button).toBeInTheDocument();
    expect(button).toHaveClass(
      "font-[600]",
      "min-w-[152px]",
      "text-white",
      "bg-primary",
      "hover:opacity-90"
    );
  });
  it("should have secondary classes", () => {
    render(<ButtonComponent variant="secondary" text="send" />);
    const button = screen.getByRole("button");

    expect(button).toBeInTheDocument();
    expect(button).toHaveClass(
      "border",
      "border-gray-foreground",
      "font-[600]",
      "text-gray-foregorund",
      "hover:bg-neutral-50",
      "min-w-[138px]"
    );
  });
  it("should be close button", () => {
    render(<ButtonComponent variant="close" />);
    const button = screen.getByRole("button");
    const icon = screen.getByRole("img");

    expect(button).toBeInTheDocument();
    expect(button).toHaveClass(
      "inline-flex",
      "w-[21px]",
      "h-[19px]",
      "text-[#282828]"
    );
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute("src", closeIcon);
    expect(icon).toHaveAttribute("alt", "Close");
  });
  it("should be icon button", () => {
    render(<ButtonComponent variant="icon" icon={addIcon} />);
    const button = screen.getByRole("button");
    const icon = screen.getByRole("img");

    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("inline-flex");
    expect(button).toHaveClass("h-[41px]");
    expect(button).toHaveClass("text-[#808080]");
    expect(button).toHaveClass("bg-white");
    expect(button).toHaveClass("hover:bg-[#dcdcdc]");
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute("src", addIcon);
    expect(icon).toHaveAttribute("alt", "icon");
  });
  it("should be custom button", () => {
    render(
      <ButtonComponent
        text="boton customizado"
        variant="custom"
        className="bg-[#33df72] text-white p-4"
      />
    );
    const button = screen.getByRole("button");

    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("text-white", "bg-[#33df72]", "p-4");
    expect(button).toHaveTextContent("boton customizado");
  });
  it("should render button with children", () => {
    const { container } = render(
      <ButtonComponent variant="primary">
        X<span className="align-super text-sm">2</span>
      </ButtonComponent>
    );
    const button = container.querySelector("button");
    const span = button?.querySelector("span");

    expect(button).toBeInTheDocument();
    expect(button?.childElementCount).toBeGreaterThan(0);
    expect(screen.getByText("X")).toBeInTheDocument();
    expect(span).toBeInTheDocument();
    expect(span).toHaveTextContent("2");
  });

  it("should render the GitHub button correctly", () => {
    render(<ButtonComponent variant="github" text="Login with GitHub" />);
    const button = screen.getByRole("button");

    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("Login with GitHub");
    expect(button).toHaveClass("text-[var(--github-color)]");
    expect(button).toHaveClass("bg-[var(--github-bg)]");
  });

  it("should render icon button with text and icon", () => {
    render(<ButtonComponent variant="icon" text="EN" icon={addIcon} />);
    const button = screen.getByRole("button");
    const icon = screen.getByRole("img");
    const text = screen.getByText("EN");

    expect(button).toBeInTheDocument();
    expect(text).toBeInTheDocument();
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute("src", addIcon);
    expect(icon).toHaveAttribute("alt", "icon");
  });
});
