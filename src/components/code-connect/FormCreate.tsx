import { useState, FormEvent } from "react";
import {
  contentTechsFrontCodeConnect,
  contentTechsBackCodeConnect,
} from "../Layout/aside/asideContent";
// import { createCodeConnect } from "../../api/endPointCodeConnect";
import { formatDocumentIcons } from "../../icons/formatDocumentIconsArray";
import { ArrowLeftIcon } from "lucide-react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

type FormState = {
  title: string;
  techsFront: string[];
  techsBack: string[];
  description: string;
};

const FormCreate = () => {
  const [formData, setFormData] = useState<FormState>({
    title: "",
    techsFront: [],
    techsBack: [],
    description: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleTechsFrontToggle = (tech: string) => {
    setFormData((prev) => {
      const isSelected = prev.techsFront.includes(tech);
      return {
        ...prev,
        techsFront: isSelected
          ? prev.techsFront.filter((item) => item !== tech)
          : [...prev.techsFront, tech],
      };
    });
  };

  const handleTechsBackToggle = (tech: string) => {
    setFormData((prev) => {
      const isSelected = prev.techsBack.includes(tech);
      return {
        ...prev,
        techsBack: isSelected
          ? prev.techsBack.filter((item) => item !== tech)
          : [...prev.techsBack, tech],
      };
    });
  };

  const handleInputChange = (
    field: keyof Omit<FormState, "techsFronts">,
    value: string,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const validateForm = (): boolean => {
    const { title, techsFront, techsBack, description } = formData;

    if (!title.trim() || !techsFront || !techsBack || !description.trim()) {
      toast.error("Completa tots els camps obligatoris.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    const formPayload = new FormData();
    formPayload.append("title", formData.title);
    formData.techsFront.forEach((item) => {
      formPayload.append("techsFront[]", item);
    });
    formData.techsBack.forEach((item) => {
      formPayload.append("techsBack[]", item);
    });
    formPayload.append("description", formData.description);

    try {
      const result = formPayload;
      // TODO remove console.log, uncomment result
      // const result = await createCodeConnect(formPayload);
      console.log("Guardat:", result);
      toast.success("Code Connect publicat amb èxit");
      navigate("/codeconnect", {
        state: { successMessage: "Code Connect publicat amb èxit" },
      });
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error en publicar Code Connect");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col lg:flex-row justify-between">
        <div>
          <a
            className="text-[#B91879] cursor-pointer text-sm"
            onClick={() => navigate("/codeconnect")}
          >
            <ArrowLeftIcon
              className="inline text-[#B91879] mb-2 me-1"
              size="16px"
            ></ArrowLeftIcon>
            Tornar a Code Connect
          </a>
          <h2 className="text-2xl font-semibold mt-2">Nou Code Connect</h2>
        </div>
        <div className="flex items-center justify-end gap-4 mt-6 lg:mt-0">
          <button
            onClick={() => navigate("/codeconnect")}
            disabled={isSubmitting}
            className="px-4 py-2 border border-gray-400 rounded-lg w-1/2 h-fit hover:shadow-md cursor-pointer"
          >
            Cancel·lar
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 bg-primary text-white rounded-lg w-1/2 h-fit hover:shadow-md cursor-pointer"
          >
            {isSubmitting ? "Publicant..." : "Publicar"}
          </button>
        </div>
      </div>

      <div className="mx-[-3.7rem] border-t border-gray-300 my-8"></div>

      <div className="flex flex-col lg:w-1/2">
        <label htmlFor="title" className="block mb-2 mt-8 font-medium">
          Títol *
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={(e) => handleInputChange("title", e.target.value)}
          disabled={isSubmitting}
          className="p-2 border border-gray-600 focus:outline-none focus:ring-1 focus:ring-[#B91879] focus:border-[#B91879] rounded-lg mb-4"
          maxLength={65}
          required
        />
        <div className="self-end text-sm text-gray-500">
          <span>{formData.title.length}/65</span>
        </div>
      </div>

      <fieldset disabled={isSubmitting}>
        <label className="block mb-2 font-medium">Tecnologia Frontend *</label>
        <div className="flex flex-wrap gap-3 mb-4">
          {contentTechsFrontCodeConnect.map((item) => {
            const IconComponent = item.icon;
            const isSelected = formData.techsFront.includes(item.label);

            return (
              <label
                key={item.label}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 hover:shadow-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${
                  isSelected
                    ? "border-3 border-[#B91879] bg-white text-black"
                    : "border-gray-300 bg-white text-black"
                }`}
              >
                <input
                  type="checkbox"
                  name="techsFront[]"
                  value={item.label}
                  checked={isSelected}
                  onChange={() => handleTechsFrontToggle(item.label)}
                  className="sr-only"
                />
                <IconComponent className="w-5 h-5" />
                <span className="text-sm font-medium">{item.label}</span>
              </label>
            );
          })}
        </div>
      </fieldset>

      <fieldset disabled={isSubmitting}>
        <label className="block mb-2 font-medium">Tecnologia Backend*</label>
        <div className="flex flex-wrap gap-3 mb-4">
          {contentTechsBackCodeConnect.map((item) => {
            const IconComponent = item.icon;
            const isSelected = formData.techsBack.includes(item.label);

            return (
              <label
                key={item.label}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 hover:shadow-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${
                  isSelected
                    ? "border-3 border-[#B91879] bg-white text-black"
                    : "border-gray-300 bg-white text-black"
                }`}
              >
                <input
                  type="checkbox"
                  name="techsBack[]"
                  value={item.label}
                  checked={isSelected}
                  onChange={() => handleTechsBackToggle(item.label)}
                  className="sr-only"
                />
                <IconComponent className="w-5 h-5" />
                <span className="text-sm font-medium">{item.label}</span>
              </label>
            );
          })}
        </div>
      </fieldset>

      <div className="mx-[-3.7rem] border-t border-gray-300 my-8"></div>

      <div className="lg:w-2/3">
        <label htmlFor="description" className="block my-4 mb-8 font-medium">
          Descripció *
        </label>
        <div className="flex flex-col">
          <span className="w-full flex gap-10 p-2 px-5 border border-gray-600 rounded-tl-lg rounded-tr-lg">
            {formatDocumentIcons.map((btn) => {
              const IconComponent = btn.icon;
              return <IconComponent key={btn.label} className="w-5 h-5" />;
            })}
          </span>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
            disabled={isSubmitting}
            maxLength={1000}
            className="w-full min-h-[350px] p-2 border border-gray-600 rounded-bl-lg rounded-br-lg border-t-0 mb-4 focus:outline-none focus:ring-1 focus:ring-[#B91879] focus:border-[#B91879]"
          />
          <div className="flex w-full justify-end me-10 text-sm text-gray-500">
            <span className="self-end">{formData.description.length}/1000</span>
          </div>
        </div>
      </div>

      <div className="lg:w-2/3">
        <label htmlFor="roadmap" className="block my-4 mb-4 font-medium">
          Data límit d'inscripió *
        </label>
      </div>

      <div className="lg:w-2/3">
        <label htmlFor="roadmap" className="block my-4 mb-4 font-medium">
          Durada del projecte *
        </label>
      </div>

      <div className="lg:w-2/3">
        <label htmlFor="roadmap" className="block my-4 mb-4 font-medium">
          Nombre de programadors frontend *
        </label>
      </div>

      <div className="lg:w-2/3">
        <label htmlFor="roadmap" className="block my-4 mb-4 font-medium">
          Nombre de programadors backend *
        </label>
      </div>
    </form>
  );
};

export default FormCreate;
