import { FC } from "react";
import { Link } from "react-router";
import logoItAcademy from "../assets/svg/LogoItAcademy.svg";
import close from "../assets/svg/close.svg";
import { useGlobalCtx } from "../hooks/useGlobalCtx";
import { useResourceCtx } from "../hooks/resources/useResourcesCtx";
import { EnuResourcesCategories } from "../enums";
import { ICONS } from "../config";

const AsideComponent: FC = () => {
  const { isDesktop, toggleMainMenu, closeMainMenu } = useGlobalCtx();
  const { selectCategory } = useResourceCtx();

  return (
    <>
      <section className="col-1 flex items-center pt-[21px] pl-[23px]">
        {!isDesktop ? (
          <button onClick={toggleMainMenu} type="button">
            <img src={close} alt="logo" width={"32"} height={32} />
          </button>
        ) : (
          <Link to="/">
            <img src={logoItAcademy} alt="logo" width={"116px"} height={29} />
          </Link>
        )}
      </section>
      <ul className="space-y-6 pt-[21px] pl-[23px] flex flex-col justify-center">

        {[...Object.values(EnuResourcesCategories)].map((item, index) => (
          <li
            key={index}
            className="flex items-center space-x-3"
            onClick={closeMainMenu}
          >
            <img src={ICONS[item as keyof typeof ICONS]} alt={item as string} className="w-6 h-6" />
            <Link onClick={() => selectCategory(item)} to={`/resources`}>{item}</Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default AsideComponent;
