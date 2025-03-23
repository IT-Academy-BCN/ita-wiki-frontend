import Categories from "./Categories";
import Content from "./content/Content";
import { FC } from "react";
import LeftSideBarBody from "./LeftSideBarBody";
import { useResize } from "../../hooks/useResize";
interface BodyProps {
  children: React.ReactNode;
}
const Body: FC<BodyProps> = ({ children }) => {
  const { isMobile, isDesktop, isTablet } = useResize();
  return (
    <section className="flex flex-col lg:flex-row xl:grid xl:grid-cols-12 gap-4 p-4">
      <LeftSideBarBody>
        {isDesktop && (
          <Categories>
            <h2 className="text-2xl font-bold">Categorias</h2>
          </Categories>
        )}
        {isTablet && (
          <Categories>
            <h2 className="text-2xl font-bold">isTablet</h2>
          </Categories>
        )}
        {isMobile && (
          <Categories>
            <h2 className="text-2xl font-bold">Temas</h2>
          </Categories>
        )}
      </LeftSideBarBody>
      <Content>{children}</Content>
    </section>
  );
};

export default Body;
