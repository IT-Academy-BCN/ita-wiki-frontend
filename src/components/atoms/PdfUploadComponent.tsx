import React, { useState, useRef } from 'react';
import { FaCheck, FaSpinner } from "react-icons/fa";

function PdfUploadComponent() {
  const [fileName, setFileName] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleClick = () => {
    inputRef.current?.click();
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === "application/pdf") {
      setFileName(file.name);
      setIsLoading(true);
      setIsUploaded(false);

      setTimeout(() => {
        setIsLoading(false);
        setIsUploaded(true);
      }, 2000);
    } else {
      alert("Por favor selecciona un archivo PDF.");
    }
  };

  return (
    <div className="max-w-sm mx-auto">
      <div className="flex items-center justify-between border border-gray-300 rounded-[12px] p-2">
        <span className={`truncate text-sm p-2 rounded-[12px] w-3/4 ${isLoading ? 'bg-primary text-white' : 'text-gray-700'}`}>
          {fileName ? fileName : "No file selected"}
        </span>

        <div className="ml-2">
          {isLoading ? (
            <FaSpinner className="animate-spin text-primary" />
          ) : isUploaded ? (
            <div className='bg-green-700 p-1 rounded-full'>
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

export default PdfUploadComponent