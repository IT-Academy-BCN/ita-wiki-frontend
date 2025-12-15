import { Controller } from "react-hook-form";
import PdfUploadComponent from "../atoms/PdfUploadComponent";
import Container from "../ui/Container";
import TagInput from "../forms/TagInput";
import FormHeader from "../forms/FormHeader";
import TitleInput from "../forms/TitleInput";
import DescriptionTextarea from "../forms/DescriptionTextarea";
import { useTechnicalTestForm } from "../../hooks/useTechnicalTestForm";

export const TechnicalTestForm = () => {
  const { form, onSubmit, handleCancel } = useTechnicalTestForm();

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = form;

  const [titleValue, descriptionValue, contentType, language] = watch([
    "title",
    "description",
    "contentType",
    "language",
  ]);

  return (
    <Container className="!p-0">
      <div className="py-10">
        <FormHeader
          title="Nova prova tècnica"
          textBack="Tornar a proves tècniques"
          onCancel={handleCancel}
          onPublish={handleSubmit(onSubmit)}
        />

        <form onSubmit={handleSubmit(onSubmit)}>
          <TitleInput
            register={register}
            errors={errors}
            currentLength={titleValue?.length || 0}
          />

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
            <DescriptionTextarea
              register={register}
              errors={errors}
              currentLength={descriptionValue?.length || 0}
            />
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
