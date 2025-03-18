import { FC, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { IntResource } from "../types";
import { ListResources } from "../components/resources/ListResources";
import { getResources } from "../api/endPointResources";
import { categories } from "../data/categories";
import moock from "../moock/resources.json";
import MainContent from "../Layout/MainContent";
import { getPersonalResources } from "../api/userApi";
import { useCtxUser } from "../hooks/useCtxUser";
import { ListMyResources } from "../components/resources/ListMyResources";

const ResourcesPage: FC = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const [apiResources, setApiResources] = useState<IntResource[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useCtxUser();
  const personalResources = getPersonalResources(user, apiResources);
  useEffect(() => {
    if (!category) {
      navigate(`/resources/${categories[0]}`);
    }
  }, [category, navigate]);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        setIsLoading(true);
        const data = await getResources();
        setApiResources(data);
      } catch (error) {
        console.error(
          "No se han podido obtener los recursos. Se cargan los recursos de moock.",
          error,
        );
        setApiResources(moock.resources as IntResource[]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResources();
  }, []);

  return (
    <MainContent>
      <section className="flex w-full bg-white rounded-2xl px-4 py-6 sm:px-6 lg:pl-8 xl:shrink-0 xl:pl-6">
        {isLoading ? (
          <div>Obteniendo los recursos...</div>
        ) : (
          <ListResources
            resources={apiResources}
            category={category as keyof typeof categories | undefined}
          />
        )}
      </section>
      <section className="flex flex-col w-full">
        <article className="bg-white sm:rounded-xl px-4 py-6 sm:px-6 lg:pl-8 xl:shrink-0 xl:pl-6">
          <h3 className="text-[22px] font-bold">Lista de lectura</h3>
        </article>
        {user && personalResources.length > 0 && (
          <ListMyResources myResources={personalResources} />
        )}
      </section>
    </MainContent>
  );
};

export default ResourcesPage;
