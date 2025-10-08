import { FC, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { categories } from "../data/categories";
import { ResourcesLayout } from "../components/resources/ResourcesLayout";
import { ResourcesFiltersProvider } from "../context/ResourcesFiltersContext";
import { useResources } from "../context/ResourcesContext";
import PageTitle from "../components/ui/PageTitle";

const ResourcesPage: FC = () => {
  const { resources } = useResources();
  const { category } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!category) {
      navigate(`/resources/${categories[0]}`);
    }
  }, [category, navigate]);

  return (
    <ResourcesFiltersProvider>
      <PageTitle title={`${category}`} />
     
        <ResourcesLayout resources={resources} category={category} />
      
    </ResourcesFiltersProvider>
  );
};

export default ResourcesPage;
