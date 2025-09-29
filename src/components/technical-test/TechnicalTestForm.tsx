import { useState } from "react";
import { asideContentForTechnicalTest } from "../Layout/aside/asideContent";
import { createTechnicalTest } from "../../api/endPointTechnicalTests";
import { API_URL, END_POINTS } from "../../config";
import { formatDocumentIcons } from "../../icons/formatDocumentIconsArray";
import { ArrowLeftIcon } from "lucide-react";
import { useNavigate } from "react-router";
import PdfUploadComponent from "../atoms/PdfUploadComponent";
import { toast } from "sonner";

export const TechnicalTestForm = () => {
  const [title, setTitle] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [contentType, setContentType] = useState("text"); // 'text' o 'file'
  const [content, setContent] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const navigate = useNavigate();

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
      toast.success("Prueba técnica publicada con éxito");
      setTimeout(() => {
        navigate("/resources/technical-test/all-tech-tests");
      }, 1500);
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error al publicar la prueba técnica");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-10 px-15 bg-white rounded-xl shadow-md">
      <div className="flex flex-row justify-between">
        <div>
          <a
            className="text-[#B91879] cursor-pointer"
            onClick={() => navigate("/resources/technical-test/all-tech-tests")}
          >
            <ArrowLeftIcon className="inline text-[#B91879] mb-2 me-1"></ArrowLeftIcon>
            Volver a pruebas técnicas
          </a>
          <h2 className="text-2xl font-semibold mb-">Nueva prueba técnica</h2>
        </div>

        <div className="flex items-center justify-end gap-4">
          <button className="px-4 py-2 border border-gray-400 rounded-lg w-1/2 h-fit hover:shadow-md cursor-pointer">
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-primary text-white rounded-lg w-1/2 h-fit hover:shadow-md cursor-pointer"
          >
            Publicar
          </button>
        </div>
      </div>

      <div className="mx-[-3.7rem] border-t border-gray-300 my-8"></div>
      <div className="flex flex-col">
        <label className="block mb-2 mt-8 font-medium">Título *</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-1/2 p-2 border border-[#B91879] rounded-lg mb-4"
          maxLength={65}
        />
        <div className="w-1/2 self-end me-10 text-sm text-gray-500">
          <span>0/65</span>
        </div>
      </div>

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
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 hover:shadow-md cursor-pointer ${
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

      <div className="mx-[-3.7rem] border-t border-gray-300 my-8"></div>

      <label className="block my-4 mb-8 font-medium">
        Contenido de la prueba
      </label>
      <div
        className="flex gap-2 mb-10
      border-2 border-gray-500
      shadow-sm w-fit
      rounded-full p-1
      "
      >
        <button
          className={`px-8 py-2 rounded-full cursor-pointer ${
            contentType === "text" ? "bg-[#B91879] text-white" : "bg-white"
          }`}
          onClick={() => setContentType("text")}
        >
          Texto
        </button>
        <button
          className={`px-6 py-2 rounded-full cursor-pointer ${
            contentType === "file" ? "bg-[#B91879] text-white" : "bg-white"
          }`}
          onClick={() => setContentType("file")}
        >
          Archivo
        </button>
      </div>

      {contentType === "text" ? (
        <div className="flex flex-col">
          <span className="w-full flex gap-10 p-2 px-5 border border-gray-300 rounded-tl-lg rounded-tr-lg">
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
            className="w-full min-h-[350px] p-2 border border-gray-300 rounded-bl-lg rounded-br-lg border-t-0 mb-4"
          />
          <div className="flex w-full justify-end me-10 text-sm text-gray-500">
            <span className="self-end">0/1000</span>
          </div>
        </div>
      ) : (
        <div className="my-3">
          <PdfUploadComponent onFileSelect={setFile} />
        </div>
      )}
    </div>
  );
};
