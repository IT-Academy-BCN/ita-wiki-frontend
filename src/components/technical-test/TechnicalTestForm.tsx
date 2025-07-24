import { useState } from "react";
import { asideContent } from "../Layout/aside/asideContent";
import { createTechnicalTest } from "../../api/endPointTechnicalTests";
import { API_URL, END_POINTS } from "../../config";
import { formatDocumentIcons } from "../../icons/formatDocumentIconsArray";
import { ArrowLeftIcon } from "lucide-react";
import { useNavigate } from "react-router";

export const TechnicalTestForm = () => {
  const [title, setTitle] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [contentType, setContentType] = useState("text"); // 'text' o 'file'
  const [content, setContent] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("language", selectedLanguage);
    formData.append("contentType", contentType);

    if (contentType === "text") {
      formData.append("content", content);
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
      <a
        className="text-[#B91879]"
        onClick={() => navigate("/resources/technical-test/all-tech-tests")}
      >
        <ArrowLeftIcon className="inline text-[#B91879] mb-2 me-1"></ArrowLeftIcon>
        Volver a Pruebas técnicas
      </a>
      <h2 className="text-2xl font-semibold mb-4">Nueva prueba técnica</h2>

      <label className="block mb-2 font-medium">Título *</label>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 border border-[#B91879] rounded-lg mb-4"
        maxLength={65}
      />

      <label className="block mb-2 font-medium">Lenguaje *</label>
      <div className="flex flex-wrap gap-3 mb-4">
        {asideContent.map((cat) => {
          const IconComponent = cat.icon as unknown as React.FC<
            React.SVGProps<SVGSVGElement>
          >;
          return (
            <button
              key={cat.label}
              onClick={() => setSelectedLanguage(cat.label)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${
                selectedLanguage === cat.label
                  ? "border-3 border-[#B91879] bg-white text-black"
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
      <div
        className="flex gap-2 mb-4
      border-2 border-gray-500
      shadow-sm w-fit
      rounded-full p-1
      "
      >
        <button
          className={`px-8 py-2 rounded-full ${
            contentType === "text" ? "bg-[#B91879] text-white" : "bg-white"
          }`}
          onClick={() => setContentType("text")}
        >
          Texto
        </button>
        <button
          className={`px-6 py-2 rounded-full ${
            contentType === "file" ? "bg-[#B91879] text-white" : "bg-white"
          }`}
          onClick={() => setContentType("file")}
        >
          Archivo
        </button>
      </div>

      {contentType === "text" ? (
        <div className="flex flex-col">
          <span className="w-full flex gap-10 p-2 border border-gray-300 rounded-tl-lg rounded-tr-lg">
            {formatDocumentIcons.map((btn) => {
              const IconComponent = btn.icon as unknown as React.FC<
                React.SVGProps<SVGSVGElement>
              >;
              return <IconComponent key={btn.label} className="w-5 h-5" />;
            })}
          </span>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            maxLength={1000}
            className="w-full min-h-[200px] p-2 border border-gray-300 rounded-bl-lg rounded-br-lg border-t-0 mb-4"
            placeholder="Escribe aquí el contenido de la prueba..."
          />
        </div>
      ) : (
        <input
          type="file"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="mb-4"
        />
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
