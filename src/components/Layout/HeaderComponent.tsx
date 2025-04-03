import {
  Link,
  useNavigate,
  useLocation,
  useSearchParams,
} from "react-router";
import logoItAcademy from "../../assets/LogoItAcademy.svg";
import addIcon from "../../assets/add.svg";
import userIcon from "../../assets/user2.svg";
import ButtonComponent from "../atoms/ButtonComponent";
import { useCtxUser } from "../../hooks/useCtxUser";
import SearchComponent from "./header/SearchComponent";
import { useEffect, useRef, useState } from "react";
import { Modal } from "../Modal/Modal";
import GitHubLogin from "../github-login/GitHubLogin";


const HeaderComponent = () => {
  const { user, signIn, signOut } = useCtxUser();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const [resource, setResource] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showConfirmLogout, setShowConfirmLogout] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

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
        <ButtonComponent icon={settingsIcon} variant="icon" />

        {/* AVATAR & DROPDOWN */}
        {user ? (
          <div className="relative ml-4" ref={dropdownRef}>
            <button
              onClick={() => setShowDropdown((prev) => !prev)}
              className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-gray-300 hover:shadow-md transition"
            >
              <img
                src={user.photoURL}
                alt="avatar"
                className="w-8 h-8 rounded-full"
              />
              <span className="font-medium text-sm text-gray-700">
                {user.displayName}
              </span>
            </button>

            {showDropdown && (
              <div className="absolute right-0 mt-2 w-40 bg-white border rounded-md shadow-lg z-50">
                <button
                  onClick={() => {
                    setShowConfirmLogout(true);
                    setShowDropdown(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-sm text-[#B91879] hover:bg-gray-100"
                >
                  Exit
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="mr-[-10px]">
            <ButtonComponent
              icon={userIcon}
              variant="icon"
              text="Iniciar sesión"
              onClick={openModal}
            />
          </div>
        )}

        {/* MODAL LOGIN */}
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
              <div className="text-red-600 text-sm mt-2 text-center">
                Lo sentimos, no se ha podido iniciar sesión,
                <br /> contacte con el administrador.
              </div>
            )}
          </Modal>
        )}

        {/* MODAL LOGOUT CONFIRM */}
        {showConfirmLogout && (
          <Modal closeModal={() => setShowConfirmLogout(false)} title="Confirmar salida">
            <p className="text-center my-4">¿Estás segur@ que quieres cerrar sesión?</p>
            <div className="flex justify-center gap-4 mt-6">
              <button
                onClick={() => {
                  signOut();
                  setShowConfirmLogout(false);
                  navigate("/"); 
                }}
                className="px-4 py-2 bg-[#b91879] text-white rounded-md hover:bg-[#98537c]"
              >
                Sí, salir
              </button>
              <button
                onClick={() => setShowConfirmLogout(false)}
                className="px-4 py-2 bg-gray-300 text-black rounded-md hover:bg-gray-400"
              >
                Cancelar
              </button>
            </div>
          </Modal>
        )}
      </div>
    </header>
  );
};

export default HeaderComponent;