import React, { useState, useRef } from "react";
import { FaCheck, FaSpinner } from "react-icons/fa";
import FileUploadIcon from "../../icons/FileUploadIcon";

interface PdfUploadComponentProps {
  onFileSelect: (file: File | null) => void;
}

function PdfUploadComponent({ onFileSelect }: PdfUploadComponentProps) {
  const [fileName, setFileName] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const maxPdfSize = 5 * 1024 * 1024;

  const handleClick = () => {
    inputRef.current?.click();
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (
      file &&
      file.type === "application/pdf" &&
      file.size <= 5 * 1024 * 1024
    ) {
      setFileName(file.name);
      setIsLoading(true);
      setIsUploaded(false);
      onFileSelect(file);
      setTimeout(() => {
        setIsLoading(false);
        setIsUploaded(true);
      }, 2000);
    } else if (file && file.size > maxPdfSize) {
      alert(
        `El archivo elegido es demasiado pesado. Puedes subir archivos de hasta 5MB.`,
      );
      onFileSelect(null);
      setFileName(null);
      setIsLoading(false);
      setIsUploaded(false);
    } else {
      alert("Por favor selecciona un archivo PDF.");
      onFileSelect(null);
      setFileName(null);
      setIsLoading(false);
      setIsUploaded(false);
    }
  };

  return (
    <div className="max-w-sm mx-auto">
      <div className="flex items-center justify-between border border-gray-300 rounded-[12px] p-2">
        <span
          className={`truncate text-sm p-2 rounded-[12px] w-3/4 flex items-center ${isLoading && "bg-primary text-white"} ${isUploaded && "text-black"}`}
        >
          {fileName && (
            <FileUploadIcon
              className={`${isLoading ? "text-white" : "text-primary"} mr-1`}
            />
          )}
          {fileName ? fileName : "No file selected"}
        </span>

        <div className="ml-2">
          {isLoading ? (
            <FaSpinner className="animate-spin text-primary" />
          ) : isUploaded ? (
            <div className="bg-green-700 p-1 rounded-full">
              <FaCheck className="text-white text-xs" />
            </div>
          ) : (
            <button
              onClick={handleClick}
              className="p-3 bg-primary text-white text-sm rounded-[12px]"
            >
              Browse
            </button>
          )}
        </div>
      </div>

      <input
        type="file"
        accept="application/pdf"
        ref={inputRef}
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
}

export default PdfUploadComponent;
