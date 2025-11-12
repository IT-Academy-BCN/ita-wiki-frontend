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
    expect(screen.getByText(/Cap fitxer seleccionat/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /cerca/i })).toBeInTheDocument();
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
      "Si us plau, selecciona un fitxer PDF.",
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
      "El fitxer triat és massa gran. Pots pujar fitxers de fins a 5 MB.",
    );
  });
  it("llama a onFileSelect cuando se selecciona un archivo PDF válido", async () => {
    const mockOnFileSelect = vi.fn();

    render(<PdfUploadComponent onFileSelect={mockOnFileSelect} />);

    const file = new File(["contenido"], "documento.pdf", {
      type: "application/pdf",
    });

    const input = document.querySelector(
      'input[type="file"]',
    ) as HTMLInputElement;
    fireEvent.change(input, { target: { files: [file] } });

    await waitFor(() => {
      expect(mockOnFileSelect).toHaveBeenCalledWith(file);
    });
  });
});
