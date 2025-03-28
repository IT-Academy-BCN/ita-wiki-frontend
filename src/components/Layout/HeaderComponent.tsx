import { Link, useNavigate, useLocation, useSearchParams } from "react-router";
import logoItAcademy from "../../assets/LogoItAcademy.svg";
import addIcon from "../../assets/add.svg";
import userIcon from "../../assets/user2.svg";
import ButtonComponent from "../atoms/ButtonComponent";
import { useCtxUser } from "../../hooks/useCtxUser";
import SearchComponent from "./header/SearchComponent";
import { useEffect, useState } from "react";
import { Modal } from "../Modal/Modal";
import GitHubLogin from "../github-login/GitHubLogin";

const HeaderComponent = () => {
  const { user, signIn } = useCtxUser();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const [resource, setResource] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [loginError, setLoginError] = useState(false);

  const goToResourcesPage = () => {
    navigate("/resources/add");
  };

  const isSearchDisabled = location.pathname === "/";

  const handleSearch = (query: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("search", query);
    navigate(`?${params.toString()}`);
  };

  useEffect(() => {
    const resourcePath =
      location.pathname.split("/resources/")[1]?.split("?")[0] || "";
    if (resourcePath !== resource) {
      setResource(resourcePath);
    }
  }, [location.pathname, resource]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async () => {
    if (!isChecked) {
      setLoginError(true);
      return;
    }
    setIsLoading(true);
    try {
      await signIn();
      setIsModalOpen(false);
    } catch {
      setLoginError(true);
    }
    setIsLoading(false);
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    setLoginError(false);
  };

  return (
    <header className="hidden lg:flex py-4 px-6 items-center justify-between">
      <Link to="/">
        <img src={logoItAcademy} alt="logo" width={"116px"} />
      </Link>
      <div className="flex gap-2 items-center">
        <SearchComponent
          onSearch={handleSearch}
          disabled={isSearchDisabled}
          resetTrigger={resource}
        />
        {user && (
          <ButtonComponent
            icon={addIcon}
            variant="icon"
            onClick={goToResourcesPage}
          />
        )}
        <div className="flex justify-center items-center">
          <select
            title="lang"
            className="bg-white p-2 text-[#808080] rounded-lg border border-white focus:outline-none focus:ring-2 focus:ring-[#808080] focus:border-transparent"
          >
            <option>ES</option>
            <option>EN</option>
          </select>
        </div>
        <div>
          <ButtonComponent
            icon={userIcon}
            variant="icon"
            text={user ? "" : "Iniciar sesión"}
            onClick={openModal}
          />
        </div>
        {isModalOpen && (
          <Modal closeModal={closeModal} title="Inicio sesión">
            <GitHubLogin onClick={handleSignIn} isLoading={isLoading} />
            <label htmlFor="terms" className="block mt-8">
              <input
                name="terms"
                id="terms"
                type="checkbox"
                onChange={handleCheckboxChange}
                checked={isChecked}
              ></input>
              Acepto términos legales
            </label>
            {loginError && (
              <div className="text-red-500 text-sm mt-2">
                <div className="text-red-500 text-sm mt-2 text-center">
                  Lo sentimos, no se ha podido iniciar sesión,
                  <br /> contacte con el administrador.
                </div>
              </div>
            )}
          </Modal>
        )}
      </div>
    </header>
  );
};

export default HeaderComponent;
