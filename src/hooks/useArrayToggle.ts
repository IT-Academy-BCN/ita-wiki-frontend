import { useCallback } from "react";

export const useArrayToggle = <T>(
  setSelectedItems: React.Dispatch<React.SetStateAction<T[]>>,
) => {
  const toggleItem = useCallback(
    (item: T) => {
      setSelectedItems((prev) =>
        prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item],
      );
    },
    [setSelectedItems],
  );

  return toggleItem;
};
