import GItHubLogin from "../components/github-login/GItHubLogin";
import folder from "../assets/new-folder-dynamic-color.svg";
import puzzle from "../assets/puzzle-dynamic-color.svg";
import ok from "../assets/thumb-up-dynamic-color.svg";
import { useCtxUser } from "../hooks/useCtxUser";

export default function HomePage() {
  const { signIn, signOut, user, error } = useCtxUser();

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
          <h1>¡Bienvenid@ a la wiki de la IT Academy!</h1>

          {user ? (
            <article
              id={String(user.id)}
              className="flex justify-evenly items-center gap-4 mt-4 py-2 px-4 rounded-md bg-black text-white"
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
                <GItHubLogin onClick={signIn} />
                <label htmlFor="terms">
                  <input name="terms" type="checkbox" /> Acepto términos legales
                </label>
                {error && (
                  <div className="error-message text-red-500 my-4">{error}</div>
                )}
              </div>
            </div>
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
    </main>
  );
}
