import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import ITAcademyLogo from "./ITAcademyLogo";

describe("ITAcademyLogo Component", () => {
  it('debería renderizar la imagen del logo con alt "logo"', () => {
    const { getByAltText } = render(
      <MemoryRouter>
        <ITAcademyLogo />
      </MemoryRouter>,
    );
    expect(getByAltText("logo")).toBeInTheDocument();
  });
});
