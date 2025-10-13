import { useState } from "react";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router";
import { useUserContext } from "../../context/UserContext";
import classNames from "classnames";
//import BookmarkFigmaIcon from "../../icons/BookmarkFigmaIcon";
//import { ReactComponent as Bookmark } from "../../assets/Bookmark.svg";

import Bookmark from "../../assets/Bookmark.svg";
import CreatedResources from "../../assets/CreatedResources.svg";
//import CreatedFigmaIcon from "../../icons/CreatedFigmaIcon";
import SearchComponent from "./header/SearchComponent";
import ButtonComponent from "../atoms/ButtonComponent";
import LoginModal from "../Modal/LoginModal";

const AsideComponent: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [resource] = useState("");
  const { user } = useUserContext();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [redirectPath, setRedirectPath] = useState<string | null>(null);

  const handleSearch = (query: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("search", query);
    navigate(`?${params.toString()}`);
  };

  const isPathActive = (path: string) => {
    return currentPath === path;
  };

  const isResourcesPathActive = (generalPath: string) => {
    return (
      location.pathname.startsWith(generalPath) &&
      !location.pathname.includes("technical")
    );
  };

  const handleProtectedClick = (path: string) => {
    if (user) {
      navigate(path);
    } else {
      setRedirectPath(path);
      setIsLoginModalOpen(true);
    }
  };

  const handleLoginModalClose = () => {
    setIsLoginModalOpen(false);

    if (user && redirectPath) {
      navigate(redirectPath);
      setRedirectPath(null);
    }
  };

  return (
    <aside className="flex flex-col px-6 lg:w-56 py-4">
      <SearchComponent onSearch={handleSearch} resetTrigger={resource} />
      <LoginModal visible={isLoginModalOpen} onClose={handleLoginModalClose} />
      <section className="w-[200px]">
        <ButtonComponent
          className="my-5 w-full"
          type="button"
          variant="primary"
          onClick={() => handleProtectedClick("/resources/add")}
        >
          Crear recurso
        </ButtonComponent>
      </section>

      <section>
        <ul className="py-6 space-y-3">
          <li className="flex items-center space-x-3 mb-5">
            {isPathActive("/") && (
              <span className="w-3 h-3 rounded-full bg-primary" />
            )}
            <Link
              to="/"
              className={classNames("transition-colors", {
                "!text-black !font-bold": isPathActive("/"),
                "text-gray-400": !isPathActive("/"),
              })}
            >
              Inicio
            </Link>
          </li>
          <li className="flex items-center space-x-3 mb-5">
            {isResourcesPathActive("/resources/") && (
              <span className="w-3 h-3 rounded-full bg-primary" />
            )}
            <Link
              to="/resources/React"
              className={classNames("transition-colors", {
                "!text-black !font-bold": isResourcesPathActive("/resources/"),
                "text-gray-400": !isResourcesPathActive("/resources/"),
              })}
            >
              Recursos
            </Link>
          </li>

          <li className="flex items-center space-x-3">
            {isPathActive("/resources/technical-test/all-tech-tests") && (
              <span className="w-3 h-3 rounded-full bg-primary" />
            )}
            <Link
              to="/resources/technical-test/all-tech-tests"
              className={classNames("transition-colors", {
                "!text-black !font-bold": isPathActive(
                  "/resources/technical-test/all-tech-tests",
                ),
                "text-gray-400": !isPathActive(
                  "/resources/technical-test/all-tech-tests",
                ),
              })}
            >
              Pruebas técnicas
            </Link>
          </li>
        </ul>
      </section>

      <section className="py-6">
        <p className="pb-3 font-bold text-lg mb-2 text-black">Mis recursos</p>

        <div className="flex flex-col gap-4">
          {/* Guardados */}
          <div
            onClick={() => handleProtectedClick("/resources/bookmarks")}
            className="flex items-center space-x-3 py-1 cursor-pointer"
          >
            <img src={Bookmark} alt="Bookmark icon" className="w-6 h-6" />
            <div
              className={classNames("transition-colors", {
                "!text-black !font-bold": isPathActive("/resources/bookmarks"),
                "text-gray-foreground": !isPathActive("/resources/bookmarks"),
              })}
            >
              Guardados
            </div>
          </div>

          {/* Creados */}
          <div
            onClick={() => handleProtectedClick("/resources/my-resources")}
            className="flex items-center space-x-3 py-1 cursor-pointer"
          >
            <img
              src={CreatedResources}
              alt="Create resources icon"
              className="w-6 h-6"
            />
            <div
              className={classNames("transition-colors", {
                "!text-black !font-bold": isPathActive(
                  "/resources/my-resources",
                ),
                "text-gray-foreground": !isPathActive(
                  "/resources/my-resources",
                ),
              })}
            >
              Creados
            </div>
          </div>
        </div>
      </section>
    </aside>
  );
};

export default AsideComponent;
