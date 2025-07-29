import { useState } from "react";
import { asideContentForTechnicalTest } from "../Layout/aside/asideContent";
import { createTechnicalTest } from "../../api/endPointTechnicalTests";
import { API_URL, END_POINTS } from "../../config";
import PdfUploadComponent from "../atoms/PdfUploadComponent";

export const TechnicalTestForm = () => {
  const [title, setTitle] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [contentType, setContentType] = useState("text"); // 'text' o 'file'
  const [content, setContent] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = async () => {
    if (!title || !selectedLanguage) {
      alert("Completa todos los campos obligatorios.");
      return;
    }

    if (contentType === "text" && !content.trim()) {
      alert("La descripción no puede estar vacía");
      return;
    }

    if (contentType === "file" && !file) {
      alert("Por favor, selecciona un archivo PDF.");
      return;
    }
    const formData = new FormData();
    formData.append("title", title);
    formData.append("language", selectedLanguage);

    if (contentType === "text") {
      formData.append("description", content);
    } else if (file) {
      formData.append("file", file);
    }

    const url = `${API_URL}${END_POINTS.technicaltests.create}`;
    console.log("Enviando a:", url);

    try {
      const result = await createTechnicalTest(formData);
      console.log("Guardado:", result);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Nueva prueba técnica</h2>

      <label className="block mb-2 font-medium">Título *</label>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 border border-[#B91879] rounded mb-4"
        maxLength={65}
      />

      <label className="block mb-2 font-medium">Lenguaje *</label>
      <div className="flex flex-wrap gap-3 mb-4">
        {asideContentForTechnicalTest.map((cat) => {
          const IconComponent = cat.icon as unknown as React.FC<
            React.SVGProps<SVGSVGElement>
          >;
          return (
            <button
              key={cat.label}
              onClick={() => setSelectedLanguage(cat.label)}
              className={`flex items-center gap-2 px-4 py-2 rounded border ${
                selectedLanguage === cat.label
                  ? "border-2 border-[#B91879] bg-[#B91879] text-white"
                  : "border-gray-300 bg-white text-black"
              }`}
            >
              <IconComponent className="w-5 h-5" />
              <span className="text-sm font-medium">{cat.label}</span>
            </button>
          );
        })}
      </div>

      <label className="block mb-2 font-medium">Contenido de la prueba</label>
      <div className="flex gap-2 mb-4">
        <button
          className={`px-4 py-2 rounded-full ${
            contentType === "text" ? "bg-[#B91879] text-white" : "bg-gray-200"
          }`}
          onClick={() => setContentType("text")}
        >
          Texto
        </button>
        <button
          className={`px-4 py-2 rounded-full ${
            contentType === "file" ? "bg-[#B91879] text-white" : "bg-gray-200"
          }`}
          onClick={() => setContentType("file")}
        >
          Archivo
        </button>
      </div>

      {contentType === "text" ? (
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          maxLength={1000}
          className="w-full min-h-[200px] p-2 border border-[#B91879] rounded mb-4"
          placeholder="Escribe la descripción de la prueba..."
        />
      ) : (
        <div className="my-3">
          <PdfUploadComponent onFileSelect={setFile} />
        </div>
      )}

      <div className="flex justify-end gap-4">
        <button className="px-4 py-2 border border-gray-400 rounded">
          Cancelar
        </button>
        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-[#B91879] text-white rounded"
        >
          Publicar
        </button>
      </div>
    </div>
  );
};
