import { useNavigate } from "react-router";
import addIcon from "../assets/svg/add.svg";
import settingsIcon from "../assets/svg/settings.svg";
import userIcon from "../assets/svg/user2.svg";
import searchIcon from "../assets/svg/search.svg";
import ButtonComponent from "../components/atoms/ButtonComponent";
import { Modal } from "../components/Modal/Modal";
import { useCtxUser } from "../hooks/useCtxUser";
import { useState } from "react";
import GitHubLogin from "../components/github-login/GitHubLogin";
import menubars from "../assets/svg/Vector-7.svg";

const HeaderComponent = () => {
  const { user, signIn } = useCtxUser();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [loginError, setLoginError] = useState(false);

  const goToResourcesPage = () => {
    navigate("/resources/add");
  };
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleSignIn = async () => {
    if (!isChecked) {
      setLoginError(true);
      return;
    }
    try {
      await signIn();
      setIsModalOpen(false);
    } catch {
      setLoginError(true);
    }
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    setLoginError(false);
  };
  const { isTablet, isMobile, toggleMainMenu } = useCtxUser();
  return (
    <header className="main__header grid bg-[#ebebeb] justify-end gap-6 items-center pr-6">
      {isTablet || isMobile ? (
        <button onClick={toggleMainMenu} type="button">
          <img src={menubars} alt="logo" width={"32"} height={32} />
        </button>
      ) : (
        <>
          <section className="flex justify-end">
            <article className="relative inline-flex cursor-pointer">
              <input
                type="text"
                placeholder="Buscar recurso"
                className="bg-white pl-10 pr-4 py-2 border border-white font-semibold text-base rounded-lg
                   focus:outline-none focus:ring-2 focus:ring-[#808080]"
              />
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#808080]">
                <svg
                  xmlns={searchIcon}
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.9 14.32a8 8 0 111.42-1.42l4.83 4.83a1 1 0 01-1.42 1.42l-4.83-4.83zM8 14a6 6 0 100-12 6 6 0 000 12z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </article>
          </section>
          <section className="flex gap-4 justify-end items-center">
            {user && (
              <ButtonComponent
                icon={addIcon}
                variant="icon"
                onClick={goToResourcesPage}
              />
            )}
            <select
              title="lang"
              className="bg-white py-2 px-4 text-[#808080] rounded-lg border border-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#808080] focus:border-transparent"
            >
              <option>ES</option>
              <option>EN</option>
            </select>
            <ButtonComponent icon={settingsIcon} variant="icon" />
            <ButtonComponent
              icon={userIcon}
              variant="icon"
              onClick={openModal}
            />
            {isModalOpen && (
              <Modal closeModal={closeModal} title="Inicio sesión">
                <GitHubLogin onClick={handleSignIn} />
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
          </section>
        </>
      )}
    </header>
  );
};

export default HeaderComponent;
