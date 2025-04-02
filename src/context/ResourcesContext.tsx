import { createContext, useContext, useEffect, useState } from "react";
import { IntResource } from "../types";
import { getResources } from "../api/endPointResources";
import mock from "../moock/resources.json";

interface ResourcesContextType {
  resources: IntResource[];
  isLoading: boolean;
}

const ResourcesContext = createContext<ResourcesContextType>({
  resources: [],
  isLoading: true,
});

export const useResources = () => useContext(ResourcesContext);

export const ResourcesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [resources, setResources] = useState<IntResource[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const data = await getResources();
        setResources(data);
      } catch (err) {
        console.error("Error loading resources, using mock.", err);
        setResources(mock.resources as IntResource[]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResources();
  }, []);

  return (
    <ResourcesContext.Provider value={{ resources, isLoading }}>
      {children}
    </ResourcesContext.Provider>
  );
};
