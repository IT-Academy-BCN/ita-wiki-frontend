import { FC, useEffect, useState } from "react";
import { useParams } from "react-router";
import { IntResource } from "../types";
import { ListResources } from "../components/resources/ListResources";
import { getResources } from "../api/endPointResources";
import { categories } from "../data/categories";

const ResourcesPage: FC = () => {
  const { category } = useParams();
  const [apiResources, setApiResources] = useState<IntResource[]>([]);

  useEffect(() => {
    (async () => {
      const data = await getResources();
      setApiResources(() => data);
    })();
  }, []);

  return (
    <ListResources
      resources={apiResources}
      category={category as keyof typeof categories | undefined}
    />
  );
};

export default ResourcesPage;
