import GitHubLogin from "../components/github-login/GitHubLogin";
import folder from "../assets/svg/new-folder-dynamic-color.svg";
import puzzle from "../assets/svg/puzzle-dynamic-color.svg";
import ok from "../assets/svg/thumb-up-dynamic-color.svg";
import { useUserCtx } from "../hooks/useUserCtx";
import { useState, useEffect } from "react";
import { AddUsersModal } from "../components/resources/AddUserModal";
import ButtonComponent from "../components/atoms/ButtonComponent";
import { getRole } from "../api/endPointRoles";
import { Main } from "../Layout/Main";

export default function HomePage() {
  const { signOut, user, signIn, error } = useUserCtx();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    if (user && user.id) {
      getRole(user.id)
        .then((roleData) => {
          setUserRole(roleData?.role || null);
        })
        .catch((err) => {
          console.error("Error fetching role:", err);
          setUserRole(null);
        });
    } else {
      setUserRole(null);
    }
  }, [user]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const hasPermission = userRole
    ? ["superadmin", "admin", "mentor"].includes(userRole)
    : false;

  return (
    <Main>
      <section className={`bg-white lg:rounded-[15px] col-span-2 h-full`}>
        <article className="flex flex-col gap-8 items-center justify-center min-h-96">
          <h1 className="font-bold">¡Bienvenid@ a la wiki de la IT Academy!</h1>
          {user ? (
            <article
              id={String(user.id)}
              className="flex justify-evenly items-center gap-4 mt-4 py-2 px-4 rounded-md bg-black text-white mx-auto"
            >
              <img
                src={user.photoURL}
                alt="Avatar usuario"
                width={64}
                height={64}
                className="rounded-full border-2 border-white"
              />
              <div className="flex flex-col divide-y-2">
                <small
                  className="font-bold"
                  style={{ textTransform: "uppercase" }}
                >
                  {user.displayName}
                </small>
                <small
                  className="font-bold"
                  style={{ textTransform: "uppercase" }}
                >
                  {user.role}
                </small>
              </div>
              <button
                className="bg-white text-red-500 text-sm font-bold active:scale-95 py-1 px-4 rounded-sm border-2 border-black"
                type="button"
                onClick={signOut}
              >
                Exit
              </button>
            </article>
          ) : (
            <article className="flex flex-col items-center gap-4">
              <span className="text-[#7E7E7E] text-[16px]">
                Registrate o haz login para poder subir y votar recursos
              </span>
              <div className="flex flex-col max-w-[320px] gap-4">
                <GitHubLogin onClick={signIn} />
                {error && (
                  <div className="error-message text-red-500 my-4">{error}</div>
                )}
              </div>
            </article>
          )}

          {hasPermission && (
            <ButtonComponent onClick={openModal} className="mt-4">
              Añadir Usuario
            </ButtonComponent>
          )}
        </article>
        <article>
          <h2>Funcionalidades básicas que te ofrece esta plataforma:</h2>
          <section className="w-full flex justify-between">
            <article>
              <span>/1</span>
              <img src={folder} alt="folder" width={100} height={100} />
              <h3>Guarda tus recursos favoritos</h3>
              <p>Ten tus recursos bien organizados</p>
            </article>
            <article>
              <span>/2</span>
              <img src={puzzle} alt="puzzle" width={100} height={100} />
              <h3>Colabora con tus compañer@s</h3>
              <p>Recursos compartidos</p>
            </article>
            <article>
              <span>/3</span>
              <img src={ok} alt="ok" width={100} height={100} />
              <h3>Vota los recursos</h3>
              <p>La comunidad decide cuáles son más relevantes</p>
            </article>
          </section>
        </article>
      </section>
      {isModalOpen && hasPermission && (
        <AddUsersModal
          onClose={closeModal}
          userRole={userRole}
          userID={user.id}
        />
      )}
    </Main>
  );
}
