// import { API_URL, END_POINTS } from "./config";

describe("Configuración de la API", () => {
  // Simulando la variable de entorno antes de cada test
  beforeEach(() => {
    vi.resetModules();
    Object.defineProperty(import.meta, "env", {
      value: {
        ...import.meta.env,
        VITE_API_URL: "http://localhost:8000/api/",
      },
      writable: false,
      configurable: true,
    });
  });

  it("debería tener la URL correcta de la API", async () => {
    // Verificar que la variable API_URL tenga el valor correcto
    const { API_URL } = await import("./config");
    expect(API_URL).toBe("http://localhost:8000");
  });

  it("debería tener las rutas correctas en END_POINTS", async () => {
    // Verificar que los endpoints en END_POINTS sean los correctos
    const { END_POINTS } = await import("./config");
    expect(END_POINTS.resources.lists).toBe("resources");
  });
});
