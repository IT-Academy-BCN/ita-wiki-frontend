import { render, screen, fireEvent } from "@testing-library/react";
import SignIn from "./SignIn";
import { vi } from "vitest";

// Mocks de los contextos y componentes
vi.mock("../../hooks/useGlobalCtx", () => ({
  useGlobalCtx: () => ({
    isCheckedTerms: false, // Simula términos NO aceptados
  }),
}));

const signInMock = vi.fn();
vi.mock("../../hooks/useUserCtx", () => ({
  useUserCtx: () => ({
    signIn: signInMock,
  }),
}));

vi.mock("../github-login/GitHubLogin", () => ({
  default: (props: { onClick: () => void }) => (
    <button onClick={props.onClick}>GitHub Login</button>
  ),
}));

vi.mock("./ErrorAccess", () => ({
  default: (props: { loginError: boolean }) => (
    <div>{props.loginError ? "Error Access" : "No Error"}</div>
  ),
}));

vi.mock("./Terms", () => ({
  default: () => <div>Terms Component</div>,
}));

describe("SignIn Component", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("debería mostrar error cuando no se aceptan los términos", () => {
    render(<SignIn />);
    fireEvent.click(screen.getByText("GitHub Login"));
    expect(screen.getByText("Error Access")).toBeInTheDocument();
    expect(signInMock).not.toHaveBeenCalled();
  });
});
