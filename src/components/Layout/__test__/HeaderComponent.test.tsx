import { render, screen, fireEvent } from "@testing-library/react";
import HeaderComponent from "../HeaderComponent";
import { UserProvider } from "../../../context/UserContext";
import { MemoryRouter } from "react-router";

describe("HeaderComponent Language Dropdown", () => {
  test("shows 'CA' as selected language and dropdown contains CA, ES and EN", () => {
    render(
      <MemoryRouter>
        <UserProvider>
          <HeaderComponent />
        </UserProvider>
      </MemoryRouter>
    );

    const selectedLanguage = screen.getByText("CA", { selector: "span" });
    expect(selectedLanguage).toBeInTheDocument();

    const languageButton = selectedLanguage.closest("button");
    if (languageButton) fireEvent.click(languageButton);

    expect(screen.getByRole("button", { name: "CA" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "ES" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "EN" })).toBeInTheDocument();
  });
});
