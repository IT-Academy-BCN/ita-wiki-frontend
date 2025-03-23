import React from "react";
import { vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import UserCtxProvider from "./context/UserCtxProvider";
import { CtxGLobal } from "./context";
import App from "./App";
import { PropsContexGLobal } from "./context/typesCtx";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

vi.mock("./pages/HomePage", async () => {
  await delay(150);
  return {
    default: () => <div>¡Bienvenid@ a la wiki de la IT Academy!</div>,
  };
});

const dummyGlobal = {
  theme: "light",
  toggleTheme: () => { },
  isModalOpen: vi.fn(() => false),
  openModal: vi.fn(() => true),
} as unknown as PropsContexGLobal;

const DummyGlobalProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <CtxGLobal.Provider value={dummyGlobal}>
      {children}
    </CtxGLobal.Provider>
  );
};

describe("Lazy y Suspense con rutas", () => {
  test("Muestra Loading y luego la HomePage", async () => {
    render(
      <DummyGlobalProvider>
        <UserCtxProvider>
          <MemoryRouter initialEntries={["/"]}>
            <App />
          </MemoryRouter>
        </UserCtxProvider>
      </DummyGlobalProvider>
    );

    expect(screen.getByText(/Loading/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(
        screen.getByText(/¡Bienvenid@ a la wiki de la IT Academy!/i)
      ).toBeInTheDocument();
    });
  });
});