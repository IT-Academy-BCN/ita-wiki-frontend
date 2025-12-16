import { useEffect } from "react";
import { useFieldArray } from "react-hook-form";
import { CirclePlus, Trash2 } from "lucide-react";
import type { Control } from "react-hook-form";

type ExerciseItem = {
  name: string;
};

type FormValues = {
  exercises: ExerciseItem[];
};

type Props = {
  control: Control<FormValues>;
};

const FieldExercise = ({ control }: Props) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "exercises",
  });

  const addExerciseHandler = () => {
    append({
      name: "",
    });
  };

  const removeExerciseHandler = (index: number) => {
    if (fields.length > 1) {
      remove(index);
    }
  };

  useEffect(() => {
    if (fields.length === 0) {
      append({ name: "" });
    }
  }, [fields.length, append]);

  return (
    <>
      {fields.map((field, index) => (
        <div
          key={field.id}
          className="flex gap-4 justify-between items-center mt-4"
        >
          <input
            type="text"
            // TODO send this data to db
            // {...register(`exercise.${index}.name`)}
            className="sm:w-full p-2 border border-[#B91879] rounded-lg"
            maxLength={200}
            aria-label={`Exercise ${index + 1}`}
            placeholder="Afegir un nou exercici"
          />
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={addExerciseHandler}
              aria-label="Afegir camp exercici"
            >
              <CirclePlus size={16} aria-hidden="true" />
            </button>
            {fields.length > 1 && (
              <button
                type="button"
                onClick={() => removeExerciseHandler(index)}
                aria-label={`Eliminar exercici ${index + 1}`}
              >
                <Trash2 size={16} aria-hidden="true" />
              </button>
            )}
          </div>
        </div>
      ))}
    </>
  );
};

export default FieldExercise;
