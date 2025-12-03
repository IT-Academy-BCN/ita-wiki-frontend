import { useState, useCallback } from "react";
import { asideContentForTechnicalTest } from "../Layout/aside/asideContent";
import { zodResolver } from "@hookform/resolvers/zod";
import { createTechnicalTest } from "../../api/endPointTechnicalTests";
import { formatDocumentIcons } from "../../icons/formatDocumentIconsArray";
import { ArrowLeftIcon } from "lucide-react";
import { useNavigate } from "react-router";
import PdfUploadComponent from "../atoms/PdfUploadComponent";
import { toast } from "sonner";
import Container from "../ui/Container";
import TagInput from "../forms/TagInput";
import { Tag } from "../../types";
import { useForm, useWatch } from "react-hook-form";
import { technicalTestSchema } from "../../validations/technicalTestSchema";
import { z } from "zod";

type TechnicalTestFormData = z.infer<typeof technicalTestSchema>;

export const TechnicalTestForm = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit: hookFormHandleSubmit,
    setValue,
    reset,
    control,
    formState: { errors },
  } = useForm<TechnicalTestFormData>({
    resolver: zodResolver(technicalTestSchema),
  });

  const titleValue = useWatch({
    control,
    name: "title",
    defaultValue: "",
  });

  const descriptionValue = useWatch({
    control,
    name: "description",
    defaultValue: "",
  });

  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [contentType, setContentType] = useState("text"); // 'text' o 'file'
  const [file, setFile] = useState<File | null>(null);
  const [selectedTags, setselectedTags] = useState<Tag[]>([]);

  const handleTagChange = useCallback(
    (tags: Tag[]) => {
      setselectedTags(tags);
      setValue("tags", tags);
    },
    [setValue],
  );

  const handleLanguageSelect = (language: string) => {
    setSelectedLanguage(language);
    setValue("language", language as TechnicalTestFormData["language"]);
  };

  const onSubmit = async (data: TechnicalTestFormData) => {
    if (contentType === "file" && !file) {
      toast.error("Si us plau, selecciona un fitxer PDF.");
      return;
    }

    const formData = new FormData();
    formData.append("title", data.title || "");
    formData.append("language", data.language || "");
    formData.append("duration", String(data.duration));
    formData.append("difficulty", data.difficulty);

    if (contentType === "text") {
      formData.append("description", data.description || "");
    } else if (file) {
      formData.append("file", file);
    }

    if (data.tags && Array.isArray(data.tags)) {
      const tagIds = data.tags.map((tag) => String(tag.id));
      tagIds.forEach((tagId) => {
        formData.append("tags[]", tagId);
      });
    }

    try {
      const result = await createTechnicalTest(formData);
      console.log("Guardado:", result);
      toast.success("Prova tècnica publicada amb èxit!");

      reset();
      setFile(null);
      setSelectedLanguage("");
      setselectedTags([]);
      setContentType("text");

      navigate("/resources/technical-test/all-tech-tests", {
        state: { successMessage: "Prueba técnica publicada con éxito" },
      });
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error al publicar la prueba técnica");
    }
  };

  const charLimitTitle = 65;
  const charLimitDescription = 1000;

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
              onClick={hookFormHandleSubmit(onSubmit)}
              className="px-4 py-2 bg-primary text-white rounded-lg w-1/2 h-fit hover:shadow-md cursor-pointer"
            >
              Publicar
            </button>
          </div>
        </div>

        <div className="border-t border-gray-300 my-8"></div>

        <form onSubmit={hookFormHandleSubmit(onSubmit)}>
          <div className="flex flex-col px-10">
            <label className="block mb-2 mt-8 font-medium">Títol *</label>
            <input
              type="text"
              {...register("title")}
              onChange={(e) => setValue("title", e.target.value)}
              className="sm:w-1/2 p-2 border border-[#B91879] rounded-lg mb-4"
              maxLength={charLimitTitle}
            />
            <div className="sm:w-1/2 self-end sm:me-10 text-sm text-gray-500">
              <span>
                {titleValue?.length || 0}/{charLimitTitle}
              </span>
            </div>
            <div className="h-6">
              {errors.title && (
                <p className="text-red-500 text-xs">{errors.title.message}</p>
              )}
            </div>
          </div>

          <label className="block mb-2 font-medium px-10">Llenguatge *</label>
          <div className="flex flex-wrap gap-3 mb-4 px-10">
            {asideContentForTechnicalTest.map((cat) => {
              const IconComponent = cat.icon as unknown as React.FC<
                React.SVGProps<SVGSVGElement>
              >;
              return (
                <button
                  key={cat.label}
                  type="button"
                  onClick={() => handleLanguageSelect(cat.label)}
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
          <div className="h-6 px-10">
            {errors.language && (
              <p className="text-red-500 text-xs">{errors.language.message}</p>
            )}
          </div>

          <div className="flex flex-col px-10 mt-6">
            <label className="block mb-2 font-medium">Durada (minuts) *</label>
            <input
              type="number"
              {...register("duration", { valueAsNumber: true })}
              className="sm:w-1/2 p-2 border border-[#B91879] rounded-lg mb-4"
              min="1"
              placeholder="Ex: 60"
            />
            <div className="h-6">
              {errors.duration && (
                <p className="text-red-500 text-xs">{errors.duration.message}</p>
              )}
            </div>
          </div>

          <div className="flex flex-col px-10">
            <label className="block mb-2 font-medium">Dificultat *</label>
            <select
              {...register("difficulty")}
              className="sm:w-1/2 p-2 border border-[#B91879] rounded-lg mb-4 bg-white"
            >
              <option value="">Selecciona una dificultat</option>
              <option value="Easy">Fàcil</option>
              <option value="Medium">Mitjà</option>
              <option value="Hard">Difícil</option>
              <option value="Expert">Expert</option>
            </select>
            <div className="h-6">
              {errors.difficulty && (
                <p className="text-red-500 text-xs">
                  {errors.difficulty.message}
                </p>
              )}
            </div>
          </div>

          <div className="border-t border-gray-300 my-8"></div>

          <label className="block my-4 px-10 mb-8 font-medium">
            Contingut de la prova
          </label>
          <div className="flex gap-2 mx-10 mb-10 border-2 border-gray-500 shadow-sm w-fit rounded-full p-1 ">
            <button
              type="button"
              className={`px-8 py-2 rounded-full cursor-pointer ${
                contentType === "text" ? "bg-[#B91879] text-white" : "bg-white"
              }`}
              onClick={() => setContentType("text")}
            >
              Text
            </button>
            <button
              type="button"
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
                {...register("description")}
                onChange={(e) => setValue("description", e.target.value)}
                maxLength={charLimitDescription}
                className="w-full min-h-[350px] p-2 border border-gray-300 rounded-bl-lg rounded-br-lg border-t-0 mb-4"
              />
              <div className="flex w-full justify-end me-10 text-sm text-gray-500">
                <span className="self-end">
                  {descriptionValue?.length || 0}/{charLimitDescription}
                </span>
              </div>
              <div className="h-6">
                {errors.description && (
                  <p className="text-red-500 text-xs">
                    {errors.description.message}
                  </p>
                )}
              </div>
            </div>
          ) : (
            <div className="my-3">
              <PdfUploadComponent onFileSelect={setFile} />
            </div>
          )}

          <TagInput
            selectedTags={selectedTags}
            setselectedTags={handleTagChange}
            selectedCategory={selectedLanguage}
          />
          <div className="h-6 px-10">
            {errors.tags && (
              <p className="text-red-500 text-xs">{errors.tags.message}</p>
            )}
          </div>
        </form>
      </div>
    </Container>
  );
};
