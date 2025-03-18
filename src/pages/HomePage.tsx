import GitHubLogin from "../components/github-login/GitHubLogin";
import folder from "../assets/new-folder-dynamic-color.svg";
import puzzle from "../assets/puzzle-dynamic-color.svg";
import ok from "../assets/thumb-up-dynamic-color.svg";
import { useCtxUser } from "../hooks/useCtxUser";
import { useState, useEffect } from "react";
import { AddUsersModal } from "../components/resources/AddUserModal";
import ButtonComponent from "../components/atoms/ButtonComponent";
import { getRole } from "../api/endPointRoles";

export default function HomePage() {
  const { signIn, signOut, user, error } = useCtxUser();
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
    <main className="bg-white rounded-xl p-6 w-full text-center h-[inherit] max-h-[calc(100vh-114px)] overflow-auto">
      <h1>¡Bienvenid@ a la wiki de la IT Academy!</h1>
      <section>
        <article
          style={{
            display: "flex",
            flexDirection: "column",
            maxWidth: "375px",
            padding: "1rem",
          }}
        >
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
              <small
                className="font-bold"
                style={{ textTransform: "uppercase" }}
              >
                {user.displayName}
              </small>
              <button
                className="bg-white text-red-500 text-sm font-bold active:scale-95 py-1 px-4 rounded-sm border-2 border-black"
                type="button"
                onClick={signOut}
              >
                Exit
              </button>
            </article>
          ) : (
            <div>
              <p>Registrate o haz login para poder subir y votar recursos</p>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  maxWidth: "320px",
                }}
              >
                <GitHubLogin onClick={signIn} />
                <label htmlFor="terms">
                  <input name="terms" type="checkbox" /> Acepto términos legales
                </label>
                {error && (
                  <div className="error-message text-red-500 my-4">{error}</div>
                )}
              </div>
            </div>
          )}

          {hasPermission && (
            <ButtonComponent onClick={openModal} className="mt-4">
              Añadir Usuario
            </ButtonComponent>
          )}
        </article>
        <div>
          <div>
            <h2>Funcionalidades básicas que te ofrece esta plataforma:</h2>
            <section className="w-full flex justify-between">
              <div>
                <span>/1</span>
                <img src={folder} alt="folder" width={100} height={100} />
                <h3>Guarda tus recursos favoritos</h3>
                <p>Ten tus recursos bien organizados</p>
              </div>
              <div>
                <span>/2</span>
                <img src={puzzle} alt="puzzle" width={100} height={100} />
                <h3>Colabora con tus compañer@s</h3>
                <p>Recursos compartidos</p>
              </div>
              <div>
                <span>/3</span>
                <img src={ok} alt="ok" width={100} height={100} />
                <h3>Vota los recursos</h3>
                <p>La comunidad decide cuáles son más relevantes</p>
              </div>
            </section>
          </div>
        </div>
      </section>
      {isModalOpen && hasPermission && (
        <AddUsersModal
          onClose={closeModal}
          userRole={userRole}
          userID={user.id}
        />
      )}
    </main>
  );
}
