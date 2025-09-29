import { useCallback } from "react";

/**
 * Custom hook for toggling items in an array
 * @param selectedItems - Array of currently selected items
 * @param setSelectedItems - Function to update the selected items
 * @returns Function to toggle an item in the array
 */
export const useArrayToggle = <T>(
  selectedItems: T[],
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
