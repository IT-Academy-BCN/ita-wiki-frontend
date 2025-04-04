import folder from "../assets/new-folder-dynamic-color.svg";
import puzzle from "../assets/puzzle-dynamic-color.svg";
import ok from "../assets/thumb-up-dynamic-color.svg";
import { useCtxUser } from "../hooks/useCtxUser";
import { useCallback, useEffect, useState } from "react";
import ButtonComponent from "../components/atoms/ButtonComponent";
import Card from "../components/ui/Card";
import { useNavigate } from "react-router";
import PageTitle from "../components/ui/PageTitle";
import { getUserRole } from "../api/userApi";

export default function HomePage() {
  const navigate = useNavigate();
  const { signOut, user } = useCtxUser();
  const [userRole, setUserRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user && user.id) {
      getUserRole(user.id)
        .then((role) => {
          setUserRole(role || "anonymous");
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching role:", err);
          setUserRole("anonymous");
          setLoading(false);
        });
    } else {
      setUserRole("anonymous");
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (!user || !userRole) return;

    if (["anonymous", "student", "mentor"].includes(userRole)) {
      navigate("/resources");
    } else if (["admin", "superadmin"].includes(userRole)) {
      navigate("/admin-dashboard");
    }
  }, [user, userRole, navigate]);

  const handleNavigate = useCallback(() => {
    navigate("/resources/React");
  }, [navigate]);

  if (loading) {
    return (
      <main className="flex justify-center items-center h-screen w-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid"></div>
      </main>
    );
  }

  return (
    <>
      <PageTitle title="" />
      <main className="bg-white rounded-xl flex flex-col items-center justify-center w-full mx-6 p-10 md:p-6 mb-6 text-center overflow-auto">
        <h1 className="font-bold text-3xl">
          ¡Bienvenid@ a la wiki de la IT Academy!
        </h1>
        <section>
          <article className="flex flex-col p-1 my-3">
            {user && (
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
                  <small className="font-bold uppercase">
                    {user.displayName}
                  </small>
                  <small className="font-bold uppercase">{user.role}</small>
                </div>
                <button
                  className="bg-white text-red-500 text-sm font-bold active:scale-95 py-1 px-4 rounded-sm border-2 border-black"
                  type="button"
                  onClick={signOut}
                >
                  Exit
                </button>
              </article>
            )}
          </article>
          <div>
            <div className="w-full flex flex-col items-center justify-center gap-6">
              <div className="w-42">
                <ButtonComponent onClick={handleNavigate}>
                  Ver Recursos
                </ButtonComponent>
              </div>
              <h2 className="font-bold">
                Funcionalidades básicas que te ofrece esta plataforma:
              </h2>
              <section className="flex flex-col gap-8 items-center md:items-stretch md:flex-row">
                <Card
                  number={1}
                  imageSource={folder}
                  imageAlt="folder"
                  title="Guarda tus recursos favoritos"
                  text="Ten tus recursos bien organizados"
                />
                <Card
                  number={2}
                  imageSource={puzzle}
                  imageAlt="puzzle"
                  title="Colabora con tus compañer@s"
                  text="Recursos compartidos"
                />
                <Card
                  number={3}
                  imageSource={ok}
                  imageAlt="ok"
                  title="Vota los recursos"
                  text="La comunidad decide cuáles son más relevantes"
                />
              </section>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}