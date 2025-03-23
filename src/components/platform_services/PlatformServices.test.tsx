import { render } from "@testing-library/react";
import PlatformServices from "./PlatformServices";

describe("PlatformServices Component", () => {
  it("debería renderizar el título principal", () => {
    const { getByText } = render(<PlatformServices />);
    expect(
      getByText(/Funcionalidades básicas que te ofrece esta plataforma:/i),
    ).toBeInTheDocument();
  });
});
