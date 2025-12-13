import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router";
import { ArrowLeftIcon } from "lucide-react";
import { toast } from "sonner";
import { asideContentForTechnicalTest } from "../Layout/aside/asideContent";
import { createTechnicalTest } from "../../api/endPointTechnicalTests";
import { formatDocumentIcons } from "../../icons/formatDocumentIconsArray";
import PdfUploadComponent from "../atoms/PdfUploadComponent";
import Container from "../ui/Container";
import TagInput from "../forms/TagInput";
import { technicalTestSchema } from "../../validations/technicalTestSchema";

type TechnicalTestFormData = z.infer<typeof technicalTestSchema>;

export const TechnicalTestForm = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    control,
    watch,
    formState: { errors },
  } = useForm<TechnicalTestFormData>({
    resolver: zodResolver(technicalTestSchema),
    defaultValues: {
      title: "",
      description: "",
      language: undefined,
      duration: undefined,
      difficulty: undefined,
      tags: [],
      contentType: "text",
      file: [],
    },
  });

  const [titleValue, descriptionValue, contentType, language] = watch([
    "title",
    "description",
    "contentType",
    "language",
  ]);

  const onSubmit = async (data: TechnicalTestFormData) => {
    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("language", data.language);
    formData.append("duration", String(data.duration));
    formData.append("difficulty", data.difficulty);

    if (contentType === "text") {
      formData.append("description", data.description || "");
    } else if (data.file && data.file.length > 0) {
      formData.append("file", data.file[0]);
    }

    if (data.tags && Array.isArray(data.tags) && data.tags.length > 0) {
      data.tags.forEach((tag) => {
        formData.append("tags[]", String(tag.id));
      });
    }

    try {
      await createTechnicalTest(formData);
      toast.success("Prova tècnica publicada amb èxit!");
      reset();
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
              onClick={handleSubmit(onSubmit)}
              className="px-4 py-2 bg-primary text-white rounded-lg w-1/2 h-fit hover:shadow-md cursor-pointer"
            >
              Publicar
            </button>
          </div>
        </div>

        <div className="border-t border-gray-300 my-8"></div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col px-10">
            <label className="block mb-2 mt-8 font-medium">Títol *</label>
            <input
              type="text"
              {...register("title")}
              className="sm:w-1/2 p-2 border border-[#B91879] rounded-lg mb-4"
              maxLength={charLimitTitle}
            />
            <div className="sm:w-1/2 self-end sm:me-10 text-sm text-gray-500">
              <span>
                {titleValue?.length || 0}/{charLimitTitle}
              </span>
            </div>
            <div className="py-4">
              {errors.title && (
                <p className="text-red-500 text-xs">{errors.title.message}</p>
              )}
            </div>
          </div>

          <div className="px-10">
            <label className="block font-medium mb-2">Llenguatge *</label>
            <Controller
              name="language"
              control={control}
              render={({ field }) => (
                <div className="flex flex-wrap gap-3 mb-4">
                  {asideContentForTechnicalTest.map((cat) => {
                    const IconComponent = cat.icon;
                    return (
                      <button
                        key={cat.label}
                        type="button"
                        onClick={() => field.onChange(cat.label)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 hover:shadow-md cursor-pointer ${
                          field.value === cat.label
                            ? "border-3 border-[#B91879] bg-white"
                            : "border-gray-300 bg-white"
                        }`}
                      >
                        <IconComponent className="w-5 h-5" />
                        <span className="text-sm font-medium">{cat.label}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            />
            {errors.language && (
              <div className="py-4">
                <p className="text-red-500 text-xs">
                  {errors.language.message}
                </p>
              </div>
            )}
          </div>

          <div className="flex flex-col px-10 mt-8">
            <label className="block mb-2 font-medium">Durada (minuts) *</label>
            <input
              type="number"
              {...register("duration", { valueAsNumber: true })}
              className="sm:w-1/2 p-2 border border-[#B91879] rounded-lg"
              min="1"
              placeholder="Ex: 60"
            />
            {errors.duration && (
              <div className="py-4">
                <p className="text-red-500 text-xs">
                  {errors.duration.message}
                </p>
              </div>
            )}
          </div>

          <div className="flex flex-col px-10 mt-8">
            <label className="block mb-2 font-medium">Dificultat *</label>
            <select
              {...register("difficulty")}
              className="sm:w-1/2 p-2 border border-[#B91879] rounded-lg bg-white"
            >
              <option value="">Selecciona una dificultat</option>
              <option value="Easy">Fàcil</option>
              <option value="Medium">Mitjà</option>
              <option value="Hard">Difícil</option>
              <option value="Expert">Expert</option>
            </select>
            {errors.difficulty && (
              <div className="py-4">
                <p className="text-red-500 text-xs">
                  {errors.difficulty.message}
                </p>
              </div>
            )}
          </div>

          <div className="border-t border-gray-300 my-8"></div>

          <div className="my-4 px-10">
            <label className="block mb-2 font-medium">
              Contingut de la prova
            </label>
            <Controller
              name="contentType"
              control={control}
              render={({ field }) => (
                <div className="flex gap-2 mb-10 border-2 border-gray-500 shadow-sm w-fit rounded-full p-1">
                  <button
                    type="button"
                    className={`px-8 py-2 rounded-full cursor-pointer ${
                      field.value === "text"
                        ? "bg-[#B91879] text-white"
                        : "bg-white"
                    }`}
                    onClick={() => field.onChange("text")}
                  >
                    Text
                  </button>
                  <button
                    type="button"
                    className={`px-6 py-2 rounded-full cursor-pointer ${
                      field.value === "file"
                        ? "bg-[#B91879] text-white"
                        : "bg-white"
                    }`}
                    onClick={() => field.onChange("file")}
                  >
                    Fitxer
                  </button>
                </div>
              )}
            />
          </div>

          {contentType === "text" ? (
            <div className="flex flex-col px-10">
              <span className="w-full flex gap-10 p-2 px-5 border border-gray-300 rounded-tl-lg rounded-tr-lg">
                {formatDocumentIcons.map((btn) => {
                  const IconComponent = btn.icon;
                  return <IconComponent key={btn.label} className="w-5 h-5" />;
                })}
              </span>
              <textarea
                {...register("description")}
                maxLength={charLimitDescription}
                className="w-full min-h-[350px] p-2 border border-gray-300 rounded-bl-lg rounded-br-lg border-t-0 mb-4"
              />
              <div className="flex w-full justify-end me-10 text-sm text-gray-500">
                <span className="self-end">
                  {descriptionValue?.length || 0}/{charLimitDescription}
                </span>
              </div>
              {errors.description && (
                <div className="py-4">
                  <p className="text-red-500 text-xs">
                    {errors.description.message}
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="my-4 px-10">
              <Controller
                name="file"
                control={control}
                render={({ field }) => (
                  <PdfUploadComponent
                    value={field.value}
                    onFileSelect={(file) => field.onChange(file ? [file] : [])}
                  />
                )}
              />
              {errors.file && (
                <div className="py-4">
                  <p className="text-red-500 text-xs">{errors.file.message}</p>
                </div>
              )}
            </div>
          )}

          <div className="my-4 px-10">
            <Controller
              name="tags"
              control={control}
              render={({ field }) => (
                <TagInput
                  selectedTags={field.value || []}
                  setselectedTags={field.onChange}
                  selectedCategory={language || ""}
                />
              )}
            />
            {errors.tags && (
              <div className="py-4">
                <p className="text-red-500 text-xs">{errors.tags.message}</p>
              </div>
            )}
          </div>
        </form>
      </div>
    </Container>
  );
};
