import addIcon from "../assets/svg/add.svg";
import settingsIcon from "../assets/svg/settings.svg";
import userIcon from "../assets/svg/user2.svg";
import ButtonComponent from "../components/atoms/ButtonComponent";
import { useUserCtx } from "../hooks/useUserCtx";
import { FC } from "react";
import { useGlobalCtx } from "../hooks/useGlobalCtx";
import SearchResource, {
  SearchIcon,
} from "../components/resources/SearchResource";
import Language from "../components/language/Language";
import { useRedirectTo } from "../hooks/useRedirectTo";
import AccessModal from "../components/access/AccessModal";
import close from "../assets/svg/close.svg";
import ITAcademyLogo from "../components/ITAcademyLogo";
import { EnuModalKeys } from "../enums";

const MainHeader: FC = () => {
  const { user } = useUserCtx();
  const { isTablet, isMobile, isDesktop, toggleMainMenu, openModal } =
    useGlobalCtx();
  const { goTo } = useRedirectTo();

  return (
    <>
      {isTablet || isMobile ? (
        <button onClick={toggleMainMenu} type="button">
          <img src={close} alt="logo" width={"32"} height={32} />
        </button>
      ) : (
        <ITAcademyLogo />
      )}

      {isDesktop && (
        <>
          <section className="flex justify-end">
            <SearchResource>
              <SearchIcon />
            </SearchResource>
          </section>
          <section className="flex gap-4 justify-end items-center">
            {user && (
              <ButtonComponent
                icon={addIcon}
                variant="icon"
                onClick={() => goTo("/resources/add")}
              />
            )}
            <Language />
            <ButtonComponent icon={settingsIcon} variant="icon" />
            <ButtonComponent
              icon={userIcon}
              variant="icon"
              onClick={() => openModal(EnuModalKeys.ACCESS)}
            />
            <AccessModal />
          </section>
        </>
      )}
    </>
  );
};

export default MainHeader;
