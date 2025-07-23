import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import PdfUploadComponent from "./PdfUploadComponent";
import { describe, it, expect, vi, beforeEach } from "vitest";
import "@testing-library/jest-dom";

beforeEach(() => {
  vi.spyOn(window, "alert").mockImplementation(() => {});
});

describe("PdfUploadComponent", () => {
  it("muestra el texto inicial", () => {
    render(<PdfUploadComponent onFileSelect={() => {}} />);
    expect(screen.getByText(/no file selected/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /browse/i })).toBeInTheDocument();
  });

  it("muestra el nombre del archivo PDF tras seleccionarlo", async () => {
    render(<PdfUploadComponent onFileSelect={() => {}} />);

    const file = new File(["contenido"], "documento.pdf", {
      type: "application/pdf",
    });

    const input = document.querySelector(
      'input[type="file"]',
    ) as HTMLInputElement;
    fireEvent.change(input, { target: { files: [file] } });

    await waitFor(() => {
      expect(screen.getByText("documento.pdf")).toBeInTheDocument();
    });
  });

  it("lanza alerta si se selecciona un archivo no-PDF", () => {
    render(<PdfUploadComponent onFileSelect={() => {}} />);

    const file = new File(["no es un PDF"], "imagen.png", {
      type: "image/png",
    });

    const input = document.querySelector(
      'input[type="file"]',
    ) as HTMLInputElement;
    fireEvent.change(input, { target: { files: [file] } });

    expect(window.alert).toHaveBeenCalledWith(
      "Por favor selecciona un archivo PDF.",
    );
  });
  it("lanza alerta si el archivo excede el límite de 5MB", () => {
    render(<PdfUploadComponent onFileSelect={() => {}} />);

    const largeFile = new File(
      [new ArrayBuffer(5 * 1024 * 1024 + 1)],
      "grande.pdf",
      {
        type: "application/pdf",
      },
    );

    const input = document.querySelector(
      'input[type="file"]',
    ) as HTMLInputElement;
    fireEvent.change(input, { target: { files: [largeFile] } });

    expect(window.alert).toHaveBeenCalledWith(
      "El archivo elegido es demasiado pesado. Puedes subir archivos de hasta 5MB.",
    );
  });
});
