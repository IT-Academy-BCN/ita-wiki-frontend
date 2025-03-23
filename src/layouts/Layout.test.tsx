import { render, screen } from "@testing-library/react";
import { Layout } from "./Layout";

describe("Layout Component", () => {
  test("renderiza correctamente sus children", () => {
    render(
      <Layout>
        <div data-testid="child">Contenido de prueba</div>
      </Layout>,
    );
    const child = screen.getByTestId("child");
    expect(child).toBeInTheDocument();
    expect(child).toHaveTextContent("Contenido de prueba");
  });
});
