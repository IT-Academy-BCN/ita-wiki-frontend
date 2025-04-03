import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import AsideComponent from "../AsideComponent";

const asideContentMock = [
  { icon: "/react.svg", label: "React" },
  { icon: "/node.svg", label: "Node" },
];

test("renders aside content items", () => {
  render(
    <MemoryRouter>
      <AsideComponent asideContent={asideContentMock} />
    </MemoryRouter>
  );

  asideContentMock.forEach((item) => {
    expect(screen.getByText(item.label)).toBeInTheDocument();
  });

  const searchInput = screen.getByRole("textbox");
  expect(searchInput).toBeInTheDocument();
  expect(screen.getByText("Categorias")).toBeInTheDocument();
  expect(screen.getByText("Mis recursos")).toBeInTheDocument();
});
