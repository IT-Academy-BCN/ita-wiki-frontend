import { FC } from "react";
import { ListResources } from "../../components/resources/ListResources";
import { useGlobalCtx } from "../../hooks/useGlobalCtx";
import { EnuResourcesCategories } from "../../enums";
import Content from "../../layouts/Content";
import { Main } from "../../layouts/Main";
import RightSideBar from "../../layouts/RightSideBar";
import { useCategories } from "../hooks/useCategories";
import { useGetResources } from "../hooks/useGetResources";

const ResourcesPage: FC = () => {
  const { isLoading, apiResources } = useGetResources();
  const { isTablet, isDesktop } = useGlobalCtx();
  const { category } = useCategories();

  const classList = {
    desktop: `flex w-full bg-white lg:rounded-2xl `,
    tablet: `flex w-full bg-white lg:rounded-2xl `,
    mobile: `flex w-full bg-white`, // por ahora igual que tablet
  };

  return (
    <Main>
      <Content>
        <section
          className={`${isDesktop && classList.desktop} ${isTablet ? classList.tablet : classList.mobile}`}
        >
          {isLoading ? (
            <div>Obteniendo los recursos...</div>
          ) : (
            <ListResources
              resources={apiResources}
              category={category as EnuResourcesCategories}
            />
          )}
        </section>
      </Content>

      <RightSideBar resources={apiResources} />
    </Main>
  );
};

export default ResourcesPage;
