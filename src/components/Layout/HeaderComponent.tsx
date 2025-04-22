import { Link, useNavigate, useLocation } from "react-router";
import logoItAcademy from "../../assets/LogoItAcademy.svg";
import addIcon from "../../assets/add.svg";
import userIcon from "../../assets/user2.svg";
import arrowDown from "../../assets/arrow-down.svg";
import logOutIcon from "../../assets/logout-svgrepo-com.svg";
import ButtonComponent from "../atoms/ButtonComponent";
import { useCtxUser } from "../../hooks/useCtxUser";
import { useEffect, useRef, useState } from "react";
import { Modal } from "../Modal/Modal";
import GitHubLogin from "../github-login/GitHubLogin";
import { AddUsersModal } from "../resources/AddUserModal";
import { getUserRole } from "../../api/userApi";

const HeaderComponent = () => {
  const { user, signIn, signOut } = useCtxUser();
  const navigate = useNavigate();
  const location = useLocation();

  const [resource, setResource] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showConfirmLogout, setShowConfirmLogout] = useState(false);
  const [selectedLang, setSelectedLang] = useState<"ES" | "EN">("ES");
  const [showLangDropdown, setShowLangDropdown] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const langDropdownRef = useRef<HTMLDivElement>(null); 
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);

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
      if (
        langDropdownRef.current &&
        !langDropdownRef.current.contains(event.target as Node)
      ) {
        setShowLangDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const openAddUserModal = () => setIsAddUserModalOpen(true);
  const closeAddUserModal = () => setIsAddUserModalOpen(false);

  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    if (user && user.id) {
      getUserRole(user.id)
        .then((roleData) => {
          setUserRole(roleData || null);
        })
        .catch((err) => {
          console.error("Error fetching role:", err);
          setUserRole(null);
        });
    } else {
      setUserRole(null);
    }
  }, [user]);

  const hasPermission = userRole
    ? ["superadmin", "admin", "mentor"].includes(userRole)
    : false;

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
      <div className="flex items-center gap-[6px]">
        {hasPermission && (
          <ButtonComponent
            onClick={openAddUserModal}
            icon={addIcon}
            variant="icon"
            text="Añadir Usuario"
          ></ButtonComponent>
        )}
        {/* LANG SELECT DROPDOWN */}
        <div className="relative" ref={langDropdownRef}>
          <ButtonComponent
            variant="custom"
            className="inline-flex items-center justify-center h-[41px] px-4 text-[#808080] border-2 rounded-[10px] border-white bg-white hover:bg-[#dcdcdc] hover:border-[#808080] hover:scale-95 transition cursor-pointer"
            onClick={() => setShowLangDropdown((prev) => !prev)}
            title="Idioma"
          >
            <span className="mr-2">{selectedLang}</span>
            <img
              src={arrowDown}
              alt="arrow"
              className={`w-4 h-4 transition-transform ${showLangDropdown ? "rotate-180" : ""}`}
            />
          </ButtonComponent>

          {showLangDropdown && (
            <div className="absolute right-0 mt-2 w-[48px] bg-white border rounded-md shadow-lg z-50 py-1 text-center">
              <button
                onClick={() => {
                  setSelectedLang("ES");
                  setShowLangDropdown(false);
                }}
                className="py-1 text-sm text-[#4a4a4a] hover:bg-[#fcecec] transition w-full cursor-pointer"
              >
                ES
              </button>
              <button
                onClick={() => {
                  setSelectedLang("EN");
                  setShowLangDropdown(false);
                }}
                className="py-1 text-sm text-[#4a4a4a] hover:bg-[#fcecec] transition w-full cursor-pointer"
              >
                EN
              </button>
            </div>
          )}
        </div>

        {/* AVATAR & DROPDOWN */}
        {user ? (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setShowDropdown((prev) => !prev)}
              title={user.displayName || ""}
              className="h-[41px] px-4 flex items-center gap-1 rounded-lg hover:bg-white border border-transparent hover:border-gray-300 transition cursor-pointer"
            >
              <img
                src={user.photoURL}
                alt="avatar"
                className="w-8 h-8 rounded-full"
              />
              <img
                src={arrowDown}
                alt="toggle dropdown"
                className={`w-4 h-4 transition-transform ${showDropdown ? "rotate-180" : ""}`}
              />
            </button>

            {showDropdown && (
              <div className="absolute right-0 mt-2 bg-white border rounded-md shadow-lg z-50 px-2 py-2 flex flex-col gap-2">
                <button
                  title="Cerrar sesión"
                  onClick={() => {
                    setShowConfirmLogout(true);
                    setShowDropdown(false);
                  }}
                  className="w-10 h-10 flex items-center justify-center hover:bg-[#fcecec] transition rounded-md cursor-pointer"
                >
                  <img src={logOutIcon} alt="logout icon" className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        ) : (
          <div>
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
          <Modal closeModal={closeModal} title="Inicio de sesión">
            <GitHubLogin onClick={handleSignIn} isLoading={isLoading} />
            <label
              htmlFor="terms"
              className=" flex items-center gap-2 mt-8 cursor-pointer font-medium text-[1rem]"
            >
              <input
                name="terms"
                id="terms"
                type="checkbox"
                onChange={handleCheckboxChange}
                checked={isChecked}
                className="hidden"
              />
              <div
                className={`w-5 h-5 flex items-center justify-center rounded border ${
                  isChecked
                    ? "bg-[#B91879] border-[#B91879]"
                    : "border-gray-400"
                }`}
              >
                {isChecked && (
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                )}
              </div>
              Acepto <u>términos legales</u>
            </label>
            {loginError && (
              <div className="text-red-500 text-[1rem] mt-8 text-center font-medium">
                Lo sentimos, no se ha podido iniciar sesión,
                <br /> contacte con el administrador
              </div>
            )}
          </Modal>
        )}

        {/* MODAL LOGOUT CONFIRM */}
        {showConfirmLogout && (
          <Modal
            closeModal={() => setShowConfirmLogout(false)}
            title="Confirmar salida"
          >
            <p className="text-center my-4">
              ¿Estás segur@ que quieres cerrar sesión?
            </p>
            <div className="flex justify-center gap-4 mt-6">
              <button
                onClick={() => {
                  signOut();
                  setShowConfirmLogout(false);
                  navigate("/");
                }}
                className="px-4 py-2 bg-[#b91879] text-white rounded-md hover:bg-[#98537c] cursor-pointer"
              >
                Sí, salir
              </button>
              <button
                onClick={() => setShowConfirmLogout(false)}
                className="px-4 py-2 bg-gray-300 text-black rounded-md hover:bg-gray-400 cursor-pointer"
              >
                Cancelar
              </button>
            </div>
          </Modal>
        )}

        {isAddUserModalOpen && hasPermission && (
          <AddUsersModal
            onClose={closeAddUserModal}
            userRole={userRole}
            userID={user?.id ?? ""}
          />
        )}
      </div>
    </header>
  );
};

export default HeaderComponent;
