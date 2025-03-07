import { API_URL, END_POINTS } from "./config";

describe("Configuración de la API", () => {
  // Simulando la variable de entorno antes de cada test
  beforeAll(() => {
    // Mock de la variable de entorno para que VITE_API_URL tenga un valor conocido durante el test
    import.meta.env.VITE_API_URL = "http://localhost:8000/api/";
  });

  it("debería tener la URL correcta de la API", () => {
    // Verificar que la variable API_URL tenga el valor correcto
    expect(API_URL).toBe("http://localhost:8000/api/");
  });

  it("debería tener las rutas correctas en END_POINTS", () => {
    // Verificar que los endpoints en END_POINTS sean los correctos
    expect(END_POINTS.resources.lists).toBe("resources/");
  });
});
