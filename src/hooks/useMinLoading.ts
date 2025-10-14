import { useEffect, useState } from "react";

export function useMinLoading(isLoading: boolean, minDuration = 1500) {
  const [showLoader, setShowLoader] = useState(isLoading);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout> | null = null;

    if (isLoading) {
      setShowLoader(true);
    } else {
      timeout = setTimeout(() => setShowLoader(false), minDuration);
    }

    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [isLoading, minDuration]);

  return showLoader;
}
