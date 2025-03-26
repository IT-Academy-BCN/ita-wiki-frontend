import { render, screen } from "@testing-library/react";
import Content from "./Content";

describe("Content Component", () => {
  test("renderiza correctamente sus children", () => {
    render(
      <Content>
        <div data-testid="child">Contenido de prueba</div>
      </Content>,
    );
    const child = screen.getByTestId("child");
    expect(child).toBeInTheDocument();
    expect(child).toHaveTextContent("Contenido de prueba");
  });
});
