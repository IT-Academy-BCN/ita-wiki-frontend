import { FC, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import moock from "../../../moock/resources.json"
import { IntResource } from "../../../types";
import { useGlobalCtx } from "../../../hooks/useGlobalCtx";
import { EnuCategories } from "./filterOptions";
import { getResources } from "../../../api/endPointResources";
import { Main } from "../../../Layout/Main";
import Content from "../../../Layout/Content";
import { ListResources } from "./ListResources";
import RightSideBar from "../../../Layout/RightSideBar";

const ResourcesPage: FC = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const [apiResources, setApiResources] = useState<IntResource[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { isTablet, isDesktop } = useGlobalCtx();

  useEffect(() => {
    if (!category) {
      navigate(`/resources/${EnuCategories.All}`);
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
    <Main>
      <Content>
        <section
          className={`${isDesktop && "flex w-full bg-white lg:rounded-2xl"} ${isTablet ? "flex w-full bg-white lg:rounded-2xl" : "flex w-full bg-white"
            }`}
        >
          {isLoading ? (
            <div>Obteniendo los recursos...</div>
          ) : (
            <ListResources
              resources={apiResources}
              category={category as EnuCategories}
            />
          )}
        </section>
      </Content>

      <RightSideBar resources={apiResources} />
    </Main>
  );
};

export default ResourcesPage;
