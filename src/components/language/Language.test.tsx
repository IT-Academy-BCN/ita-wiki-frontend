import { render } from "@testing-library/react";
import { FC } from "react";

const Language: FC = () => {
  return (
    <select
      title="lang"
      className="bg-white py-2 px-4 text-[#808080] rounded-lg border border-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#808080] focus:border-transparent"
    >
      <option>ES</option>
      <option>EN</option>
    </select>
  );
};

describe("Language component", () => {
  it("should render the Language component", () => {
    const { getByTitle } = render(<Language />);
    const selectElement = getByTitle("lang");
    expect(selectElement).toBeInTheDocument();
  });

  it("should have the correct class names", () => {
    const { getByTitle } = render(<Language />);
    const selectElement = getByTitle("lang");
    expect(selectElement).toHaveClass(
      "bg-white py-2 px-4 text-[#808080] rounded-lg border border-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#808080] focus:border-transparent",
    );
  });

  it("should render a select element", () => {
    const { container } = render(<Language />);
    const selectElement = container.querySelector("select");
    expect(selectElement).toBeInTheDocument();
  });

  it("should render exactly two options", () => {
    const { getByTitle } = render(<Language />);
    const options = getByTitle("lang").querySelectorAll("option");
    expect(options).toHaveLength(2);
  });

  it("should render options with text 'ES' and 'EN'", () => {
    const { getByTitle } = render(<Language />);
    const options = Array.from(
      getByTitle("lang").querySelectorAll("option"),
    ).map((option) => option.textContent);
    expect(options).toEqual(["ES", "EN"]);
  });

  it("should match the snapshot", () => {
    const { container } = render(<Language />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
