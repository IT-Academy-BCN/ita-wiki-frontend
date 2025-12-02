import { useState } from "react";
import { asideContentForTechnicalTest } from "../Layout/aside/asideContent";
import { createTechnicalTest } from "../../api/endPointTechnicalTests";
import { API_URL, END_POINTS } from "../../config";
import { formatDocumentIcons } from "../../icons/formatDocumentIconsArray";
import { ArrowLeftIcon } from "lucide-react";
import { useNavigate } from "react-router";
import PdfUploadComponent from "../atoms/PdfUploadComponent";
import { toast } from "sonner";
import Container from "../ui/Container";

export const TechnicalTestForm = () => {
  const [title, setTitle] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [duration, setDuration] = useState<number | "">("");
  const [difficultyLevel, setDifficultyLevel] = useState<
    "easy" | "medium" | "hard" | "expert"
  >("easy");
  const [contentType, setContentType] = useState("text"); // 'text' o 'file'
  const [content, setContent] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [exercises, setExercises] = useState(["", "", "", ""]);
  const navigate = useNavigate();

  const handleExerciseChange = (index: number, value: string) => {
    const newExercises = [...exercises];
    newExercises[index] = value;
    setExercises(newExercises);
  };

  const validateForm = () => {
    if (!title.trim()) {
      toast.error("El títol és obligatori.");
      return false;
    }

    if (!selectedLanguage) {
      toast.error("Selecciona un llenguatge.");
      return false;
    }

    if (!duration || duration < 1) {
      toast.error("La durada ha de ser un número positiu.");
      return false;
    }

    if (contentType === "text" && !content.trim()) {
      toast.error("La descripció no pot estar buida.");
      return false;
    }

    if (contentType === "file" && !file) {
      toast.error("Si us plau, selecciona un fitxer PDF.");
      return false;
    }

    return true;
  };
  const handleSubmit = async () => {
    const isValid = validateForm();
    if (!isValid) return;

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

      navigate("/resources/technical-test/all-tech-tests", {
        state: { successMessage: "Prueba técnica publicada con éxito" },
      });
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error al publicar la prueba técnica");
    }
  };

  return (
    <Container className="!p-0">
      <div className="py-10">
        <div className="flex sm:flex-row flex-col justify-between px-4 sm:px-10">
          <div>
            <a
              className="text-[#B91879] cursor-pointer"
              onClick={() =>
                navigate("/resources/technical-test/all-tech-tests")
              }
            >
              <ArrowLeftIcon className="inline text-[#B91879] mb-2 me-1"></ArrowLeftIcon>
              Tornar a proves tècniques
            </a>
            <h2 className="text-2xl font-semibold mb-">Nova prova tècnica</h2>
          </div>

          <div className="flex items-center justify-end mt-4 sm:mt-0 gap-4">
            <button
              onClick={() =>
                navigate("/resources/technical-test/all-tech-tests")
              }
              className="px-4 py-2 border border-gray-400 rounded-lg w-1/2 h-fit hover:shadow-md cursor-pointer"
            >
              Cancel·lar
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-primary text-white rounded-lg w-1/2 h-fit hover:shadow-md cursor-pointer"
            >
              Publicar
            </button>
          </div>
        </div>

        <div className="border-t border-gray-300 my-8"></div>
        <div className="flex flex-col px-10">
          <label className="block mb-2 mt-8 font-medium">Títol *</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="sm:w-1/2 p-2 border border-[#B91879] rounded-lg mb-4"
            maxLength={65}
          />
          <div className="sm:w-1/2 self-end sm:me-10 text-sm text-gray-500">
            <span>{title.length}/65</span>
          </div>
        </div>

        <label className="block mb-2 font-medium px-10">Llenguatge *</label>
        <div className="flex flex-wrap gap-3 mb-4 px-10">
          {asideContentForTechnicalTest.map((cat) => {
            const IconComponent = cat.icon;
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

        <div className="flex flex-col px-10 mb-6">
          <label className="font-medium mb-2">Durada (minuts)</label>
          <input
            type="number"
            min={1}
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            className="sm:w-1/4 p-2 border border-gray-300 rounded-lg"
          />
        </div>

        <div className="flex flex-col px-10 mb-6">
          <label htmlFor="difficulty" className="font-medium mb-2">
            Dificultat
          </label>
          <select
            id="difficulty"
            value={difficultyLevel}
            onChange={(e) =>
              setDifficultyLevel(
                e.target.value as "easy" | "medium" | "hard" | "expert",
              )
            }
            className="sm:w-1/4 p-2 border border-gray-300 rounded-lg"
          >
            <option value="easy">Fàcil</option>
            <option value="medium">Mitjana</option>
            <option value="hard">Difícil</option>
            <option value="expert">Expert</option>
          </select>
        </div>

        <div className="border-t border-gray-300 my-8"></div>

        <label className="block my-4 px-10 mb-8 font-medium">
          Contingut de la prova
        </label>
        <div
          className="flex gap-2 mx-10 mb-10
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
            Text
          </button>
          <button
            className={`px-6 py-2 rounded-full cursor-pointer ${
              contentType === "file" ? "bg-[#B91879] text-white" : "bg-white"
            }`}
            onClick={() => setContentType("file")}
          >
            Fitxer
          </button>
        </div>

        {contentType === "text" ? (
          <div className="flex flex-col px-10">
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
              <span className="self-end">{content.length}/1000</span>
            </div>
          </div>
        ) : (
          <div className="my-3">
            <PdfUploadComponent onFileSelect={setFile} />
          </div>
        )}
      </div>

      <div className="border-t border-gray-300 my-8"></div>

      <div className="flex flex-col px-10 mb-6">
        <label className="font-medium mb-2">Exercicis</label>
        {exercises.map((ex, index) => (
          <textarea
            key={index}
            value={ex}
            onChange={(e) => handleExerciseChange(index, e.target.value)}
            placeholder={`Exercici ${index + 1}`}
            className="w-full p-2 mb-3 border border-gray-300 rounded-lg min-h-[80px]"
          />
        ))}
      </div>
    </Container>
  );
};
