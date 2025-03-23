import { render } from "@testing-library/react";
import Hero from "./Hero";

describe("Hero Component", () => {
  it("debería renderizar el contenido de los children", () => {
    const { getByText } = render(
      <Hero>
        <div>Contenido de prueba</div>
      </Hero>,
    );
    expect(getByText("Contenido de prueba")).toBeInTheDocument();
  });
});
