import { FC, Suspense } from "react";
import { ListResources } from "../../components/resources/ListResources";
import { useGlobalCtx } from "../../hooks/useGlobalCtx";
import Content from "../../layouts/Content";
import { Main } from "../../layouts/Main";
import RightSideBar from "../../layouts/RightSideBar";
import { useGetResources } from "../../hooks/resources/useGetResources";
import Loading from "../../components/Loading";

const ResourcesPage: FC = () => {
  const { isLoading, apiResources } = useGetResources();
  const { isTablet, isDesktop } = useGlobalCtx();
  const classList = {
    desktop: `flex w-full bg-white lg:rounded-2xl `,
    tablet: `flex w-full bg-white lg:rounded-2xl `,
    mobile: `flex w-full bg-white`, // por ahora igual que tablet
  };

  return (
    <Suspense fallback={<Loading />}>
      <Main>
        <Content>
          <section
            className={`${isDesktop && classList.desktop} ${isTablet ? classList.tablet : classList.mobile}`}
          >
            {isLoading ? (
              <div>Obteniendo los recursos...</div>
            ) : (
              <ListResources />
            )}
          </section>
        </Content>

        <RightSideBar resources={apiResources} />
      </Main>
    </Suspense>
  );
};

export default ResourcesPage;
