import { FC, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { categories } from "../data/categories";
import { ListResources } from "../components/resources/ListResources";
import { useResources } from "../context/ResourcesContext";

const ResourcesPage: FC = () => {
  const { resources, isLoading } = useResources();
  const { category } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!category) {
      navigate(`/resources/${categories[0]}`);
    }
  }, [category, navigate]);

  return isLoading ? (
    <div>Obteniendo los recursos...</div>
  ) : (
    <ListResources
      resources={resources}
      category={category as keyof typeof categories | undefined}
    />
  );
};

export default ResourcesPage;
