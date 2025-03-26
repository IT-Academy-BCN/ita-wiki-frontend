import React from "react";
import { vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import UserCtxProvider from "./context/providers/UserCtxProvider";
import { CtxGLobal } from "./context";
import App from "./App";
import { PropsContexGLobal } from "./context/types";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

vi.mock("./pages/ITAcademy", async () => {
  await delay(150);
  return {
    default: () => <div>¡Bienvenid@ a la wiki de la IT Academy!</div>,
  };
});

// Nuevos mocks para rutas lazy de resources.
vi.mock("./pages/resources/ResourcesPage", async () => {
  await delay(150);
  return {
    default: () => <div>Página de Resources</div>,
  };
});
vi.mock("./pages/resources/CreateResourcePage", async () => {
  await delay(150);
  return {
    default: () => <div>Página de creación de recurso</div>,
  };
});

const dummyGlobal = {
  theme: "light",
  toggleTheme: () => {},
  isModalOpen: vi.fn(() => false),
  openModal: vi.fn(() => true),
} as unknown as PropsContexGLobal;

const DummyGlobalProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <CtxGLobal.Provider value={dummyGlobal}>{children}</CtxGLobal.Provider>
  );
};

describe("Lazy y Suspense con rutas", () => {
  // Test para la ruta home
  test("Muestra Loading y luego la HomePage", async () => {
    render(
      <DummyGlobalProvider>
        <UserCtxProvider>
          <MemoryRouter initialEntries={["/"]}>
            <App />
          </MemoryRouter>
        </UserCtxProvider>
      </DummyGlobalProvider>,
    );

    // Se comprueba que el fallback Loading se muestre inicialmente.
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
    // Se espera que el contenido lazy se renderice posteriormente.
    const bienvenida = await screen.findByText(
      /¡Bienvenid@ a la wiki de la IT Academy!/i,
    );
    expect(bienvenida).toBeInTheDocument();
  });

  // Nuevo test para ruta inválida (404)
  test("Muestra la página 404 para rutas no existentes", async () => {
    render(
      <DummyGlobalProvider>
        <UserCtxProvider>
          <MemoryRouter initialEntries={["/ruta-inexistente"]}>
            <App />
          </MemoryRouter>
        </UserCtxProvider>
      </DummyGlobalProvider>,
    );

    // Se espera que se muestre el fallback y posteriormente el mensaje 404.
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
    const notFound = await screen.findByText(/404 - Page Not Found/i);
    expect(notFound).toBeInTheDocument();
  });

  // Test para la ruta "/resources" que renderiza ResourcesPage
  test("Muestra la página de Resources para la ruta /resources", async () => {
    render(
      <DummyGlobalProvider>
        <UserCtxProvider>
          <MemoryRouter initialEntries={["/resources"]}>
            <App />
          </MemoryRouter>
        </UserCtxProvider>
      </DummyGlobalProvider>,
    );
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
    const resources = await screen.findByText(/Página de Resources/i);
    expect(resources).toBeInTheDocument();
  });

  // Test para la ruta "/resources/add" que renderiza CreateResourcePage
  test("Muestra la página de creación de recurso para la ruta /resources/add", async () => {
    render(
      <DummyGlobalProvider>
        <UserCtxProvider>
          <MemoryRouter initialEntries={["/resources/add"]}>
            <App />
          </MemoryRouter>
        </UserCtxProvider>
      </DummyGlobalProvider>,
    );
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
    const createResource = await screen.findByText(
      /Página de creación de recurso/i,
    );
    expect(createResource).toBeInTheDocument();
  });

  // Test para ruta inválida en el segmento de /resources
  test("Muestra página de recurso no encontrado para ruta inválida en /resources", async () => {
    render(
      <DummyGlobalProvider>
        <UserCtxProvider>
          <MemoryRouter initialEntries={["/resources/unknown"]}>
            <App />
          </MemoryRouter>
        </UserCtxProvider>
      </DummyGlobalProvider>,
    );
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
    const resourceNotFound = await screen.findByText(
      /Upps! Recurso no encotrado, etc .../i,
    );
    expect(resourceNotFound).toBeInTheDocument();
  });
});
