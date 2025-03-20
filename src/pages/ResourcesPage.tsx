import { FC, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { Categories, IntResource } from "../types";
import { ListResources } from "../components/resources/ListResources";
import { getResources } from "../api/endPointResources";
import { categories } from "../data/categories";
import moock from "../moock/resources.json";
import { useGlobalCtx } from "../hooks/useGlobalCtx";
import { Main } from "../Layout/Main";
import Content from "../Layout/Content";
import RightSideBar from "../Layout/RightSideBar";

const ResourcesPage: FC = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const [apiResources, setApiResources] = useState<IntResource[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { isTablet, isDesktop } = useGlobalCtx();

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
  const classList = {
    desktop: `flex w-full bg-white lg:rounded-2xl `,
    tablet: `flex w-full bg-white lg:rounded-2xl `,
    mobile: `flex w-full bg-white`, // por ahora igual que tablet
  };
  return (
    <Main>
      <Content>
        <section className={`${isDesktop && classList.desktop} ${isTablet ? classList.tablet : classList.mobile}`}>
          {isLoading ? (
            <div>Obteniendo los recursos...</div>
          ) : (
            <ListResources
              resources={apiResources}
              category={category as Categories}
            />
          )}
        </section>
      </Content>

      <RightSideBar resources={apiResources} />

    </Main>
  );
};

export default ResourcesPage;
