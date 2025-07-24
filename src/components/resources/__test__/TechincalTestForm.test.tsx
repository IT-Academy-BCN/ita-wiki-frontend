// import React from "react";
// import { render, screen } from "@testing-library/react";
// import { TechnicalTestForm } from "../../../components/technical-test/TechnicalTestForm";
// import { vi } from "vitest";
// import "@testing-library/jest-dom";

// vi.mock("react-router", () => ({
//   useNavigate: () => vi.fn(),
// }));

// describe("TechnicalTestForm UI", () => {
//   it("renders heading and back link", () => {
//     render(<TechnicalTestForm />);

//     expect(screen.getByText("Nueva prueba técnica")).toBeInTheDocument();
//     expect(screen.getByText("Volver a Pruebas técnicas")).toBeInTheDocument();
//   });

//   it("renders title input", () => {
//     render(<TechnicalTestForm />);
//     expect(screen.getByLabelText("Título *")).toBeInTheDocument();
//   });

//   it("renders language selection buttons", () => {
//     render(<TechnicalTestForm />);
//     expect(screen.getByLabelText("Lenguaje *")).toBeInTheDocument();
//     expect(screen.getAllByRole("button")).toEqual(
//       expect.arrayContaining([expect.objectContaining({})])
//     );
//   });

//   it("renders content type toggle buttons", () => {
//     render(<TechnicalTestForm />);
//     expect(screen.getByRole("button", { name: "Texto" })).toBeInTheDocument();
//     expect(screen.getByRole("button", { name: "Archivo" })).toBeInTheDocument();
//   });

//   it("renders formatting icons row", () => {
//     render(<TechnicalTestForm />);
//     const iconRow = screen.getByRole("textbox").previousSibling;
//     expect(iconRow?.nodeName).toBe("SPAN");
//   });

//   it("renders textarea by default", () => {
//     render(<TechnicalTestForm />);
//     expect(
//       screen.getByPlaceholderText("Escribe aquí el contenido de la prueba...")
//     ).toBeInTheDocument();
//   });

//   it("renders Cancel and Publicar buttons", () => {
//     render(<TechnicalTestForm />);
//     expect(
//       screen.getByRole("button", { name: "Cancelar" })
//     ).toBeInTheDocument();
//     expect(
//       screen.getByRole("button", { name: "Publicar" })
//     ).toBeInTheDocument();
//   });
// });

import React from "react";
import { render, screen } from "@testing-library/react";
import { TechnicalTestForm } from "../../../components/technical-test/TechnicalTestForm";
import { vi } from "vitest";
import "@testing-library/jest-dom";

vi.mock("react-router", () => ({
  useNavigate: () => vi.fn(),
}));

describe("TechnicalTestForm UI", () => {
  it("renders heading and back link", () => {
    render(<TechnicalTestForm />);
    expect(screen.getByText("Nueva prueba técnica")).toBeInTheDocument();
    expect(screen.getByText("Volver a Pruebas técnicas")).toBeInTheDocument();
  });

  it("renders title input", () => {
    render(<TechnicalTestForm />);
    expect(screen.getByText("Título *")).toBeInTheDocument();
  });

  it("renders language selection buttons", () => {
    render(<TechnicalTestForm />);
    expect(screen.getByText("Lenguaje *")).toBeInTheDocument();
    expect(screen.getAllByRole("button")).toEqual(
      expect.arrayContaining([expect.objectContaining({})]),
    );
  });

  it("renders content type toggle buttons", () => {
    render(<TechnicalTestForm />);
    expect(screen.getByRole("button", { name: "Texto" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Archivo" })).toBeInTheDocument();
  });

  it("renders formatting icons row", () => {
    render(<TechnicalTestForm />);
    const textarea = screen.getByPlaceholderText(
      "Escribe aquí el contenido de la prueba...",
    );
    const iconRow = textarea.previousSibling;
    expect(iconRow?.nodeName).toBe("SPAN");
  });

  it("renders textarea by default", () => {
    render(<TechnicalTestForm />);
    expect(
      screen.getByPlaceholderText("Escribe aquí el contenido de la prueba..."),
    ).toBeInTheDocument();
  });

  it("renders Cancel and Publicar buttons", () => {
    render(<TechnicalTestForm />);
    expect(
      screen.getByRole("button", { name: "Cancelar" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Publicar" }),
    ).toBeInTheDocument();
  });
});
