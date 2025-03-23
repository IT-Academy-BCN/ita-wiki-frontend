import { render, screen } from "@testing-library/react";
import { Main } from "./Main";

describe("Main Component", () => {
  test("renderiza correctamente sus children", () => {
    render(
      <Main>
        <div data-testid="child">Contenido de prueba</div>
      </Main>,
    );
    const child = screen.getByTestId("child");
    expect(child).toBeInTheDocument();
    expect(child).toHaveTextContent("Contenido de prueba");
  });
});
