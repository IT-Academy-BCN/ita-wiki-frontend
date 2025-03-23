import { render, screen } from "@testing-library/react";
import ErrorAccess from "./ErrorAccess";

describe("ErrorAccess Component", () => {
  test("no renderiza mensaje de error cuando loginError es false", () => {
    render(<ErrorAccess loginError={false} />);
    const errorMessage = screen.queryByText(
      /Lo sentimos, no se ha podido iniciar sesión/i,
    );
    expect(errorMessage).toBeNull();
  });

  test("renderiza mensaje de error cuando loginError es true", () => {
    render(<ErrorAccess loginError={true} />);
    const errorMessage = screen.getByText(
      /Lo sentimos, no se ha podido iniciar sesión/i,
    );
    expect(errorMessage).toBeInTheDocument();
  });
});
