import { useEffect, useState } from "react";
import { getResources } from "../../api/endPointResources";
import { IntResource } from "../../types";
import moock from "../../moock/resources.json";

interface IUseGetReources {
  isLoading: boolean;
  apiResources: IntResource[];
  handlerSetLaoding: (loading: boolean) => void;
  setRources: (apiResources: IntResource[]) => void;
}


export const useGetResources = (): IUseGetReources => {

  const [apiResources, setApiResources] = useState<IntResource[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const setRources = (apiResources: IntResource[]) => {
    setApiResources(() => apiResources);
  };
  const handlerSetLaoding = (loading: boolean) => {
    setIsLoading(() => loading);
  };

  useEffect(() => {
    const fetchResources = async () => {
      try {
        handlerSetLaoding(true);
        const data = await getResources();
        setRources(data);
      } catch (error) {
        console.error(
          "No se han podido obtener los recursos. Se cargan los recursos de moock.",
          error,
        );
        setRources(moock.resources as IntResource[]);
      } finally {
        handlerSetLaoding(false);
      }
    };

    fetchResources();
  }, []);

  return {
    isLoading,
    apiResources,
    setRources,
    handlerSetLaoding
  }
}