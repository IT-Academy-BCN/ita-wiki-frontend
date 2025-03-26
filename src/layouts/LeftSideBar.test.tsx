import { render, screen } from "@testing-library/react";
import LeftSideBar from "./LeftSideBar";
import { useGlobalCtx } from "../hooks/useGlobalCtx";
import { Mock, vi } from "vitest";

vi.mock("../hooks/useGlobalCtx", () => ({
  useGlobalCtx: vi.fn(),
}));

describe("LeftSideBar Component", () => {
  test("muestra el aside con left '0px' cuando isOpenMainMenu es true", () => {
    (useGlobalCtx as Mock).mockReturnValue({ isOpenMainMenu: true });
    render(
      <LeftSideBar>
        <div data-testid="child">Contenido de prueba</div>
      </LeftSideBar>,
    );
    const aside = screen.getByRole("complementary");
    expect(aside).toHaveStyle("left: 0px");
    const child = screen.getByTestId("child");
    expect(child).toBeInTheDocument();
  });

  test("muestra el aside con left '-100%' cuando isOpenMainMenu es false", () => {
    (useGlobalCtx as Mock).mockReturnValue({ isOpenMainMenu: false });
    render(
      <LeftSideBar>
        <div data-testid="child">Contenido de prueba</div>
      </LeftSideBar>,
    );
    const aside = screen.getByRole("complementary");
    expect(aside).toHaveStyle("left: -100%");
  });
});
